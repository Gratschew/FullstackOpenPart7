// BlogForm.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

test("calls the handleCreateBlog function with the correct data when the form is submitted", () => {
  // Create a mock function for addBlog
  const handleCreateBlog = vi.fn();

  // Render the BlogForm component, passing the mock function as the addBlog prop
  render(<BlogForm addBlog={handleCreateBlog} />);

  // Simulate user input in the form fields
  fireEvent.change(screen.getByLabelText(/Title/i), {
    target: { value: "Test Blog Title" },
  });
  fireEvent.change(screen.getByLabelText(/Author/i), {
    target: { value: "Test Author" },
  });
  fireEvent.change(screen.getByLabelText(/URL/i), {
    target: { value: "http://test.com" },
  });

  // Submit the form
  fireEvent.click(screen.getByText(/Create/i));

  // Assert that the handleCreateBlog function was called with the correct data
  expect(handleCreateBlog).toHaveBeenCalledWith({
    title: "Test Blog Title",
    author: "Test Author",
    url: "http://test.com",
  });
});
