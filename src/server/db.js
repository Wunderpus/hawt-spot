const { Client } = require('pg');

// Configuration - require dotenv
require('dotenv').config();

// Connect to Postgres DB
const db = new Client(process.env.PSQL_URL);
db.connect((err) => {
  if (err) return console.log(err);
  console.log('connected to db');
});

module.exports = db;
