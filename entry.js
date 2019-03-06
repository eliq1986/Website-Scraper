// custom modules
const formatDate = require("./utils/formatDate");
const time = require("./utils/format-time.js");

//npm modules
const cheerio = require("cheerio");

const entry = (body, response) => {
  // web entry url => http://shirts4mike.com/
  const url = response.request.uri.href;
  const arr = [];

  const dateResponse = response.headers.date;
  const $ = cheerio.load(body);
  const ulList = $("ul.products a");

  ulList.each((i, elem) => {
    arr.push(elem.attribs.href);
  });

  const formattedDate = formatDate(dateResponse);
  // Thu, 02 Aug 2018 16:03:43 GMT =>  2018-08-02

  const formattedTime = time.formatTime(dateResponse);
  // Thu, 02 Aug 2018 16:03:43 GMT =>  16:03:43 GMT

  arr.push(formattedTime)
  arr.push(formattedDate);
  arr.push(url);

  return arr;


}


module.exports = entry;
