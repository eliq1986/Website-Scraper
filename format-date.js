const formatDate = (date) => {
  let day, year, formatDate, dateArr;
  date = date.slice(5, 16);
   dateArr = date.split(" ");
   day = dateArr.shift();
   year = dateArr.pop();


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
