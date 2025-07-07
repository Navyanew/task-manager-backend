require('dotenv').config();
console.log('JWT_SECRET:', process.env.JWT_SECRET);

const jwt = require('jsonwebtoken');

const payload = { userId: '123', name: 'TestUser' };
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

console.log('Token:', token);

const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log('Decoded:', decoded);
