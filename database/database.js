const mongoose = require('mongoose');
require('dotenv').config();

async function connectToDatabase(mongoUri) {
    const MONGODB_URI = process.env.MONGODB_URI;
    const uri = mongoUri ? mongoUri : MONGODB_URI;
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
        console.log("Connected successfully");
    });
}

module.exports = {
    connectToDatabase,
    disconnectFromDatabase: mongoose.disconnect.bind(mongoose),
};
