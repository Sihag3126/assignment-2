const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const recipeController = require('../controllers/recipeController');
const authMiddleware = require('../middleware/auth');

router.get('/profile', authMiddleware.verifyToken, userController.getProfile);
router.get('/profile/recipes/create', authMiddleware.verifyToken, recipeController.getCreateRecipe);
router.post('/profile/recipes', authMiddleware.verifyToken, recipeController.createRecipe);
router.get('/profile/recipes/:id/edit', authMiddleware.verifyToken, recipeController.getEditRecipe);
router.post('/profile/recipes/:id', authMiddleware.verifyToken, recipeController.updateRecipe);
router.get('/profile/recipes/:id/delete', authMiddleware.verifyToken, recipeController.deleteRecipe);

module.exports = router;