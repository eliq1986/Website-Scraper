"use strict";
// static url
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
  const entry = require("./entry");
  const scrape = require("./scrape")



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

     scrape.scrape(arr);
});
}
});
} catch(error) {
  console.log(`There was an issue with the URL entered; ${error.message}`);
}
