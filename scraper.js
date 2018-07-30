"use strict";

const command = process.argv[2];

const entryURL = "http://shirts4mike.com/shirts.php";


// loads node core modules
const fs = require("fs");




//loads npm modules
const request = require("request"),
      cheerio = require("cheerio"),
      mkdir = require("mkdirp"),
      axios = require("axios"),
      jsonexport = require('jsonexport');



const fields = ["Title", "Price", "ImageURL", "URL"];
const opts = {fields};



// checks if folder exists
const result  = fs.existsSync(`./data`);
      result ? null : mkdir(`./data`);



//makes request to url
axios.get(entryURL).then((response) => {
     let arrayOfLinks = [];

     const $ = cheerio.load(response.data);
     const ulList = $("ul.products a");



          ulList.each(function(i,elem)  {
            arrayOfLinks.push(elem.attribs.href);

          });


     const url = response.config.url;
     arrayOfLinks.push(url);
     return arrayOfLinks;


}).then((res)=>{


   let arrayOfObj = [];

   const url = res.pop();
    const newURL = url.slice(0, 23);
     res.forEach(link => {
        const shirtObj = {};
      let price, name, title, imageURL, shirtDetails, shirtURL;
        axios.get(`${newURL}${link}`).then((response) => {



              const $ = cheerio.load(response.data);
                shirtURL = response.config.url;

             imageURL = $(".shirt-picture img").attr("src");
             shirtDetails = $(".shirt-details h1").text();

             [price, ...name] = shirtDetails.split(" ");
              name = name.join(" ");
              name = name.split(",");
              shirtObj.title = name[0];
              shirtObj.price = price;
              shirtObj.imageSource = imageURL;
              shirtObj.url = shirtURL;

              arrayOfObj.push(shirtObj);



       })

     })
     setTimeout(()=> {
        const jsonArrayOfObjects = arrayOfObj;

        jsonexport( jsonArrayOfObjects,function(err, csv){
            if(err) return console.log(err);
            console.log(csv);
        });
}, 2000);


}).catch((err) => {
  console.log(err);
});
