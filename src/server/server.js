// Main Entry Point File

const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const users = require('./routes/users');

const app = express();
const { Client } = require('pg');
require('dotenv').config();

const client = new Client(process.env.PSQL_URL);

client.connect((err, db) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to db');
  }
  db.query()

});

// Configuration
// Access dotenv for PORT
require('dotenv').config();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use route for /users
app.use('/users', users);

// Serve bundled index.html at root
app.use(express.static(path.resolve(__dirname, '../../dist/')));

// When deployed use the first PORT || localhost:3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) console.error('Server Error - ', err);
  return console.log(`Server Listening on Port ${PORT}`);
});
