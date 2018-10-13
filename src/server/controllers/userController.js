const client = require('../server.js')

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
    //save the user information into psql table by using query and query array
    client.client.query(queryText, queryValues, (err) => {
      if (err) {
        console.error('Error: Could Not Encrypt Password: ', err);
        return res.status(500).json({ message: 'Error: Could Not Save Information' });
      }
      // Todo - add variable to local storage
      return next();
    });
  },
};
