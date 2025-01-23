const express = require('express');
const { signup, login, protectedRoute } = require('../controllers/userController');
const authenticateToken = require('../middlewares/authenticateToken.js');

const router = express.Router();

// User signup
router.post('/signup', signup);

// User login
router.post('/login', login);

// Protected route example
router.get('/protected', authenticateToken, protectedRoute);

module.exports = router;
