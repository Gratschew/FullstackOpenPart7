import React, { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import loginService from "../services/login";

const Login = ({ setName, setToken, showNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (event) => {
    event.preventDefault();

    try {
      const loginObj = await loginService.login({ username, password });
      setToken(loginObj.token);
      setName(loginObj.name);

      localStorage.setItem("token", loginObj.token);
      localStorage.setItem("name", loginObj.name);

      showNotification("Login successful!", "success");
    } catch (error) {
      showNotification("invalid username or password", "error");
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={login} id="loginForm">
        <div>
          Username:
          <input
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          Password:
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button id="login-button" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

// Define PropTypes for the Login component
Login.propTypes = {
  setName: PropTypes.func.isRequired, // setName must be a function
  setToken: PropTypes.func.isRequired, // setToken must be a function
  showNotification: PropTypes.func.isRequired, // showNotification must be a function
};

export default Login;
