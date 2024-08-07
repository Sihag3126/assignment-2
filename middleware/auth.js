const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.verifyToken = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/auth/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            throw new Error('User not found');
        }
        req.userId = user._id.toString(); // Ensure it's a string
        req.user = user;
        res.locals.user = user;
        next();
    } catch (error) {
        console.error('Error in verifyToken:', error);
        res.clearCookie('token');
        res.redirect('/auth/login');
    }
};
exports.setUserIfExists = async (req, res, next) => {
    const token = req.cookies && req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId).select('-password');
            if (user) {
                req.userId = user._id.toString();
                req.user = user.toObject();
                res.locals.user = user.toObject();
            }
        } catch (error) {
            console.error('Error in setUserIfExists:', error);
            res.clearCookie('token');
        }
    }
    next();
};