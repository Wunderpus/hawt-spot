const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Load User Model

// @route     GET api/users/test
// @desc      Tests users route
// @access    Public
router.get('/test', (req, res) => {
  res.json({
    message: 'User test works',
  });
});

// @route     POST api/users/register
// @desc      Register User
// @access    Public
router.post('/register', (req, res) => {
  // Find user
  // If one exists, status 404 'email already exists'
  // If not create new User
  // Hash password
 passwordController.hashPassword,
 (req, res) => res.end();
});

// @route     POST api/users/login
// @desc      Login user
// @access    Public
router.post('login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // Find user
  // If one doesnt exist, status 404
  // If one exists, check password
  passwordController.comparePassword,
  (req, res) => res.end();
});

module.exports = router;
