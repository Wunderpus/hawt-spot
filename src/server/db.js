const { Client } = require('pg');

// Configuration - require dotenv
require('dotenv').config();

// Connect to Postgres DB
const client = new Client(process.env.PSQL_URL);
client.connect((err) => {
  if (err) return console.log(err);
  console.log('connected to db');
});

module.exports = client;
