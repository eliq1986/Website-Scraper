"use strict";
// custom modules
const date = require("./format-date.js");
const time = require("./format-time.js");

//npm modules
const cheerio = require("cheerio");

const entry = (body, response) => {
  // web entry url => http://shirts4mike.com/
  const url = response.request.uri.href;
  let arr = [];

  const dateResponse = response.headers.date;
  const $ = cheerio.load(body);
  const ulList = $("ul.products a");

  ulList.each(function(i, elem) {
    arr.push(elem.attribs.href);
  });

  const formattedDate = date.formatDate(dateResponse);
  // Thu, 02 Aug 2018 16:03:43 GMT =>  2018-08-02

  const formattedTime = time.formatTime(dateResponse);
  // Thu, 02 Aug 2018 16:03:43 GMT =>  16:03:43 GMT

  arr.push(formattedTime)
  arr.push(formattedDate);
  arr.push(url);
/*  [ 'shirt.php?id=101',
  'shirt.php?id=102',
  'shirt.php?id=103',
  'shirt.php?id=104',
  'shirt.php?id=105',
  'shirt.php?id=106',
  'shirt.php?id=107',
  'shirt.php?id=108',
  '16:05:03 GMT',
  '2018-08-02',
  'http://shirts4mike.com/' ]
 */
  return arr;


}


module.exports.entry = entry;
