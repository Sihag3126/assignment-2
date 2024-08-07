const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Display the registration page
exports.registerPage = (req, res) => {
    res.render('register', { title: 'Register' });
};

// Display the login page
exports.loginPage = (req, res) => {
    res.render('login', { title: 'Login' });
};

// Handle user logout
exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
};

// Handle user registration form submission
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        // Check if the user already exists
        if (existingUser) {
            return res.status(400).render('register', {
                title: 'Register',
                error: 'User already exists',
                email: email // Preserve the email input
            });
        }

        // Additional server-side validation
        if (!email || !password) {
            return res.status(400).render('register', {
                title: 'Register',
                error: 'Email and password are required',
                email: email // Preserve the email input
            });
        }

        if (password.length < 8) {
            return res.status(400).render('register', {
                title: 'Register',
                error: 'Password must be at least 8 characters long',
                email: email // Preserve the email input
            });
        }

        // Create a new user
        const user = new User({ email, password });
        await user.save();

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set the token in a cookie
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
        res.redirect('/users/profile');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).render('register', {
            title: 'Register',
            error: 'Error registering user',
            email: req.body.email // Preserve the email input
        });
    }
};

// Handle user login form submission
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found. Please check your email or register for an account.' });
        }

        // Check if password is correct
        if (!(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid password. Please try again.' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set the token in a cookie
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
        res.json({ success: true, redirectUrl: '/users/profile' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'An error occurred during login. Please try again later.' });
    }
};
