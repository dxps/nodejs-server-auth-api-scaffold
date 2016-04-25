// --------------------------------------
// main starting point of the application
// --------------------------------------

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser'); // for parsing the incoming requests into JSON
const morgan = require('morgan'); // for (debugging) logging lib the incoming requests
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

// --------
// db setup
// --------

mongoose.connect('mongodb://localhost:adv-react-redux-udemy');

// ---------
// app setup
// ---------

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// ------------
// server setup
// ------------

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on :', port);
