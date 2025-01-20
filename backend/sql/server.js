const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
/* before running, makes ure to install express, cors, and pg using npm install express cors pg */

const app = express();
const port = 5000;

// PostgreSQL connection - need to replace with your own credentials
const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'flavor_finder_db',
    password: 'your_password',
    port: 5432,
});

app.use(cors());
app.use(express.json());

// Endpoint to get saved recipes for a user
app.get('/api/saved-recipes/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const result = await pool.query('SELECT * FROM saved_recipes WHERE user_id = $1', [userId]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching saved recipes:', error);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
