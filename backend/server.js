require('dotenv').config({ path: './config/.env' });

const app = require('./App');

// Handling Uncaught Exceptions
process.on("uncaughtException", (err) => {
    console.error(`❌ Uncaught Exception: ${err.message}`);
    console.error('Shutting down the server due to uncaught exception');
    process.exit(1);
});

// Set PORT with fallback
const PORT = process.env.PORT || 8000;

// Start the server
const server = app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

// Handle Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.error(`❌ Unhandled Rejection: ${err.message}`);
    console.error('Shutting down the server due to unhandled promise rejection');

    server.close(() => {
        process.exit(1);
    });
});

