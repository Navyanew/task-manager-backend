const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();
const authRoutes = require('./routes/auth');  // Import auth routes
const taskRoutes = require('./routes/tasks');



const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);  // Use auth routes
app.use('/api/tasks', taskRoutes);


// Simple test route
app.get('/', (req, res) => {
res.send('API is running...');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
console.log('MongoDB Connected');
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
})
.catch((error) => {
console.error('MongoDB connection error:', error);
  process.exit(1); // Exit process on failure
});

