const date = require("./utils/formatDate");
const time = require("./utils/format-time.js");

const cheerio = require("cheerio");
const request = require("request");
const jsonexport = require("jsonexport");
const fs = require("fs");
const chalk = require("chalk");

const scrape = (arr) => {

  let arrayOfObj = [];
  const url = arr.pop();
  // url => http://shirts4mike.com/
  const formattedDate = arr.pop();
  // formattedDate => 2018-08-02
  const formattedTime = arr.pop();
  // formattedTime => 16:35:46 GMT

  arr.forEach((link) => {
    const shirtObj = {};
    let price,
      name,
      imageURL,
      shirtDetails,
      shirtURL;
    request(`${url}${link}`, (error, response, body) => {

      const $ = cheerio.load(body);
      shirtURL = response.request.uri.href;
      // shirtURL => each shirt url

      imageURL = $(".shirt-picture img").attr("src");
      // shirtURL => each shirt image source
      shirtDetails = $(".shirt-details h1").text();
      // shirtDetails => i.e. $18 Logo Shirt, Red
      [ price, ...name] = shirtDetails.split(" ");
      // price => i.e. $20
      // ...name => i.e. [ 'Mike', 'the', 'Frog', 'Shirt,', 'Black' ]
      name = name.join(" ");
      // name => Mike the Frog Shirt, Blue
      name = name.split(",");
      // name => [ 'Mike the Frog Shirt', ' Blue' ]
      shirtObj.Title = name[0];
      shirtObj.Price = price;
      shirtObj.ImageURL = `${url}${imageURL}`;
      shirtObj.URL = shirtURL;
      shirtObj.Time = formattedTime;

      arrayOfObj.push(shirtObj)

    })

  })

  setTimeout(() => {

    jsonexport(arrayOfObj, (error, csv) => {
      if (error) {
        return console.log(chalk.red(error));
      }
       console.log(chalk.inverse.green("Scrape successful"))
      fs.writeFileSync(`./data/${formattedDate}.csv`, csv);
    });
  }, 1000);

}

module.exports = scrape;
