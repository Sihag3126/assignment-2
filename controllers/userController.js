const User = require('../models/user');
const Recipe = require('../models/recipe');

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        const recipes = await Recipe.find({ creator: req.userId });

        if (!user) {
            return res.status(404).render('error', { message: 'User not found' });
        }

        res.render('profile', { title: 'Profile', user: user.toObject(), recipes });
    } catch (error) {
        res.status(500).render('error', { message: 'Error fetching user profile' });
    }
};