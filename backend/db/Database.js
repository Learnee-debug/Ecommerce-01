const mongoose = require('mongoose');

const connectDatabase = () => {
    const dbURL = process.env.DB_URL;

    // Validate DB_URL
    if (!dbURL) {
        console.error("❌ Error: DB_URL is undefined. Please check your .env file.");
        process.exit(1);
    }

    mongoose.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((data) => {
        console.log(`✅ MongoDB Database connected with HOST: ${data.connection.host}`);
    })
    .catch((err) => {
        console.error(`❌ MongoDB connection failed: ${err.message}`);
        process.exit(1);
    });
};

module.exports = connectDatabase;

