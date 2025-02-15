const Notification = ({ message, type }) => {
  if (!message) return null; // Hide if no message

  const notificationStyle = {
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid",
    borderRadius: "5px",
    backgroundColor: type === "error" ? "#f8d7da" : "#d4edda",
    color: type === "error" ? "#721c24" : "#155724",
  };

  return (
    <div style={notificationStyle} id={type} className={type}>
      {message}
    </div>
  );
};

export default Notification;
