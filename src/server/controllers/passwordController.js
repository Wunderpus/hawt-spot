const bcrypt = require('bcryptjs');
const SALT = 12;

module.exports = {
  /** Encrypt user password using bcrypt prior to storing user account information in database */
  hashPassword: (req, res, next) => {
    // Retrieve user input clear password from req.body
    const { password } = req.body;
    // Generate salt to hash password 
    bcrypt.genSalt(SALT, (saltErr, newSalt) => {
      if (saltErr) {
        console.error('Error: Could Not Generate Salt: ', saltErr);
        return res.status(500).json({ message: 'Error: Could Not Generate Salt' });
      }
      // Hash password and store in res.locals, then continue
      bcrypt.hash(password, newSalt, (hashErr, hashPass) => {
        if (hashErr) {
          console.error('Error: Could Not Encrypt Password: ', hashErr);
          return res.status(500).json({ message: 'Error: Could Not Encrypt Password' });
        }
        res.locals.hashPass = hashPass;
        return next();
      });
    });
  },

  /** Compare user password to hashed password stored in database for that user */
  comparePassword: (req, res, next) => {
    // Retrieve user input clear password from req.body
    const { password } = req.body;
    // TODO: Retrieve hashed passwrod from user database
    const { hashPass } = ''; // TODO:
    // bCrypt compare clear password to hashed password, continue if approved
    bcrypt.compare(password, hashPass)
      .then((reply) => {
        if (reply) next();
        return res.status(401).json({ message: 'Password Incorrect' });
      })
      .catch((err) => {
        console.error('Could Not Confirm Password: ', err)
        return res.status(500).json({ message: 'Error: Could Not Confirm Password' });
      });
  },
};
