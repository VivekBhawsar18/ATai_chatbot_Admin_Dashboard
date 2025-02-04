import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Import the external CSS for styling

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleLogin = (event) => {
    event.preventDefault();

    // Simple validation for username and password (you can expand this)
    if (username === "admin" && password === "admin123456") {
      // Redirect to the dashboard page after successful login
      navigate("/dashboardlayout");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="textbox">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        {/* <div className="footer">
          <p>Don't have an account? <a href="#">Sign up</a></p> */}
        {/* </div> */}
      </div>
    </div>
  );
}
