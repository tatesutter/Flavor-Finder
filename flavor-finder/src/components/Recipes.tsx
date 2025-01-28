import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Recipes Component
const Recipes: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("search"); // Get the search query from the URL
  const [recipes, setRecipes] = useState<any[]>([]); // Adjust the type as necessary
  const [savedRecipes, setSavedRecipes] = useState<any[]>([]); // State for saved recipes

  interface Recipe {
    idMeal: string;
    strMeal: string;
    strInstructions: string;
    strMealThumb: string;
    strYoutube?: string;
  }

  const [randomRecipe, setRandomRecipe] = useState<Recipe | null>(null); // Adjust the type as necessary
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  interface UserData {
    id: number;
    email: string;
  }

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset error state

      try {
        if (query === "saved") {
          //let userId = 3;
          // const token = localStorage.getItem("jwtToken");
          // console.log("Token:", token);
          // if (token) {
          //   const decoded = jwtDecode<UserData>(token);
          //   userId = decoded.id; // Verify token
          //   console.log("decoded", JSON.stringify(decoded, null, 2));
          // }
          // Fetch saved recipes from the database
          const savedResponse = await axios.get(`/api/recipe/getSavedRecipes`);
          console.log("Saved Recipes Response:", savedResponse.data);
          setSavedRecipes(savedResponse.data);
        } else if (query === "random") {
          // Fetch a random recipe
          const randomResponse = await axios.get(
            "https://www.themealdb.com/api/json/v1/1/random.php"
          );
          console.log("Random Recipe Response:", randomResponse.data);
          setRandomRecipe(randomResponse.data.meals[0] || null);
        } else {
          // Fetch recipes based on the search query
          const recipesResponse = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
          );
          console.log("Recipes Response:", recipesResponse.data);
          setRecipes(recipesResponse.data.meals || []);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false); // Stop loading after fetching data
      }
    };

    fetchRecipes(); // Call the function to fetch recipes and random recipe
  }, [query]); // Fetch the recipes whenever the query changes

  const handleSaveRecipe = async (recipe: Recipe) => {
    try {
      const response = await axios.post("/api/recipe/saveRecipe", {
        idMeal: recipe.idMeal,
        strMeal: recipe.strMeal,
        strMealThumb: recipe.strMealThumb,
        strInstructions: recipe.strInstructions,
        strYoutube: recipe.strYoutube || "",
      });
      console.log(response.status);

      if (response.status === 201) {
        alert("Recipe saved successfully!");
      } else {
        alert("Failed to save the recipe.");
      }
    } catch (error) {
      console.error(
        "Error saving the recipe:",
        (error as any).response || error
      );
      alert("An error occurred while saving the recipe.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Recipes</h2>
      <div className="mb-6 text-center">
        {/* <button
          onClick={() => window.history.pushState({}, '', '?search=saved')}
          className="btn btn-secondary"
        >
          View Saved Recipes
        </button> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {query === "saved" ? (
          savedRecipes.length > 0 ? (
            savedRecipes.map((recipe) => (
              <div className="card bg-base-100 shadow-xl" key={recipe.idMeal}>
                <figure>
                  <img src={recipe.strMealThumb} alt={recipe.strMeal} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    <strong>{recipe.strMeal}</strong>
                  </h2>
                  <p>
                    <strong>Instructions: </strong>
                    {recipe.strInstructions}
                  </p>
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
                </div>
              </div>
            ))
          ) : (
            <p>No saved recipes found.</p>
          )
        ) : randomRecipe ? (
          <div className="card bg-base-100 shadow-xl" key={randomRecipe.idMeal}>
            <figure>
              <img src={randomRecipe.strMealThumb} alt={randomRecipe.strMeal} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                <strong>{randomRecipe.strMeal}</strong>
              </h2>
              <p>
                <strong>Instructions: </strong>
                {randomRecipe.strInstructions}
              </p>
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
                <button
                  className="btn btn-secondary"
                  onClick={() => handleSaveRecipe(randomRecipe)}
                >
                  Save Recipe
                </button>
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
                <h2 className="card-title">
                  <strong>{recipe.strMeal}</strong>
                </h2>
                <p>
                  <strong>Instructions: </strong>
                  {recipe.strInstructions}
                </p>
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
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleSaveRecipe(recipe)}
                  >
                    Save Recipe
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          query && <p>No recipes found for "{query}".</p>
        )}
      </div>
    </section>
  );
};

export default Recipes;
