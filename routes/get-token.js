
const uuid = require('uuid/v4');

const Session = require('../models/Session');

const sessions = require('../sessions');

module.exports = function getToken(req,res){
  let id, session;
  id = uuid();
  session = new Session(id);
  sessions.set(id, session);
  console.log(Array.from(sessions.keys()))
  res.send({
    token: id
  });
}
