const express = require('express');

const routes = require('./routes');
const config = require('./config');

const PORT = config.port;
const app = express();

app.use('/', routes);

app.listen(PORT);

console.log("Server running on port " + PORT)
