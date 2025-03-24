// // Code by: Yousuf Ahmed, Aleem Abbas Hussein, Mohammed Zarrar Shahid

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios"; // Using axios directly for testing
// import "../styles/LoginForm.css";
// import LoadingIndicator from "../components/LoadingIndicator";
// import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
// import * as jwtDecodeModule from "jwt-decode";
// // // Optionally define these if not coming from constants
// // const ACCESS_TOKEN = "accessToken";
// // const REFRESH_TOKEN = "refreshToken";

// const LoginForm = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Update the URL if necessary
//       const res = await axios.post("http://localhost:8000/api/token/", {
//         username,
//         password
//       });
      
//       console.log("Response data:", res.data);
//       console.log("Access token:", res.data.access);
//       console.log("Refresh token:", res.data.refresh);

//       localStorage.setItem(ACCESS_TOKEN, res.data.access);
//       localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

//       console.log("LS access token (immediately after set):", localStorage.getItem(ACCESS_TOKEN));
//       console.log("LS refresh token (immediately after set):", localStorage.getItem(REFRESH_TOKEN));

//       // Navigate to home after successful login
//       navigate("/home");
//     } catch (error) {
//       console.error("Login error:", error.response?.data || error.message);
//       alert("Login failed: " + JSON.stringify(error.response?.data || error.message));
//     } finally {
//       setLoading(false);
//     }
//   };

 
//   return (
//     <div className="container">
//       <button
//         type="button"
//         className="close-btn"
//         onClick={() => (window.location.href = "/home")}
//       >
//         X
//       </button>

//       <div className="header">
//         <h1 className="poppins-bold">Hello</h1>
//         <h2 className="poppins-light">Sign In!</h2>
//       </div>

//       <div className="wrapper">
//         <form onSubmit={handleSubmit}>
//           <div className="input-box">
//             <input
//               onChange={(e) => setUsername(e.target.value)}
//               value={username}
//               type="text"
//               placeholder="Username"
//               required
//             />
//           </div>
//           <div className="input-box">
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               value={password}
//               type="password"
//               placeholder="Password"
//               required
//             />
//           </div>

//           <div className="forgot">
//             <a href="/reset">Forgot password?</a>
//           </div>

//           {loading && <LoadingIndicator />}
//           <button type="submit">SIGN IN</button>

//           <div className="footer-1">
//             <h1>Don't have an account?</h1>
//             <a href="/signup">Sign up</a>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

// Code by: Yousuf Ahmed, Aleem Abbas Hussein, Mohammed Zarrar Shahid

// Code by: Yousuf Ahmed, Aleem Abbas Hussein, Mohammed Zarrar Shahid

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import "../styles/LoginForm.css";
import LoadingIndicator from "../components/LoadingIndicator";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import * as jwtDecodeModule from "jwt-decode";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("http://localhost:8000/api/token/", {
        username,
        password,
      });

      console.log("Response data:", res.data);

      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

      console.log("LS access token:", localStorage.getItem(ACCESS_TOKEN));
      console.log("LS refresh token:", localStorage.getItem(REFRESH_TOKEN));

      navigate("/home");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Login failed: " + JSON.stringify(error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <button
        type="button"
        className="close-btn"
        onClick={() => (window.location.href = "/home")}
      >
        X
      </button>

      <div className="header">
        <h1 className="poppins-bold">Hello</h1>
        <h2 className="poppins-light">Sign In!</h2>
      </div>

      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              placeholder="Username"
              required
            />
          </div>
          <div className="input-box">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <div className="forgot">
            <a href="/reset">Forgot password?</a>
          </div>

          {loading && <LoadingIndicator />}
          <button type="submit">SIGN IN</button>

          <div className="footer-1">
            <h1>Don't have an account?</h1>
            <a href="/signup">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;


