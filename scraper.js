"use strict";

const webSiteURL = "http://shirts4mike.com";
const entryURL = "http://shirts4mike.com/shirts.php";

// loads node core modules
const fs = require("fs");

//loads npm modules
const request = require("request"),
  cheerio = require("cheerio"),
  mkdir = require("mkdirp"),
  rp = require("request-promise"),
  jsonexport = require('jsonexport');

// checks if folder exists
  const result = fs.existsSync(`./data`);
  result ? null: mkdir(`./data`);

// loads custom modules
  const date = require("./format-date.js");
  const time = require("./format-time.js");
  const entry = require("./entry.js");



// makes request to url
try {
request(`${webSiteURL}`, (error, response, body) => {
  if (!error && response.statusCode === 200) {
     const url = response.request.uri.href;
 //request-promise
    rp(`${entryURL}`).then((body) => {

 // entry call
      const arrayOfItems = entry.entry(body, response);
      return arrayOfItems;

    }).then((arr)=> {

      let arrayOfObj = [];
  const url = arr.pop();
  const formattedDate = arr.pop();
  const formattedTime = arr.pop();

  arr.forEach((link) => {
      const shirtObj = {};
      let price, name, title, imageURL, shirtDetails, shirtURL;
      request(`${url}${link}`, (error, response, body) => {

     const $ = cheerio.load(body);
       shirtURL = response.request.uri.href;

    imageURL = $(".shirt-picture img").attr("src");
    shirtDetails = $(".shirt-details h1").text();

    [price, ...name] = shirtDetails.split(" ");
     name = name.join(" ");
     name = name.split(",");
     shirtObj.Title = name[0];
     shirtObj.Price = price;
     shirtObj.ImageURL = `${url}${imageURL}`;
     shirtObj.URL = shirtURL;
     shirtObj.Time = formattedTime;


     arrayOfObj.push(shirtObj)

      })



  })
  setTimeout(()=> {

             jsonexport(arrayOfObj, (error, csv) => {
            if (error)
              return console.log(error);
              fs.writeFileSync(`./data/${formattedDate}.csv`, csv);
            });
  },1000);
});
}
});
} catch(error) {
  console.log(`There was an issue with the URL entered; ${error.message}`);
}
