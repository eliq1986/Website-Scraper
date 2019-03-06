"use strict";

const fs = require("fs");

//produces error message & appends to file.
const awwAnError = (error) => {
  const date = new Date;
  console.log(`There was an issue with the URL entered; ${error}`);
  const yearMonthDay = date.toString();
  // date 2018-08-02T15:47:20.341Z => yearMonthDay Thu Aug 02 2018 08:47:20 GMT-0700 (Pacific Daylight Time);
  const message = `[${yearMonthDay}] There's been an error: ${error} \r\n`;
  fs.appendFile("./scraper-error.log", message, (error) => {
    if (error)
      throw error;
    console.log("Error has been logged");
  })

};

module.exports = awwAnError;
