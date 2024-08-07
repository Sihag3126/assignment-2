const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route to display the registration page
router.get('/register', authController.registerPage);

// Route to handle user registration form submission
router.post('/register', authController.register);

// Route to display the login page
router.get('/login', authController.loginPage);

// Route to handle user login form submission
router.post('/login', authController.login);

// Route to handle user logout
router.get('/logout', authController.logout);

module.exports = router;
