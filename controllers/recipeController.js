const Recipe = require('../models/recipe');

exports.getCreateRecipe = (req, res) => {
    res.render('recipes/create', { title: 'Create Recipe' });
};

exports.createRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions } = req.body;
        const recipe = new Recipe({
            title,
            ingredients: ingredients.split(',').map(item => item.trim()),
            instructions,
            creator: req.userId
        });
        await recipe.save();
        res.redirect('/users/profile');
    } catch (error) {
        res.status(500).render('error', { message: 'Error creating recipe' });
    }
};

exports.getEditRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        console.log('Recipe:', recipe);
        console.log('User ID:', req.userId);
        if (!recipe) {
            return res.status(404).render('error', { message: 'Recipe not found' });
        }
        if (recipe.creator.toString() !== req.userId) {
            return res.status(403).render('error', { message: 'Unauthorized to edit this recipe' });
        }
        res.render('recipes/edit', { title: 'Edit Recipe', recipe });
    } catch (error) {
        console.error('Error in getEditRecipe:', error);
        res.status(500).render('error', { message: 'Error fetching recipe', error: error.message });
    }
};

exports.updateRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions } = req.body;
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe || recipe.creator.toString() !== req.userId) {
            return res.status(404).render('error', { message: 'Recipe not found or unauthorized' });
        }
        recipe.title = title;
        recipe.ingredients = ingredients.split(',').map(item => item.trim());
        recipe.instructions = instructions;
        await recipe.save();
        res.redirect('/users/profile');
    } catch (error) {
        res.status(500).render('error', { message: 'Error updating recipe' });
    }
};

exports.deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        console.log('Recipe:', recipe);
        console.log('User ID:', req.userId);
        if (!recipe) {
            return res.status(404).render('error', { message: 'Recipe not found' });
        }
        if (recipe.creator.toString() !== req.userId) {
            return res.status(403).render('error', { message: 'Unauthorized to delete this recipe' });
        }
        await Recipe.findByIdAndDelete(req.params.id);
        res.redirect('/users/profile');
    } catch (error) {
        console.error('Error in deleteRecipe:', error);
        res.status(500).render('error', { message: 'Error deleting recipe', error: error.message });
    }
};

exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate('creator', 'email');
        res.render('recipes/allRecipes', {
            title: 'All Recipes',
            recipes: recipes.map(recipe => recipe.toObject({ getters: true })),
            user: req.user
        });
    } catch (error) {
        console.error('Error in getAllRecipes:', error);
        res.status(500).render('error', { message: 'Error fetching recipes', error: error.message });
    }
};