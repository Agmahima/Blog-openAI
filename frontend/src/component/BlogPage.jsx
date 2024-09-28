import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogPage = ({ editable }) => {
  const { id } = useParams(); // Get the blog ID from the route parameters
  const [blogPost, setBlogPost] = useState({ title: "", content: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    console.log(editable);
    const fetchBlogPost = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get(`https://blog-open-ai-jqd1.vercel.app/api/blogInfo/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token for authorization
          },
        });
        setBlogPost(response.data);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setError("Failed to fetch blog post. Please try again later.");
      }
    };

    fetchBlogPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null); // Clear any previous errors
    try {
      const token = sessionStorage.getItem('token');
      await axios.put(`https://blog-open-ai-jqd1.vercel.app/api/blogInfo/${id}`, blogPost, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token for authorization
        },
      }); // Update the blog post
      alert("Blog post saved successfully!");
      // Optionally, you can redirect to the blog summary page or clear the fields
    } catch (error) {
      console.error("Error saving blog post:", error);
      setError("Failed to save blog post. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <h1>{editable ? "Edit Blog Post" : "View Blog Post"}</h1>
      {error && <div className="text-red-500">{error}</div>} {/* Display error message */}
      {editable ? (
        <div>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={blogPost.title}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
            />
          </div>
          <div>
            <label>Content:</label>
            <textarea
              name="content"
              value={blogPost.content}
              onChange={handleChange}
              className="border px-2 py-1 w-full h-40"
            ></textarea>
          </div>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-1 px-4 mt-2 rounded"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      ) : (
        <div>
          <h2>{blogPost.title}</h2>
          <p>{blogPost.content}</p>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
