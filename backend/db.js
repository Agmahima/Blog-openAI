const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.DB_URI

const connectDB = async() => {
    try {
        await mongoose.connect(URI);
        console.log("MongoDB Connected!")   
    } catch (error) {
        console.error("MongoDB Connection Error", error)
    }
}

module.exports = connectDB;
