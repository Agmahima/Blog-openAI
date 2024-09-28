// app.js
const router = require("express").Router();
const dotenv = require('dotenv');
const { OpenAI } = require("openai");
const BlogPost = require("../models/blogPost.js");
const jwt = require('jsonwebtoken');

dotenv.config(); 

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/generate-blog', async (req, res) => {
  const { prompt, token } = req.body;
  const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
  const userId = decoded.id;
  console.log(prompt, userId);

  try {
    console.log('received prompt', prompt);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125", 
      messages: [{ role: "user", content: prompt }],
      temperature: 1,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const blogContent = response.choices[0].message.content;

    // Save the new blog post to the database
    const newBlog = new BlogPost({
      title: prompt,  // You can use the prompt as the title or customize it
      content: blogContent,
      userId: userId,
    });
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



