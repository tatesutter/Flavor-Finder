require('dotenv').config();

const express = require('express');
const sequelize = require('./api/config/database'); // Adjust the path to your Sequelize instance
const userRoutes = require('./api/routes/userRoutes'); // Adjust the path to your user routes
const recipeRoutes = require('./api/routes/recipeRoutes'); // Adjust the path to your recipe routes

const app = express();
app.use(express.json());

// Routes
app.use('/api/routes', userRoutes); // User-related routes
app.use('/api/recipe', recipeRoutes); // Recipe-related routes
app.use(express.static('../dist'));

// Sync database and start server
sequelize
  .sync({ alter: true }) // Synchronize database schema
  .then(() => {
    console.log('Database synchronized successfully');
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('Error synchronizing database:', err));
