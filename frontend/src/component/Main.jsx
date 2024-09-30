import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const Main = () => {
  const [prompt, setPrompt] = useState('');
  const [blogPost, setBlogPost] = useState(''); // Holds the generated blog content
  const [isEditing, setIsEditing] = useState(false); // To toggle between edit and view modes
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      console.log("Sending request to backend with prompt:", prompt);
      const token = sessionStorage.getItem('token');
      const response = await axios.post('https://localhost:8080/api/blog/generate-blog', { prompt, token });
      console.log("Response from backend:", response.data);

      if (response) {
        setBlogPost(response.data.blogContent); // Store the generated blog content
        setIsEditing(true); // Enable editing mode
      } else {
        setErrorMessage('Failed to generate blog post.');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const token = sessionStorage.getItem('token');
    try {
      await axios.post('https://blog-openai-6zr3.onrender.com/api/save', { title: prompt, content: blogPost, token });
      alert('Blog post saved successfully!');
      setBlogPost(''); // Clear the input fields after saving
      setPrompt('');
      setIsEditing(false); // Exit editing mode after saving
    } catch (error) {
      console.log('Error saving blog post:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Exit editing mode without saving
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token'); // Clear the token
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-3xl font-bold mb-4">AI Blog Post Generator</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="prompt" className="block text-gray-700 font-bold mb-2">
            Enter Blog Topic:
          </label>
          <input 
            type="text" 
            id="prompt" 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)} 
            className="border rounded w-full py-2 px-3"
            required 
          />
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {loading ? 'Generating...' : 'Generate Blog Post'}
        </button>
      </form>

      {errorMessage && (
        <p className="text-red-500 mt-4">{errorMessage}</p>
      )}

      {blogPost && isEditing && (
        <div className="mt-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-2">Edit Blog Post:</h2>
          <textarea
            value={blogPost}
            onChange={(e) => setBlogPost(e.target.value)} // Allow the user to edit the blog post
            rows="10"
            className="w-full border rounded p-2"
          />
          <div className="mt-4">
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Save Blog Post
            </button>
            <button
              onClick={handleCancelEdit}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {blogPost && !isEditing && (
        <div className="mt-8 p-4 border rounded shadow-lg bg-gray-100">
          <h2 className="text-2xl font-bold mb-2">Generated Blog Post:</h2>
          <p>{blogPost}</p>
          <div className="mt-4">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit Blog Post
            </button>
          </div>
        </div>
      )}

<Link to="/summary">
        <button
          className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          View Summary
        </button>
      </Link>

      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Log Out
      </button>
    </div>
  );
};
