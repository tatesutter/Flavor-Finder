const jwt = require('jsonwebtoken');

// Generate a JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email }, // Payload
    process.env.JWT_SECRET,             // Secret key
    { expiresIn: '1h' }                 // Options
  );
};

// Verify a JWT
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};