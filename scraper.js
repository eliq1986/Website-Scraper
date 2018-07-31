"use strict";

const entryURL = "http://shirts4mike.com/shirts.php";

// loads node core modules
const fs = require("fs");

//loads custom modules
const formatDate = require("./format-date.js");
const formatTime = require("./format-time.js");


//loads npm modules
const request = require("request"),
      cheerio = require("cheerio"),
      mkdir = require("mkdirp"),
      axios = require("axios"),
      jsonexport = require('jsonexport');


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


          const date = response.headers.date;



          const formattedDate = formatDate.formatDate(date);
          const formattedTime = formatTime.formatTime(date);



     const url = response.config.url;
     arrayOfLinks.push(url, formattedDate, formattedTime);
     return arrayOfLinks;


}).then((res)=>{


   let arrayOfObj = [];
   const formattedTime = res.pop();
   const formattedDate = res.pop();
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
              shirtObj.Title = name[0];
              shirtObj.Price = price;
              shirtObj.ImageURL = imageURL;
              shirtObj.URL = shirtURL;
              shirtObj.Time = formattedTime;


              arrayOfObj.push(shirtObj);


        const date = response.headers.date;

       })

     })
     setTimeout(()=> {
        const jsonArrayOfObjects = arrayOfObj;

        jsonexport( jsonArrayOfObjects,function(err, csv){
            if(err) return console.log(err);
            fs.writeFileSync(`./data/${formattedDate}.csv`, csv);
        });
}, 2000);


}).catch((err) => {
  console.log(err);
});
