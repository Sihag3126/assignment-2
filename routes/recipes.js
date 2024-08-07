const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const authMiddleware = require('../middleware/auth');

router.get('/', recipeController.getAllRecipes);
router.get('/create', authMiddleware.verifyToken, recipeController.getCreateRecipe);
router.post('/', authMiddleware.verifyToken, recipeController.createRecipe);
router.get('/:id/edit', authMiddleware.verifyToken, recipeController.getEditRecipe);
router.post('/:id', authMiddleware.verifyToken, recipeController.updateRecipe);
router.get('/:id/delete', authMiddleware.verifyToken, recipeController.deleteRecipe);

module.exports = router;