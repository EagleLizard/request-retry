# request-retry
I needed a simple way to retry requests from the `request` library at exponentially increasing intervals because a certain api fails in a predictable way.

## How to use
### 1. Start the server

Run `npm i`

To track changes install nodemon: `npm i -g nodemon`

To run the server _with_ nodemon: `npm run server`

To run the server _without_ nodemon: `node app.js`

### 2. Run the test script

Make sure the server is running, then run `node main.js`

## Note from author
I don't plan on finishing this, it's a proof of concept. 