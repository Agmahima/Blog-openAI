const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt"); // Import bcrypt for hashing passwords
require("dotenv").config()

private_key = process.env.PRIVATE_KEY


const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true }
});

// Generate JWT token method
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
        { id: this._id }, 
        private_key,
        { expiresIn: '7d' }
    );
    return token;
};

// Validate user input
const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
    });
    return schema.validate(data);
};

const User = mongoose.model("User", userSchema); 
module.exports = { User, validate };
