import { useEffect, useState } from 'react';

/* These consts are for pulling recipes by UserID */
const RecipePage = () => {
    const [recipes, setRecipes] = useState<{ id: number; title: string; image: string; link: string }[]>([]);
    const userId = 1; // Replace with actual logic to get userId
    const [savedRecipes, setSavedRecipes] = useState<{ id: number; recipe_id_from_api: number; included: boolean }[]>([]);

    useEffect(() => {
        // Fetch recipes from your API - we need to update for our updated API
        // this user ID is what we should pull from the JWT
        fetch('https://api.example.com/recipes')
            .then(response => response.json())
            .then(data => setRecipes(data))
            .catch(error => console.error('Error fetching recipes:', error));
    }, []);

    useEffect(() => {
        // Fetch saved recipes for the user - this portion has the specific userID
        if (userId) {
            fetch(`http://localhost:5000/api/recipe/getSavedRecipe/${userId}/`)
                .then(response => response.json())
                .then(data => setSavedRecipes(data))
                .catch(error => console.error('Error fetching saved recipes:', error));
        }
    }, [userId]);

    return (
        // The first portion is for any recipes that are pulled from the API
        // The second portion is for recipes that the user has saved from the API
        <div>
            <h1>Recipes</h1>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        <h2>{recipe.title}</h2>
                        <img src={recipe.image} alt={recipe.title} />
                        <a href={recipe.link} target="_blank" rel="noopener noreferrer">View Full Recipe</a>
                    </li>
                ))}
            </ul>
            <h2>Saved Recipes</h2>
            <ul>
                {savedRecipes.map(savedRecipe => (
                    <li key={savedRecipe.id}>
                        <h3>Recipe ID: {savedRecipe.recipe_id_from_api}</h3>
                        <p>Included: {savedRecipe.included ? 'Yes' : 'No'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipePage;
