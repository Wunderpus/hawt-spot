const { Client } = require('pg');

// Configuration - require dotenv
require('dotenv').config();

// Connect to Postgres DB
const client = new Client("postgres://olmqtbye:jeUcjomwRCIJ0FeolH1-ZxiisI0XYibQ@baasu.db.elephantsql.com:5432/olmqtbye");
client.connect((err) => {
  if (err) return console.log(err);
  console.log('connected to db');
});

module.exports = client;
