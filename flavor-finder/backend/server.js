require('dotenv').config();

const express = require('express');
const sequelize = require('./api/config/database'); // Adjust path to your Sequelize instance
const userRoutes = require('./api/routes/userRoutes'); // Adjust path to your routes

const app = express();
app.use(express.json());

// Routes
app.use('/api/routes', userRoutes);

// Sync database and start server
sequelize.sync({ alter: true }) // `alter: true` ensures schema changes are applied without dropping tables
    .then(() => {
        console.log('Database synchronized successfully');
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('Error synchronizing database:', err));
