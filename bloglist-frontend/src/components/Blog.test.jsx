import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Blog from "./Blog"; // Assuming Blog component is in the same directory

describe("Blog Component", () => {
  const blog = {
    id: "1",
    title: "Test Blog Title",
    author: "Test Author",
    url: "http://example.com",
    likes: 5,
    user: {
      username: "testuser",
      name: "Max",
    },
  };

  const loggedUser = {
    username: "testuser",
  };

  it("renders the title and author, but not url or likes by default", () => {
    // Render the Blog component
    render(
      <Blog
        blog={blog}
        loggedUser={loggedUser}
        handleLike={() => {}}
        handleDelete={() => {}}
      />
    );
    // Assert title and author are visible
    expect(screen.getByText(/Test Blog Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Author/i)).toBeInTheDocument();

    // Assert url and likes are not visible by default
    expect(screen.queryByText("http://example.com")).not.toBeInTheDocument();
    expect(screen.queryByText("likes")).not.toBeInTheDocument();
  });

  it("shows the url, likes, and user details when the 'view' button is clicked", () => {
    // Render the Blog component
    render(
      <Blog
        blog={blog}
        loggedUser={loggedUser}
        handleLike={() => {}}
        handleDelete={() => {}}
      />
    );

    // Find the button that shows the blog details
    const viewButton = screen.getByText(/View/i);

    // Simulate a click on the 'View' button to show details
    fireEvent.click(viewButton);

    // Assert that the url, likes, and user details are now visible
    expect(screen.getByText("http://example.com")).toBeInTheDocument();
    expect(screen.getByText(/likes/i)).toBeInTheDocument();
    expect(screen.getByText(/Max/i)).toBeInTheDocument();
  });
  it("calls the handleLike function twice when the like button is clicked twice", () => {
    // Create a mock function for handleLike
    const handleLike = vi.fn();

    // Render the Blog component with the mock function
    render(
      <Blog
        blog={blog}
        loggedUser={loggedUser}
        handleLike={handleLike}
        handleDelete={() => {}}
      />
    );

    // Find the button that shows the blog details
    const viewButton = screen.getByText(/View/i);

    // Simulate a click on the 'View' button to show details
    fireEvent.click(viewButton);

    // Find the like button (it should be inside the blog details section)
    const likeButton = screen.getByRole("button", { name: /like/i });

    // Simulate two clicks on the like button
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    // Assert that the handleLike function was called twice
    expect(handleLike).toHaveBeenCalledTimes(2);
  });
});
