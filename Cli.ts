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
              choices: ['View recipes', "Add recipe", "Change recipe"],
            },
          ])
          .then(async(answers) => {
            if (answers.recipeFinder === 'View recipes') {
                const result = await pool.query("SELECT * FROM saved_recipes");
                const cookbook = result.rows;
                console.log("\n");
                console.table(cookbook);
            } else if (answers.recipeFinder === "Add recipe") {
                const result = await pool.query("SELECT * FROM saved_recipes");
                const roles = result.rows;

            } else if (answers.recipeFinder === "Change recipe") {
                const result = await pool.query("SELECT * FROM saved_recipes");
                const roles = result.rows;

            }
        })
    }
}