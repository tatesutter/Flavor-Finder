import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Recipes from "./components/Recipes"; //Import the Recipes component
import Navbar from "./components/Navbar"; //Import the NavBar component
import Footer from "./components/Footer"; //Import the Footer component
import Home from "./components/Home"; //Import the Home component
import Login from "./components/Login"; //Import the Login component
import Signup from "./components/Signup"; //Import the Signup component
import Profile from "./components/Profile"; //Import the Profile component

// App Component that handles authentication
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem('jwtToken');
  //   if (token) {
  //     try {
  //       jwtDecode(token); // Verify token
  //       setIsAuthenticated(true);
  //     } catch (error) {
  //       console.error("Token is invalid:", error);
  //       localStorage.removeItem('jwtToken');
  //     }
  //   }
  // }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Navigate to="/profile" />
            )
          }
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
