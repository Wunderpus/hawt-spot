const express = require('express');

const passwordController = require('../controllers/passwordController.js');

const userController = require('../controllers/userController.js');

const router = express.Router();

// Load User Model
// @route     GET api/users/test
// @desc      Tests users route
// @access    Public
router.get('/test', (req, res) => {
  res.json({
    message: 'Test route successful',
  });
});

router.post('/findAccount',
  userController.verifyUser,
  (req, res) => {
    res.json({ userVerification: res.locals.userVerification });
  });

router.post('/save-song',
  userController.saveSong,
  (req, res) => {
    res.json({ message: 'save successful' });
  });

router.post('/find-saved-songs',
  userController.findUserSongs,
  (req, res) => {
    console.log(res.locals.userSongs);
    res.json(res.locals.userSongs);
  });


// @route     POST api/users/register
// @desc      Register User
// @access    Public
router.post('/register',
  passwordController.hashPassword,
  userController.addUser,
  (req, res) => res.status(200).json({}));

// @route     POST api/users/login
// @desc      Login user
// @access    Public
router.post('/login',
  // userController.getUser,
  passwordController.comparePassword,
  (req, res) => res.status(200).json({}));

router.delete('/',
  userController.deleteUser,
  (req, res) => res.status(200).json(res.locals));

module.exports = router;
