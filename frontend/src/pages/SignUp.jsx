import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingIndicator from '../components/LoadingIndicator';
import '../styles/SignUp.css';

const SignUp = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/user/register/", {
        username,
        password
      });

      localStorage.setItem("accessToken", res.data.access);
      localStorage.setItem("refreshToken", res.data.refresh);

      navigate("/");
    } catch (error) {
      console.error(error);
      setErMsg("Registration failed: " + (error.response?.data?.username?.join(" ") || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="signupcontainer">
        <button
          type="button"
          onClick={() => window.location.href = '/splashscreen'}
        >
          X
        </button>
        <div className="signupheader">
          <h1>Create Your</h1>
          <h2>Account</h2>
          <h2 className="error-msg" style={{color: "red"}}>{errMsg}</h2>
        </div>
      </div>
      
      <div className="signupwrapper">
        <form onSubmit={handleSubmit}>
          <div className="signup-input-box">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Username"
              required
            />
          </div>

          <div className="signup-input-box1">
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              placeholder="Email Address"
              required
            />
          </div>

          <div className="signup-input-box2">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <div className="signup-input-box3">
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              type="password"
              placeholder="Confirm Password"
              required
            />
          </div>

          {loading && <LoadingIndicator />}
          <button type="submit">SIGN UP</button>

          <div className="signup-footer">
            <h1>Have an account?</h1>
            <a href="/loginform">Sign In</a>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
