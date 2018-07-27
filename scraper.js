"use strict";

const command = process.argv[2];



// request data string from module
const hardCoded = require("./hardCoded.js");


// loads node core modules
const fs = require("fs");
const axios = require("axios");



//loads npm modules

const request = require("request"),
      cheerio = require("cheerio"),
      mkdir = require("mkdirp");




// checks if folder exists
const result  = fs.existsSync(`${hardCoded.folder}`);
      result ? null : mkdir(`${hardCoded.folder}`);



//makes request to url

    request(hardCoded.url, function(error,response, body) {
   let arrayOfPricesLinks = [];
    if (!error && response.statusCode === 200) {

        const $ = cheerio.load(body);

        const ulList = $("ul.products  a");



        ulList.each(function(i,elem)  {
          arrayOfPricesLinks.push(elem.attribs.href);

        });
    }

    const arrayOfShirts = [];
    arrayOfPricesLinks.forEach(link => {
      const shirt = {};
      axios.get(`http://shirts4mike.com/${link}`)
      .then((response) => {
          const $ = cheerio.load(response.data);
          let price, name;

          let shirtDetails = $(".shirt-details h1").text();
          [price, ...name] = shirtDetails.split(" ");
          name = name.join(" ");
          name = name.split(",")
          shirt.title = name[0];
          shirt.price = price;

      }).catch((error)=> {
          console.log(error)
      })


    })


});
