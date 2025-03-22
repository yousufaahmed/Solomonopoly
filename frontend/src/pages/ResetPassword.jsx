import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ResetPassword.css";
import LoadingIndicator from "../components/LoadingIndicator";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import * as jwtDecodeModule from "jwt-decode";

const ResetPwd = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Replace this URL with your actual reset password API endpoint
      await axios.post("http://localhost:8000/api/reset-password/", { email });
      // Optionally, show a success message or navigate to a confirmation page
      navigate("/loginform");
    } catch (error) {
      console.error("Reset password error:", error);
      // Optionally display an error message to the user here
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
        <h1 className="poppins-bold">Reset Password</h1>
        <h2 className="poppins-lightf">Enter Email Address below</h2>
      </div>

      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {loading && <LoadingIndicator />}
          <button type="submit"
          onClick={() => (window.location.href = "/home")}>Reset</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPwd;
