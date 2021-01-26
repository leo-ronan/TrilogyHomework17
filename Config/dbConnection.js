require('dotenv').config();
const mongoose = require('mongoose');
let db = process.env.MONGODB_URI;

async function dbConnection() {
    await mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => console.log("Connection successful")
    );
}

module.exports = dbConnection;