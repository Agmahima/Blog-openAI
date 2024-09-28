require('dotenv').config();
const express=require('express');
const app=express();
const cors=require('cors');
const bodyParser=require("body-parser")

const connection=require("./db");
const userRoutes=require('./routes/user');
const authRoutes=require('./routes/auth');
const blogRoutes=require('./routes/blog')
const saveBlogRoutes = require('./routes/save');
const userBlogRoutes=require('./routes/blogInfo');

connection()

app.use(express.json())
app.use(cors());
app.use(bodyParser.json())

app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/blog",blogRoutes);
app.use("/api/save", saveBlogRoutes);
app.use("/api/blogInfo", userBlogRoutes);

const port=process.env.PORT || 8080;
app.listen(port, ()=> console.log(`Listening on port ${port}.....`))