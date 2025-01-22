import inquirer from "inquirer";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const SQL_PORT = process.env.Port
const {Pool, Client} = pg;

const pool = new Pool({
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  host: 'local_host',
  port: 5432,
  database: 'flavorFinder_db',
});

class Cli {
    performActions(): void {
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'recipeFinder',
              message: 'What would you like to do?',
              choices: ['View recipes', "Add recipe", "Change recipe", "Delete recipe", "Show recipe"],
            },
          ])
          .then(async(answers) => {
            if (answers.recipeFinder === 'View recipes') {
                const result = await pool.query("SELECT * FROM saved_recipes");
                const cookbook = result.rows;
                console.log("\n");
                console.table(cookbook);
            } else if (answers.recipeFinder === "Add recipe") {
                let recipeName = prompt("What is the new recipe's name?");
                let newIngredients = prompt("List off all the ingredients and their portions in a list.");
                let newRecipe = prompt("Describe each step of the recipe, using the ingredients you listed.");
                const result = await pool.query("INSERT INTO ingredients(recipe, ing_list, instructions) VALUES($1, $2, $3)", recipeName, newIngredients, newRecipe);
                const ingredient = result.rows;
                console.log("/n");
                console.table(ingredient);
            } else if (answers.recipeFinder === "Delete recipe") {
                let remove = prompt("Enter the name of the dish you want to remove.");
                const result = await pool.query("DELETE FROM ingredients WHERE recipe = remove");
                const ingredient = result.rows;
                console.log("/n");
                console.table(ingredient);
            } else if (answers.recipeFinder === "Change recipe") {
                const result = await pool.query("ALTER TABLE ingredients");
                const ingredient = result.rows;
            } else if (answers.recipeFinder === "Show recipe") {
                const result = await pool.query("SELECT recipe, ing_list, instructions FROM ingredients ORDER BY RANDOM() LIMIT 1");
                const ingredient = result.rows;
                console.log("/n");
                console.table(ingredient)
            }
        })
    }
}