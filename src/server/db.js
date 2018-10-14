const { Client } = require('pg');

// Configuration - require dotenv
require('dotenv').config();

// Connect to Postgres DB
const db = new Client(process.env.PSQL_URL);
db.connect((err) => {
  if (err) return console.log(err);
  console.log('Connected to Postgres DB');
});

// Export DB for testing and controllers
module.exports = db;
