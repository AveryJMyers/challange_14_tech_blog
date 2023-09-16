const dayjs = require("dayjs");
const Handlebars = require('handlebars')

const format_date = (date) => {
    return dayjs(date).format("MM/DD/YYYY");
  };
  
  


module.exports = {format_date};