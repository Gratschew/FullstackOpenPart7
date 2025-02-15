import { useState } from "react";

const Blog = ({ blog, handleLike, handleDelete, loggedUser }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleDeleteClick = () => {
    // Show confirmation dialog before deleting
    if (
      window.confirm(
        `Are you sure you want to delete the blog "${blog.title}"?`
      )
    ) {
      handleDelete(blog.id);
    }
  };

  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <div className="blog-item">
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility}>{visible ? "Hide" : "View"}</button>
      </div>
      {visible && (
        <div>
          <p>{blog.url}</p>

          <div id="like-count">
            likes {blog.likes}
            <button
              id={`like-btn-${blog.title.replace(/\s+/g, "")}`}
              onClick={() => handleLike(blog)}
            >
              Like
            </button>
          </div>

          <p>{blog.user?.name || "Unknown"}</p>
          {/* Show delete button only if the logged-in user is the creator of the blog */}
          {loggedUser.username && blog.user?.name === loggedUser.username && (
            <button onClick={handleDeleteClick}>Delete</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
