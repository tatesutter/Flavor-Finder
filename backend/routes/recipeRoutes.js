// routes/recipeRoutes.js
const express = require('express');
const { getRecipes, saveRecipe } = require('../controllers/recipeController');
const router = express.Router();

router.get('/recipes', getRecipes);
router.post('/recipes', saveRecipe);

module.exports = router;
