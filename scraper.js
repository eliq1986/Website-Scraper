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

    const shirtObj = {};
      axios.get(`http://shirts4mike.com/${link}`)
      .then((response) => {
          const $ = cheerio.load(response.data);
          let price, name;

         let imageSrc = $(".shirt-picture img").attr("src");
         imageSrc = `http://www.shirts4mike.com/${imageSrc}`
          let shirtDetails = $(".shirt-details h1").text();
            const url = response.config.url;
          [price, ...name] = shirtDetails.split(" ");
          name = name.join(" ");
          name = name.split(",")
          shirtObj.title = name[0];
          shirtObj.price = price;
          shirtObj.imageSource = imageSrc;
          shirtObj.url = url;

          //
          //
          // console.log("Date: ",response.status);
          //         console.log("Config: ",response.config);
          //



          arrayOfShirts.push(shirtObj);


          return arrayOfShirts;

      }).then((array)=> {
       console.log(array[array.length - 1])

      }).catch((error)=> {
          console.log(error)
      })


    })

});
