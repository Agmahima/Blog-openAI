const router = require("express").Router();
const BlogPost = require("../models/blogPost.js");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { OpenAI } = require("openai");

router.post('/', async (req, res) => {
 
   const {title, content, token}=req.body;
   const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
  const userId = decoded.id;
  console.log(title,content, userId);
  try {

    // const blogContent = response.choices[0].message.content;
     const blogContent=content;
    // Save the new blog post to the database
    const newBlog = new BlogPost({
      title: title,  // You can use the prompt as the title or customize it
      content: blogContent,
      userId: userId,
    });

    await newBlog.save();

    // Send the response after saving the blog post
    return res.status(200).json({
      message: 'Blog post generated and saved successfully',
      blogContent: blogContent,
      blog: newBlog
    });

  } catch (error) {
    console.error('Error generating blog:', error);
    return res.status(500).json({ error: 'An error occurred while generating the blog post' });
  }
});

module.exports = router;
