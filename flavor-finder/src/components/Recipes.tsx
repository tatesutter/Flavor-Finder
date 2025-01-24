import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation} from 'react-router-dom';

// Recipes Component
const Recipes: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('search'); // Get the search query from the URL
  const [recipes, setRecipes] = useState<any[]>([]); // Adjust the type as necessary
  const [randomRecipe, setRandomRecipe] = useState(null); // Adjust the type as necessary
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchRecipes = async () => {
    setLoading(true); // Start loading
    setError(null); // Reset error state

    const fetchOptions = [
      query
        ? axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        : Promise.resolve({ data: { meals: [] } }), // Return an empty array if no query
      axios.get('https://www.themealdb.com/api/json/v1/1/random.php'), // Random Results from API
    ];

    try {
      if (query === 'random') {
        // Fetch a random recipe if the query is "random"
        const randomResponse = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
        console.log('Random Recipe Response:', randomResponse.data); // Log the random recipe response
        setRandomRecipe(randomResponse.data.meals[0] || null); // Set the random recipe
      } else {
        // Fetch recipes based on the search query
        const recipesResponse = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        console.log('Recipes Response:', recipesResponse.data); // Log the recipes response
        setRecipes(recipesResponse.data.meals || []); // Use meals or an empty array if undefined
      }
    } catch (error) {
      console.error(error);
      setError('Failed to fetch data');
    } finally {
      setLoading(false); // Stop loading after fetching data
    }
  };

  fetchRecipes(); // Call the function to fetch recipes and random recipe
}, [query]); // Fetch the recipes whenever the query changes

if (loading) return <div>Loading...</div>;
if (error) return <div>{error}</div>;

return (
  <section className="py-10">
    <h2 className="text-3xl font-bold text-center mb-6">Recipes</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
      {randomRecipe ? (
        <div className="card bg-base-100 shadow-xl" key={randomRecipe.idMeal}>
          <figure>
            <img src={randomRecipe.strMealThumb} alt={randomRecipe.strMeal} />
          </figure>
          <div className="card-body">
            <h2 className="card-title"><strong>{randomRecipe.strMeal}</strong></h2>
            <p><strong>Instructions:  </strong>{randomRecipe.strInstructions}</p>
            {randomRecipe.strYoutube && (
              <a
                href={randomRecipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Watch on Youtube
              </a>
            )}
            <div className="card-actions justify-end">
              <button className="btn btn-secondary">Save Recipe</button>
            </div>
          </div>
        </div>
      ) : recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div className="card bg-base-100 shadow-xl" key={recipe.idMeal}>
            <figure>
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            </figure>
            <div className="card-body">
              <h2 className="card-title"><strong>{recipe.strMeal}</strong></h2>
              <p><strong>Instructions:  </strong>{recipe.strInstructions}</p>
              {recipe.strYoutube && (
                <a
                  href={recipe.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  Watch on Youtube
                </a>
              )}
              <div className="card-actions justify-end">
                <button className="btn btn-secondary">Save Recipe</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        query && <p>No recipes found for "{query}".</p> // Show message if no recipes found
      )}
    </div>
  </section>
);
}

export default Recipes;
