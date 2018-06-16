const request = require('request');

module.exports = retry;

function retry(options, cb){
  let rq, retries, maxRetries, success;
  retries = 0;
  maxRetries = 1;
  success = false;
  (function again(){
    request(options, (err, resp, body)=>{
      if(resp.statusCode !== 200 && (retries++ < maxRetries)){
        again();
      }else{
        cb(err,resp,body);
      }
    });
  })();
}
