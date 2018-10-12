const express = require('express');
const path = require('path');
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

const PORT = 3000;

app.use(express.static(path.resolve(__dirname, '../../dist/')));

app.listen(PORT, (err) => {
  if (err) console.error('Server Error - ', err);
  return console.log(`Server Listening on Port ${PORT}`);
});
