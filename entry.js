const date = require("./format-date.js");
const time = require("./format-time.js");
const cheerio = require("cheerio");

const entry = (body, response) => {
  const url = response.request.uri.href;
  let arr = [];
  const dateResponse = response.headers.date;
  const $ = cheerio.load(body);
  const ulList = $("ul.products a");

  ulList.each(function(i, elem) {
    arr.push(elem.attribs.href);
  });
  const formattedDate = date.formatDate(dateResponse);
  const formattedTime = time.formatTime(dateResponse);
  arr.push(formattedTime)
  arr.push(formattedDate);
  arr.push(url);
  return arr;


}


module.exports.entry = entry;
