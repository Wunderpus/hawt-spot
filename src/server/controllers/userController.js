const client = require('../db');
const bcrypt = require('bcryptjs');


module.exports = {
  addUser: (req, res, next) => {
    //pull out the user information from req.body
    const { hashPass } = res.locals
    const { loginMethod, firstName, lastName, email, token } = req.body;
    //create query text
    const queryText = `INSERT INTO users ("login_method", "first_name", "last_name", "email", "hash_pass", "token") VALUES ($1, $2, $3, $4, $5, $6);`;
    //create query array from user info
    const queryValues = [
      loginMethod,
      firstName,
      lastName,
      email,
      hashPass,
      token,
    ];
    console.log(queryValues)
    //save the user information into psql table by using query and query array
    client.query(queryText, queryValues, (queryErr, queryResponse) => {
      if (queryErr) {
        return res.status(500).json({ message: 'Error: Could Not Save Information', error: queryErr });
      }
      // Todo - add variable to local storage
      return next();
    });
  },

  deleteUser: (req, res, next) => {
    // Pull out email from req.body
    const { email } = req.body;

    // Initialize deletion query text and array
    const deleteQuery = 'DELETE FROM users WHERE "email"=$1';
    const deleteArray = [email];

    // Issue query to delete user from array
    client.query(deleteQuery, deleteArray)
      .then((data) => {
        res.locals.data = data;
        if (!data.rowCount) return res.status(500).json({ message: 'Error: Could Not Find User To Delete' });
        return next();
      })
      .catch(delErr => res.status(500).json({ message: 'Error: Could Not Delete User', error: delErr }));
  },

  findUser: (req, res, next) => {
    const { accountEmail, accountPassword} = req.body;
    console.log("body ", req.body)
    const queryText = `SELECT * FROM users WHERE "email"=$1;`;
    const queryArray = [accountEmail];
    client.query(queryText, queryArray, (queryErr, queryResponse) => {
      if (queryErr) {
        return res.status(500).json({ message: 'Error: Problem Verifying User ', error: queryErr });
      }
      console.log("query response ", queryResponse)
      console.log("account pw ", accountPassword)
      console.log("query response hash ", queryResponse.rows[0].hash_pass);
      console.log("compare sync ", bcrypt.compareSync(accountPassword, queryResponse.rows[0].hash_pass))
      if (bcrypt.compareSync(accountPassword, queryResponse.rows[0].hash_pass)) {
        res.locals.userVerification = true;
        console.log("locals true", res.locals.userVerification)
        return next();
      }
      res.locals.userVerification = false;
      console.log("locals false", res.locals.userVerification)
      return next();
    });
  },
};
