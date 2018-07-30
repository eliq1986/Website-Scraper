"use strict";

const command = process.argv[2];

const entryURL = "http://shirts4mike.com/shirts.php";


// loads node core modules
const fs = require("fs");




//loads npm modules
const request = require("request"),
      cheerio = require("cheerio"),
      mkdir = require("mkdirp"),
      axios = require("axios");




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
   let url = res.pop();
    const newURL = url.slice(0, 23);
     res.forEach(link => {
        request(`${newURL}${link}`, (error, response, body) => {
        // console.log(response.statusCode);
          const $ = cheerio.load(body);
             //console.log(body);
             let imageSrc = $(".shirt-picture img").attr("src");
            console.log(imageSrc);

       })
     })
   setTimeout(()=> {
//    console.log(arrayOfObj);
  }, );
}).catch((err) => {
  console.log(err);
});




//   const arrayOfShirts = [];
//     arrayOfPricesLinks.forEach(link => {
//
//     const shirtObj = {};
//       axios.get(`http://shirts4mike.com/${link}`)
//       .then((response) => {
//           const $ = cheerio.load(response.data);
//           let price, name;
//
//          let imageSrc = $(".shirt-picture img").attr("src");
//          imageSrc = `http://www.shirts4mike.com/${imageSrc}`
//           let shirtDetails = $(".shirt-details h1").text();
//             const url = response.config.url;
//           [price, ...name] = shirtDetails.split(" ");
//           name = name.join(" ");
//           name = name.split(",")
//           shirtObj.title = name[0];
//           shirtObj.price = price;
//           shirtObj.imageSource = imageSrc;
//           shirtObj.url = url;
//
//           arrayOfShirts.push(shirtObj);
//
//
//           return arrayOfShirts;
//
//       }).then((array)=> {
//        console.log(array[array.length - 1])
//
//       }).catch((error)=> {
//           console.log(error)
//       })
//
//
//     })
//
// });
