const express = require('express');
const app = express();

const routes = require('./routes/index');

const port = 3500;

routes(app);

app.listen(port, ()=>console.log(`listening on port ${port}`));