// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./LoginPage.css"; // Import external CSS for styling

// export default function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleLogin = async (event) => {
//     event.preventDefault();

//     if (username === "agent" && password === "123456") {
//       console.log("Login successful. Redirecting...");
      
//       // ✅ Redirect to dashboard
//       navigate("/dashboardlayout");
//     } else {
//       setError("Invalid username or password.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>Login</h2>
//         <form onSubmit={handleLogin}>
//           <div className="textbox">
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div className="textbox">
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           {error && <p className="error">{error}</p>}
//           <button type="submit" className="login-btn">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { verifyUserCredentials } from "../services/Services"; // Only using verifyUserCredentials
// import "./LoginPage.css"; // Import external CSS for styling

// export default function LoginPage() {
//   const [email, setEmail] = useState(""); // Ensure email is used as username
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // 🔹 Handle Login Submission
//   const handleLogin = async (event) => {
//     event.preventDefault();
//     setError(null); // Reset previous errors

//     // ✅ Ensure both fields are filled
//     if (!email.trim() || !password.trim()) {
//       setError("Email and password are required!");
//       return;
//     }

//     // ✅ Validate Password
//     if (!validatePassword(password)) return;

//     try {
//       console.log("Logging in with:", { email, password });

//       // ✅ Ensure correct payload structure
//       const response = await verifyUserCredentials({ email, password });

//       if (response.status === "success") {
//         console.log("Login successful! Redirecting...");
//         navigate("/dashboardlayout");
//       } else {
//         setError(response.message || "Invalid email or password.");
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//       setError(error.message || "Login failed. Please try again.");
//     }
//   };

//   // 🔹 Password Validation Function
//   const validatePassword = (password) => {
//     if (password.length < 8) {
//       setError("Password must be at least 8 characters long.");
//       return false;
//     }
//     if (!/[A-Z]/.test(password)) {
//       setError("Password must contain at least one uppercase letter.");
//       return false;
//     }
//     if (!/[a-z]/.test(password)) {
//       setError("Password must contain at least one lowercase letter.");
//       return false;
//     }
//     if (!/[0-9]/.test(password)) {
//       setError("Password must contain at least one number.");
//       return false;
//     }
//     if (!/[!@#$%^&*]/.test(password)) {
//       setError("Password must contain at least one special character.");
//       return false;
//     }
//     return true;
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>Login</h2>
//         <form onSubmit={handleLogin}>
//           <div className="textbox">
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="textbox">
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           {error && <p className="error">{error}</p>}
//           <button type="submit" className="login-btn">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./LoginPage.css"; // Import external CSS for styling

// export default function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleLogin = async (event) => {
//     event.preventDefault();

//     if (username === "agent" && password === "123456") {
//       console.log("Login successful. Redirecting...");
      
//       // ✅ Redirect to dashboard
//       navigate("/dashboardlayout");
//     } else {
//       setError("Invalid username or password.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>Login</h2>
//         <form onSubmit={handleLogin}>
//           <div className="textbox">
//             <input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div className="textbox">
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           {error && <p className="error">{error}</p>}
//           <button type="submit" className="login-btn">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyUserCredentials } from "../services/Services"; // Only using verifyUserCredentials
import "./LoginPage.css"; // Import external CSS for styling

export default function LoginPage() {
  const [email, setEmail] = useState(""); // Ensure email is used as username
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 🔹 Handle Login Submission
  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null); // Reset previous errors

    // ✅ Ensure both fields are filled
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required!");
      return;
    }

    // ✅ Validate Password
    if (!validatePassword(password)) return;

    try {
      console.log("Logging in with:", { email, password });

      // ✅ Ensure correct payload structure
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

  // 🔹 Password Validation Function
  const validatePassword = (password) => {
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return false;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return false;
    }
    if (!/[0-9]/.test(password)) {
      setError("Password must contain at least one number.");
      return false;
    }
    if (!/[!@#$%^&*]/.test(password)) {
      setError("Password must contain at least one special character.");
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
      </div>
    </div>
  );
}
