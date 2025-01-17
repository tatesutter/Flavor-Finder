-- UNCOMMENT THE LINE BELOW IF YOU NEED TO DROP THE flavor_finder_database
-- DROP DATABASE IF EXISTS employee_tracker_db;

-- Create the flavor_finder_db database
CREATE DATABASE flavor_finder_db;

-- UNCOMMENT the 3 lines below if you need drop the tables because they already exist
-- DROP TABLE IF EXISTS users CASCADE;
-- DROP TABLE IF EXISTS saved_recipes CASCADE;
-- DROP TABLE IF EXISTS ingredients CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email_address VARCHAR(100) UNIQUE NOT NULL,
    -- Need to encrypt the password
    password VARCHAR(100) NOT NULL
);

CREATE TABLE saved_recipes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL,
    recipe_id_from_api INTEGER NOT NULL,
    ingredient_id INTEGER NOT NULL,
    included BIT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id) ON DELETE CASCADE
);

CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    ingredient_name VARCHAR(30) NOT NULL
)
