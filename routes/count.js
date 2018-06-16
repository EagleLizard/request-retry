
const router = require('express').Router();

const sessions = require('../sessions');

const sessionKey = 'session-token';
const errorCounts = [11,15,26,40];

module.exports = router;

router.use((req, res, next)=>{
  let sessionId, session;
  sessionId = req.header(sessionKey);
  if(sessionId === undefined){
    return res.status(400).send(`"${sessionKey}" header required`);
  }
  session = sessions.get(sessionId);
  if(session === undefined){
    return res.status(400).send(`Invalid session token`);
  }
  next();
});

router.get('/count', getCount);
router.put('/count', putCount);

function putCount(req, res){
  let sessionId, session, count;
  sessionId = req.header(sessionKey);
  session = sessions.get(sessionId);
  count = session.getCount();
  // throw an error for random values
  // if(errorCounts.indexOf(count) !== -1){
    // flip the coin
    if(Math.random() < 0.1){
      return res.status(500).send(`Error: random failure`);
    }
  // }
  session.incCount();
  res.send('');
}

function getCount(req, res){
  let session;
  session = sessions.get(req.header(sessionKey));
  res.send({
    count: session.getCount()
  });
}