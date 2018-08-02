"use strict";

// formats date
const formatDate = (date) => {
  let day, year, formatDate, dateArr;

   date = date.slice(5, 16);
   //  Thu, 02 Aug 2018 16:22:20 GMT => 02 Aug 2018
   dateArr = date.split(" ");
   // 02 Aug 2018 => ["02", "Aug, "2018"]
   day = dateArr.shift();
   // day => 02
   year = dateArr.pop();
   // year => 2018


  const monthNumber = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ].indexOf(dateArr[0]) + 1;


  if (monthNumber < 10) {
    return `${year}-0${monthNumber}-${day}`;
  } else {
    return `${year}-1${monthNumber}-${day}`;
  }

}

module.exports.formatDate = formatDate;
