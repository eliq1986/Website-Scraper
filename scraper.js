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
result ? null : mkdir(`./data`);

// loads custom modules
const entry = require("./entry");
const scrape = require("./scrape");
const errorMod = require("./err");

// makes request to url
try {
  request(`${webSiteURL}`, (error, response, body) => {
    if (error) {
      errorMod.error(error);
    } else {

      const url = response.request.uri.href;
      rp(`${entryURL}`).then((body) => {

        const arrayOfItems = entry.entry(body, response);
        return arrayOfItems;

      }).then((arr) => {
        scrape.scrape(arr);
      }).catch(function(error) {
        errorMod.error(error);
      });
    }
  });
} catch (error) {
  errorMod.error(error);
}
