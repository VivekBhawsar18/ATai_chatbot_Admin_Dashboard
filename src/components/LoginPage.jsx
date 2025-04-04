import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyUserCredentials } from "../services/Services";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required!");
      return;
    }

    if (!validatePassword(password)) return;

    try {
      console.log("Logging in with:", { email, password });
      const response = await verifyUserCredentials({ email, password });

      if (response.status === "success") {
        console.log("Login successful! Redirecting...");
        navigate("/dashboardlayout");
      } else {
        setError(response.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError(error.message || "Login failed. Please try again.");
    }
  };

  const validatePassword = (password) => {
    const startsWithCapital = /^[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const minLength = password.length >= 6;

    if (!startsWithCapital || !hasSpecialChar || !minLength) {
      setError(
        "Password must start with a capital letter, contain a special character, and be at least 6 characters long."
      );
      return false;
    }
    return true;
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="textbox">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="textbox password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
