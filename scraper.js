"use strict";

const command = process.argv[2];

// request data string from module
const hardCoded = require("./hardCoded.js");


// loads node core modules
const fs = require("fs");


//loads npm modules

const request = require("request"),
      cheerio = require("cheerio"),
      mkdir = require("mkdirp");


// checks if folder exists
const result  = fs.existsSync(`${hardCoded.folder}`);

       result ? null : mkdir(`${hardCoded.folder}`);



request(hardCoded.url, function(error,response, body) {
    if (!error && response.statusCode === 200) {
        const $ = cheerio.load(body);
        const ulList = $("ul.products li a");
        
    }

});
