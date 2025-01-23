import React from 'react';
import { Link } from 'react-router-dom';

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

// Navbar Component
interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

export default Navbar;
