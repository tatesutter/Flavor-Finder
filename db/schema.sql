CREATE DATABASE flavorFinder_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL
)

CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    recipe VARCHAR(30),
    ing_list TEXT,
    instructions TEXT
)

CREATE TABLE saved_recipes (
    id SERIAL PRIMARY KEY,
    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE SET NULL,
    recipe_API_id VARCHAR(40) NOT NULL,
    FOREIGN KEY(ingredient_id)
    REFERENCES ingredients(id)
    ON DELETE SET NULL,
    inc_or_exc BOOLEAN,
)