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
          if (query) {
              console.log(`Fetching recipes for query: ${query}`); // Log the query
              const options = {
                  method: 'GET',
                  url: `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`, // Corrected URL
              };

        try {
          const response = await axios.request(options);
          console.log('Response:', response.data); // Log the entire response
          setRecipes(response.data.meals || []); // Use meals or an empty array if undefined
          // setLoading(false);
        } catch (error) {
          console.error(error);
          setError('Failed to fetch data');
          // setLoading(false);
        } finally {
          setLoading(false); // Stop loading after fetching data
        }
      } else {
        console.log('No search query provided.'); // Log if no query is present
        setLoading(false); // Stop loading if no query is present
      }

      const fetchRandomRecipe = async () => {
        const randomOptions = {
          method: 'GET',
          url: 'https://www.themealdb.com/api/json/v1/1/random.php', // Random Results from API
        };

try {
  const randomResponse = await axios.request(randomOptions);
                    console.log('Random Recipe Response:', randomResponse.data); // Log the random recipe response
                    setRandomRecipe(randomResponse.data.meals[0] || null); // Set the random recipe
                } catch (error) {
                    console.error(error);
                    setError('Failed to fetch random recipe');
                }

      };

      fetchRandomRecipe(); // Call the function to fetch a random recipe
      // setLoading(false); // Stop loading after fetching random recipe
    };

    fetchRecipes(); // Call the function to fetch recipes based on search query
  }, [query]); // Fetch the recipes whenever the query changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div className="card bg-base-100 shadow-xl" key={recipe.idMeal}>
              <figure>
                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              </figure>
              <div className="card-body">
                <h2 className="card-title"><strong>{recipe.strMeal}</strong></h2>
                <p><strong>Instructions:  </strong>{recipe.strInstructions}</p>
                {recipe.strYoutube && (
                  <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
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
          // Only show this message if the query is not empty
          // query && 
          <p>Recipe found for "{query}".</p>
        )}
      </div>

      {randomRecipe && (
                <div className="mt-10">
                    <h2 className="text-3xl font-bold text-center mb-6">Try This Random Recipe!</h2>
                    <div className="card bg-base-100 shadow-xl">
                        <figure>
                            <img src={randomRecipe.strMealThumb} alt={randomRecipe.strMeal} />
                            </figure>
                    <div className="card-body">
                      <h2 className="card-title"><strong>{randomRecipe.strMeal}</strong></h2>
                      <p><strong>Instructions:  </strong>{randomRecipe.strInstructions}</p>
                      {randomRecipe.strYoutube && (
                      <a href={randomRecipe.strYoutube} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                          Watch on Youtube
                          </a>
                    )}
                      <div className="card-actions justify-end">
                      <button className="btn btn-primary">Save Recipe</button>     
                      </div>
                        </div>
                    </div>
                </div>
            )}
    </section>
  );
};

export default Recipes;
