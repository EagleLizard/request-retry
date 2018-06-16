const router = require('express').Router();

const getToken = require('./get-token');
const count = require('./count');

module.exports = (app)=>{
  app.get('/token', getToken);

  app.use(count);
};
