import React, { useState, useEffect } from "react";
import axios from "axios";

export const Summary = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch blogs for the logged-in user
    const fetchBlogs = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get("https://blog-open-ai-jqd1.vercel.app/api/blog/user-blogs", {
          params: { token },
        });
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setErrorMessage("Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this blog?");
    if (confirmed) {
      try {
        await axios.delete(`https://blog-open-ai-jqd1.vercel.app/api/blog/delete/${id}`);
        setBlogs(blogs.filter(blog => blog._id !== id)); // Remove blog from the list
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete blog.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-3xl font-bold mb-4">Your Blogs</h1>
      {loading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <table className="min-w-full table-auto border-collapse bg-white shadow-lg">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{blog.title}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-2"
                    onClick={() => window.location.href = `/view/${blog._id}`}  // Redirect to view page
                  >
                    View
                  </button>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded mr-2"
                    onClick={() => window.location.href = `/edit/${blog._id}`}  // Redirect to edit page
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
