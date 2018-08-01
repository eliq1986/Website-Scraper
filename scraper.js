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



// makes request to url
request(`${webSiteURL}`, (error, response, body) => {
  if (!error && response.statusCode === 200) {
     const url = response.request.uri.href;
    rp(`${entryURL}`).then((body) => {
      let arr = [];
      const dateResponse = response.headers.date;
      const $ = cheerio.load(body);
      const ulList = $("ul.products a");

      ulList.each(function(i, elem) {
        arr.push(elem.attribs.href);
      });
      const formattedDate = date.formatDate(dateResponse);
      const formattedTime = time.formatTime(dateResponse);
      arr.push(formattedTime)
      arr.push(formattedDate);
      arr.push(url);
      return arr;

    }).then((arr)=> {
   //console.log(arr);
      let arrayOfObj = [];
  const url = arr.pop();
  const formattedDate = arr.pop();
  const formattedTime = arr.pop();



//  const newURL = url.slice(0, 23);


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
     shirtObj.ImageURL = imageURL;
     shirtObj.URL = shirtURL;
     shirtObj.Time = formattedTime;


     arrayOfObj.push(shirtObj)

      })



  })
  setTimeout(()=> {

             jsonexport(arrayOfObj, function(err, csv) {
            if (err)
              return console.log(err);
              fs.writeFileSync(`./data/${formattedDate}.csv`, csv);
            });
  },1000);
});
}
});

/
