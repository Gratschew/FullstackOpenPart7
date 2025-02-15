import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [notification, setNotification] = useState({ message: null, type: "" });

  const blogFormRef = useRef(); // Reference to Togglable

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: "" });
    }, 3000);
  };

  const handleLogout = () => {
    setToken(null);
    setName("");
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    showNotification("Logged out successfully", "success");
  };

  const addBlog = async (newBlog) => {
    try {
      const savedBlog = await blogService.create(newBlog, token);
      savedBlog.user = { name: name }; // Modify the user field here
      setBlogs([...blogs, savedBlog]);
      showNotification(
        `A new blog "${savedBlog.title}" by ${savedBlog.author} added`,
        "success"
      );

      blogFormRef.current.toggleVisibility(); // Close form after submission
    } catch (error) {
      console.log(error);
      showNotification("Failed to add blog", "error");
    }
  };
  const handleLike = async (blog) => {
    try {
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1, // Increment likes
      };

      const response = await blogService.update(blog.id, updatedBlog);
      console.log(response);
      setBlogs(
        blogs.map((b) =>
          b.id === blog.id ? { ...b, likes: response.likes } : b
        )
      );
    } catch (error) {
      console.log(error);
      showNotification("Error updating likes", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await blogService.remove(id, token); // Assuming blogService has a remove function
      setBlogs(blogs.filter((blog) => blog.id !== id));
      showNotification("Blog deleted successfully", "success");
    } catch (error) {
      showNotification("Failed to delete blog", "error");
    }
  };

  if (!token) {
    return (
      <div>
        <Notification message={notification.message} type={notification.type} />
        <Login
          setToken={setToken}
          setName={setName}
          showNotification={showNotification}
        />
      </div>
    );
  }
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notification.message} type={notification.type} />
      <div>
        {name} logged in <button onClick={handleLogout}>Logout</button>
      </div>
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      <h3>All blogs</h3>
      <div id="blog-list" className="blog-list" name="blog-list">
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleDelete={handleDelete}
            loggedUser={{ username: name }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
