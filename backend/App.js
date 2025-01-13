const express = require('express');
const connectDatabase = require('./db/database');
const app = express();

// Load environment variables
require('dotenv').config({ path: './config/.env' });

// Connect to MongoDB
connectDatabase();

// Middleware to parse JSON
app.use(express.json());

// Define a route for '/'
app.get('/', (req, res) => {
    res.status(200).send('🚀 Welcome to the Home Page!');
});

// Error handling middleware
const ErrorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: err.message });
};

app.use(ErrorHandler);

module.exports = app;
