const dotenv = require('dotenv')
const path = require('path');

if(process.env.NODE_ENV=='dev'){
  dotenv.config();
}else{
  dotenv.config({path:path.resolve(process.cwd(),`.env.${process.env.NODE_ENV}`)})
}

module.exports = process.env;