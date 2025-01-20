import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
    return (
        <div>
            <h1>Welcome to FlavorFinder</h1>
            <p>Let delicious recipes find you!</p>
            <Link to="/recipes">View Recipes #1</Link>
            <Link to="/recipes">View Recipes #2</Link>
            <Link to="/recipes">View Recipes #3</Link>
        </div>
    );
};

export default MainPage;
