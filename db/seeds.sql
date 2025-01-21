INSERT INTO users(id, first_name, last_name, email)
VALUES (001, "Solidus", "Snake", "ssnake@gmail.com");

INSERT INTO ingredients(id, recipe, ing_list, instructions)
VALUES (101, "Lemon Cake", "2 eggs, 1.5 cups flour, .5 cup butter, 1 cup sugar, 2 tsp vanilla extract, 1.75 tsp baking powder", "Put everything together and bake it.")

INSERT INTO saved_recipes(id, user_id, recipe_API_id, ingredient_id, inc_or_exc)
VALUES (201, 001, bleh, 101, true);