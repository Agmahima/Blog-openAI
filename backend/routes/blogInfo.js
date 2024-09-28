const router = require("express").Router();
const BlogPost = require("../models/blogPost.js");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config(); // Ensure you load environment variables

// Middleware to authenticate the user
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) return res.sendStatus(401); 

  jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token, forbidden
    req.user = user; // Attach user to request
    next(); // Proceed to the next middleware/route handler
  });
};

// Route to fetch all blogs for a user
router.get('/user-blogs', authenticateToken, async (req, res) => {
  const userId = req.user.id; // Get userId from the decoded token
  try {
    // Fetch blogs created by this user
    const blogs = await BlogPost.find({ userId });
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    res.status(500).json({ message: "Failed to fetch blogs." });
  }
});
//update
router.put('/:id', authenticateToken, async (req, res) => {
    const id = req.params.id;
    console.log(id)
    const { title, content } = req.body; // New content from the request
    try {
      const updatedBlog = await BlogPost.findByIdAndUpdate(
        id,
        { title, content }, // Update both title and content
        { new: true }
      );
      if (!updatedBlog) {
        return res.status(404).json({ message: "Blog not found." });
      }
      res.status(200).json(updatedBlog); // Return the updated blog object
    } catch (error) {
      console.error("Error updating blog:", error);
      res.status(500).json({ message: "Failed to update blog." });
    }
});

//delete
  router.delete('/delete/:id', authenticateToken, async (req, res) => {
      const blogId = req.params.id;
      console.log(`Blog ID : ${blogId}`);
    try {
      await BlogPost.findByIdAndDelete(blogId);
      res.status(200).json({
        "message" : "Blog Deleted Successfully!", 
      }); // No content
    } catch (error) {
      console.error("Error deleting blog:", error);
      res.status(500).json({ message: "Failed to delete blog." });
    }
  });

  router.get('/:id', authenticateToken, async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
      const getBlog = await BlogPost.findById(id); // Fetch the blog post
      if (!getBlog) {
        return res.status(404).json({ message: "Blog not found." });
      }
      res.status(200).json(getBlog); // Return the entire blog object
    } catch (error) {
      console.error("Error fetching blog:", error);
      res.status(500).json({ message: "Failed to fetch blog." });
    }
});

module.exports = router;
