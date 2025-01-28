# Flavor Finder App

## Overview
The Flavor Finder App is a full-stack web application designed to help users find and save their favorite recipes. It features user authentication, recipe management, and secure access to protected routes. Built using Node.js, Express.js, Sequelize, and JWT, this app ensures both functionality and security.

---

## Features
### 1. User Authentication
- **Sign Up**: Users can register with a username, email, and password.
- **Login**: Authenticate using email and password to receive a secure JSON Web Token (JWT).
- **Protected Routes**: Secure endpoints accessible only to authenticated users.

### 2. Recipe Management
- **Retrieve Recipes**: Fetch a list of saved recipes.
- **Add Recipes**: Add new recipes with a title, ingredients, instructions, and optional image URL.

### 3. Security
- **Password Encryption**: All passwords are hashed using `bcrypt`.
- **JWT-Based Authentication**: Tokens are used to secure user sessions.
- **Middleware**: Authentication middleware protects sensitive routes.

---

## Tech Stack
### Backend:
- **Node.js**: JavaScript runtime for server-side logic.
- **Express.js**: Web framework for building APIs and handling routes.
- **Sequelize**: ORM for managing PostgreSQL/MySQL databases.
- **JWT**: Secure authentication mechanism.
- **API**: MealDB api was used for recipe data.

### Database:
- **Relational Database**: Compatible with PostgreSQL/MySQL (configured using Sequelize).

---

## API Endpoints

### User Routes
| Method | Endpoint       | Description                 | Auth Required |
|--------|----------------|-----------------------------|---------------|
| POST   | `/signup`      | User registration           | No            |
| POST   | `/login`       | User login                  | No            |
| GET    | `/protected`   | Example of a protected route| Yes           |

### Recipe Routes
| Method | Endpoint       | Description                 | Auth Required |
|--------|----------------|-----------------------------|---------------|
| GET    | `/recipes`     | Retrieve all recipes        | No            |
| POST   | `/recipes`     | Add a new recipe            | No            |

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd flavor-finder-app

2. Install dependencies:

    ```bash
    npm install

3. Configure environment variables: Create a .env file in the root directory with the following:

    ```bash
    plaintext
    Copy
    Edit
    JWT_SECRET=your_secret_key
    DATABASE_URL=your_database_connection_string

4. Run the application:

    ```bash
    Copy
    Edit
    npm start
    Access the application at http://localhost:5000.

## File Structure
### Key Files
    user.js: Defines the user model, including password hashing hooks.

    recipe.js: Defines the recipe model schema.

    userRoutes.js: Handles routes for user signup, login, and protected access.

    recipeRoutes.js: Handles routes for recipe retrieval and creation.

    userController.js: Contains logic for user authentication and authorization.

    authenticateToken.js: Middleware for verifying JWTs.

    jwt.js: Utility for generating and verifying JWT tokens.



## Future Enhancements
    User-Specific Recipes: Associate recipes with specific users.

    Image Upload: Enable users to upload recipe images.

    Mobile App: Develop a companion mobile application.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License.