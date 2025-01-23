import React, {useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Home Component
const Home = () => {
  const navigate = useNavigate(); // Use useNavigate for
 
  const handleSearch = (query: string): void => {
    console.log(`Searching for: ${query}`);
    navigate(`/recipes?search=${query}`); // Navigates to the Recipes page with query
  };

  // Add this function to explore random recipes (3_04_PM)
  const exploreRandomRecipe = () => {
    // Navigate to the Recipes page for a random recipe
    navigate(`/recipes?search=random`); // Use a specific query for random recipes
  };
 
  return (
      <section className="hero bg-base-200 py-10">
          <div className="hero-content text-center">
              <div className="max-w-md">
                  <h1 className="text-5xl font-bold">Discover Your Next Favorite Recipe</h1>
                  <p className="py-6">Browse and share your favorite recipes with the community. Find recipes tailored to your taste.</p>
                  {/* Add the SearchBar component here */}
                  <SearchBar onSearch={handleSearch} />
                  <button onClick={exploreRandomRecipe} className="btn btn-primary">Explore Recipes</button>
                  
              </div>
          </div>
      </section>
  );
};

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  interface SearchFormEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSearch = (e: SearchFormEvent): void => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query); // Pass the query to the parent component
    }
  };

  return (
      <form onSubmit={handleSearch} className="flex justify-center items-center mb-6">
          <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search recipes..."
              className="input input-bordered w-full max-w-xs"
          />
          <button type="submit" className="btn btn-primary ml-2">Search</button>
      </form>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <header>
          <h1>Recipe Finder</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/recipes">Recipes</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Search /> {/* Include the Search component here */}
          <Switch>
            <Route path="/recipes" component={Recipes} />
            <Route path="/" exact>
              <h2>Welcome to the Recipe Finder</h2>
              {/* You can add more content here */}
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default Home;
