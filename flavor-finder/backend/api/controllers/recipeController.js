const Recipe = require('../models/recipe'); // Adjust path based on your project structure

// Save a Recipe
exports.saveRecipe = async (req, res) => {
  console.log('Request Body:', req.body); // Log the incoming request body

  const { idMeal, strMeal, strMealThumb, strInstructions, strYoutube } = req.body;

  // Basic validation
  if (!idMeal || !strMeal || !strInstructions || !strMealThumb) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if the recipe already exists (assuming idMeal is unique)
    const existingRecipe = await Recipe.findOne({ where: { idMeal } });
    if (existingRecipe) {
      return res.status(400).json({ message: 'Recipe already exists.' });
    }

    // Create a new recipe
    const recipe = await Recipe.create({
      idMeal,
      strMeal,
      strMealThumb,
      strInstructions,
      strYoutube: strYoutube || null,
    });

    res.status(201).json({ message: 'Recipe saved successfully.', recipe });
  } catch (error) {
    console.error('Error saving recipe:', error);
    res.status(500).json({ message: 'An error occurred while saving the recipe.' });
  }
};

// Get All Saved Recipes
exports.getSavedRecipes = async (req, res) => {
  console.log('Fetching saved recipes...');
  try {
    // Fetch all saved recipes
    const savedRecipes = await Recipe.findAll(
      
    );
    res.status(200).json(savedRecipes);
  } catch (error) {
    console.error('Error fetching saved recipes:', error);
    res.status(500).json({ message: 'An error occurred while fetching recipes.' });
  }
};


// Delete a Saved Recipe
exports.deleteRecipe = async (req, res) => {
  const { idMeal } = req.params;

  try {
    const deletedRecipe = await Recipe.destroy({ where: { idMeal } });

    if (deletedRecipe) {
      res.status(200).json({ message: 'Recipe deleted successfully' });
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ message: 'Error deleting recipe', error: error.message });
  }
};
