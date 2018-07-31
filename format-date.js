

const formatDate = (date) => {
     let day, year, formatDate, dateArr;
    date = date.slice(5, 16);
     dateArr = date.split(" ");
     day = dateArr.shift();
     year = dateArr.pop();
     formatDate = `${year}-${dateArr[0]}-${day}`;
     
     return formatDate;
}


module.exports.formatDate = formatDate;
