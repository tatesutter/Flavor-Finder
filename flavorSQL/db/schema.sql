CREATE DATABASE flavorFinder_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL
)

CREATE TABLE saved_recipes (
    id SERIAL PRIMARY KEY,
    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE SET NULL,
    recipe_API_id VARCHAR(40) NOT NULL,
    strMealThumb VARCHAR(100) NOT NULL,
    strInstructions VARCHAR(100) NOT NULL,
    strYoutube VARCHAR(100) NOT NULL
)
