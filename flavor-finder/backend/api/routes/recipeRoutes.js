const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Route to save a recipe
router.post('/saveRecipe', recipeController.saveRecipe);

// Fetch all saved recipes
router.get('/getSavedRecipes', recipeController.getSavedRecipes);


module.exports = router;
