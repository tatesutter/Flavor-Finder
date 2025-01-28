INSERT INTO users(id, first_name, last_name, email)
VALUES (001,
        "Solidus",
        "Snake",
        "ssnake@gmail.com");


INSERT INTO ingredients(id, ingredient_name)
VALUES (101,
        "eggs")
INSERT INTO saved_recipes(id, user_id, recipe_API_id, ingredient_id, inc_or_exc)
VALUES (201,
        001,
        bleh,
        101,
        true);

