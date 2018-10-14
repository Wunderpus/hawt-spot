const express = require('express');

// Import middleware for Password authentication and User storage
const passwordController = require('../controllers/passwordController.js');
const userController = require('../controllers/userController.js');

// Invoke Router to create router object for /users
const router = express.Router();

/**
 * Load User Model
 * @route   GET /users/test
 * @desc    Tests users route
 * @access  Public
 */
router.get('/test', (req, res) => {
  res.json({
    message: 'Test route successful',
  });
});

// Retrieve User from DB 'users' table by e-mail address
router.post('/findAccount',
  userController.verifyUser,
  (req, res) => res.json({ userVerification: res.locals.userVerification }));

// Save song to DB 'user_saved_songs' table
router.post('/save-song',
  userController.saveSong,
  (req, res) => res.json({ message: 'save successful' }));

// Retrieve all song objects from DB 'user_saved_songs' table for e-mail address
router.post('/find-saved-songs',
  userController.findUserSongs,
  (req, res) => {
    console.log(res.locals.userSongs);
    res.json(res.locals.userSongs);
  });


/**
 * Register User to DB 'users' table
 * @route   POST users/register
 * @desc    Register User
 * @access  Public
 */
router.post('/register',
  passwordController.hashPassword,
  userController.addUser,
  (req, res) => res.status(200).json({ message: 'Welcome to HawtSpot!' }));

/**
 * Login User by email
 * @reoute  POST users/login
 * @desc    Login User
 * @access  Public
 */
router.post('/login',
  // userController.getUser,
  passwordController.comparePassword,
  (req, res) => res.status(200).json({}));

router.delete('/',
  userController.deleteUser,
  (req, res) => res.status(200).json(res.locals));

module.exports = router;
