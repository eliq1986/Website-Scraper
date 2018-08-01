const date = require("./format-date.js");
const time = require("./format-time.js");
const cheerio = require("cheerio");
const request = require("request");
const jsonexport = require("jsonexport");
const fs = require("fs");



const scrape = (arr) => {

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

}


module.exports.scrape = scrape;
