const mongoose = require('mongoose');

// Define the BlogPost schema
const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming userId is an ObjectId
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
