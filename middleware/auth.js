const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware to verify JWT token and authenticate user
exports.verifyToken = async (req, res, next) => {
    const token = req.cookies.token;

    // Check if token exists
    if (!token) {
        return res.redirect('/auth/login');
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by decoded user ID and exclude the password field
        const user = await User.findById(decoded.userId).select('-password');
        
        // If user not found, throw an error
        if (!user) {
            throw new Error('User not found');
        }

        // Attach user ID and user data to request object
        req.userId = user._id.toString(); // Ensure it's a string
        req.user = user;
        res.locals.user = user;
        
        // Proceed to the next middleware
        next();
    } catch (error) {
        console.error('Error in verifyToken:', error);
        
        // Clear token cookie and redirect to login page on error
        res.clearCookie('token');
        res.redirect('/auth/login');
    }
};

// Middleware to set user data if token exists
exports.setUserIfExists = async (req, res, next) => {
    const token = req.cookies && req.cookies.token;

    // If token exists, verify it
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user by decoded user ID and exclude the password field
            const user = await User.findById(decoded.userId).select('-password');
            
            // If user exists, attach user ID and user data to request object
            if (user) {
                req.userId = user._id.toString();
                req.user = user.toObject();
                res.locals.user = user.toObject();
            }
        } catch (error) {
            console.error('Error in setUserIfExists:', error);
            
            // Clear token cookie on error
            res.clearCookie('token');
        }
    }
    
    // Proceed to the next middleware
    next();
};
