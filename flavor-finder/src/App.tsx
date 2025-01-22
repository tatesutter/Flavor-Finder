import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// Navbar Component
interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout }) => (
  <nav className="navbar bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg p-4">
    <div className="navbar-start">
      <Link to="/" className="text-2xl font-bold tracking-wide">Flavor Finder</Link>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-4">
        <li><Link to="/recipes" className="hover:underline">Recipes</Link></li>
        <li><Link to="/profile" className="hover:underline">Profile</Link></li>
        {isAuthenticated ? (
          <li><button onClick={onLogout} className="hover:underline">Logout</button></li>
        ) : (
          <>
            <li><Link to="/login" className="hover:underline">Login</Link></li>
            <li><Link to="/signup" className="hover:underline">Signup</Link></li>
          </>
        )}
      </ul>
    </div>
    <div className="navbar-end">
      <button className="btn bg-white text-blue-500 hover:bg-gray-200">Get Started</button>
    </div>
  </nav>
);

// Home Component
const Home = () => {
  interface HomeProps {
    handleSearch: (query: string) => void;
  }

  const handleSearch = (query: string): void => {
    console.log(`Searching for: ${query}`);
    // Implement search logic here or navigate to the recipes page with the query
    // For example:
    // window.location.href = `/recipes?search=${query}`;
  };

  return (
      <section className="hero bg-base-200 py-10">
          <div className="hero-content text-center">
              <div className="max-w-md">
                  <h1 className="text-5xl font-bold">Discover Your Next Favorite Recipe</h1>
                  <p className="py-6">Browse and share your favorite recipes with the community. Find recipes tailored to your taste.</p>
                  {/* Add the SearchBar component here */}
                  <SearchBar onSearch={handleSearch} />
                  <Link to="/recipes" className="btn btn-primary">Explore Recipes</Link>
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

// Recipes Component
const Recipes = () => (
  <section className="py-10">
    <h2 className="text-3xl font-bold text-center mb-6">Recipes</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
      <div className="card bg-base-100 shadow-xl">
        <figure><img src="https://via.placeholder.com/150" alt="Recipe" /></figure>
        <div className="card-body">
          <h2 className="card-title">Recipe Name</h2>
          <p>Short description of the recipe.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">View Recipe</button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Profile Component (Protected)
const Profile = () => (
  <section className="py-10 bg-gray-200">
    <h2 className="text-3xl font-bold text-center mb-6">User Profile</h2>
    <div className="max-w-lg mx-auto bg-white shadow-md p-6 rounded-lg">
      <h3 className="text-2xl font-bold">User Name</h3>
      <p>Favorite Recipes:</p>
      <ul className="list-disc pl-6">
        <li>Recipe 1</li>
        <li>Recipe 2</li>
        <li>Recipe 3</li>
      </ul>
    </div>
  </section>
);

// Login Component
interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  interface LoginFormEvent extends React.FormEvent<HTMLFormElement> {}

  const handleLogin = async (e: LoginFormEvent) => {
    e.preventDefault();
    try {
      // Mock API request for token
      const token: string = 'mock-jwt-token'; // Replace with actual API call
      localStorage.setItem('jwtToken', token);
      onLogin();
    } catch (error: any) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
      <div className="max-w-sm mx-auto bg-white shadow-md p-6 rounded-lg">
        <form onSubmit={handleLogin}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary w-full">Login</button>
          </div>
        </form>
      </div>
    </section>
  );
};

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  interface SignupFormEvent extends React.FormEvent<HTMLFormElement> {}

  const handleSignup = async (e: SignupFormEvent): Promise<void> => {
    e.preventDefault();
    try {
      // Make an API call for signing up (this is just a placeholder)
      console.log('Sign Up Details:', { username, email, password });

      // Here, save the user info or token after successful signup
      // localStorage.setItem('jwtToken', token); // If your backend returns a JWT token

      // After successful signup, redirect user or update state
      window.location.href = '/login'; // Redirect to login page after successful signup
    } catch (error: any) {
      console.error('Signup failed:', error.message);
    }
  };

  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold text-center mb-6">Signup</h2>
      <div className="max-w-sm mx-auto bg-white shadow-md p-6 rounded-lg">
        <form onSubmit={handleSignup}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary w-full">Signup</button>
          </div>
        </form>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => (
  <footer className="footer footer-center p-4 bg-base-300 text-base-content">
    <div>
      <p>© 2025 Flavor Finder App. All rights reserved.</p>
    </div>
  </footer>
);

// App Component
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      try {
        jwtDecode(token); // Verify token
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem('jwtToken');
      }
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/profile" />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
