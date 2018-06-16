
const request = require('./retry'); //require('request');

const baseuri = 'http://localhost:3500';

main();

function main(){
  let sessionId;
  getToken()
    .then(token=>{
      sessionId = token;
      return sessionId;
    })
    .then(()=>{
      return incCount(sessionId);
    })
    .then(()=>{
      return incCountN(sessionId, 100);
    })
    .then(()=>{
      return getCount(sessionId);
    })
    .then(res=>{
      console.log(res);
    })
    .catch(err=>{
      // console.error('Error in main.js::main():');
      console.error(err);
    });
}

function getToken(){
  return new Promise((resolve, reject)=>{
    let options;
    options = {
      method: 'GET',
      url: `${baseuri}/token`
    };
    request(options, (err, res, body)=>{
      let token;
      if(err) return reject(err);
      try{
        token = JSON.parse(body).token;
      }catch(e){
        return reject(e);
      }
      resolve(token);
    });
  });
}

function incCountN(token, n){
  return new Promise((resolve, reject)=>{
    (async ()=>{
      while(n--){
        try{
          await incCount(token);
        }catch(e){
          // reject(e);
          console.error(e);
        }
      }
      resolve();
    })();
  });
}

function incCount(token){
  return new Promise((resolve, reject)=>{
    let options;
    options = {
      method: 'PUT',
      url: `${baseuri}/count`,
      headers: {
        'session-token': token
      }
    };
    request(options, (err, res, body)=>{
      if(err) return reject(err);
      if(res.statusCode === 200){
        resolve();
      }else{
        return reject(`Error: Status ${res.statusCode}, message: "${body}"`);
      }
    });
  });
}

function getCount(token){
  return new Promise((resolve, reject)=>{
    let options;
    options = {
      method: 'GET',
      url: `${baseuri}/count`,
      headers: {
        'session-token': token
      }
    };
    console.log(token);
    request(options, (err, res, body)=>{
      let count;
      if(err) return reject(err);
      if(res.statusCode === 200){
        try{
          count = JSON.parse(body).count;
        }catch(e){
          return reject(e);
        }
        resolve(count);
      }else{
        return reject(`Error: Status ${res.statusCode}, message: "${body}"`);
      }
    });
  })
}