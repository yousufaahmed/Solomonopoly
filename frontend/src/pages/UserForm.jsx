import React, { useState } from "react";
import "../styles/UserForm.css";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    commute: [],
    bikeUsage: "",
    busUsage: "",
    replaceCar: "",
    campus: ""
  });

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      commute: checked
        ? [...prev.commute, value]
        : prev.commute.filter((item) => item !== value)
    }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting data:", formData);

    // Future API call here
    // axios.post('/api/userform/', formData)
    //   .then(res => console.log(res))
    //   .catch(err => console.error(err));

    // ✅ Redirect to home
    navigate("/home");
  };

  return (
    <div className="userform-wrapper">
      <Navbar />
      <div className="userform-card">
        <h1 className="userform-title">Travel Preferences Form</h1>
        <form onSubmit={handleSubmit} className="userform-form">
          {/* Commute options (checkbox) */}
          <div className="userform-group">
            <label className="userform-label">
              How do you usually commute? (Select all that apply)
            </label>
            {["Walking", "Cycling", "Public Bus", "Car"].map((mode) => (
              <label key={mode} className="userform-option">
                <input
                  type="checkbox"
                  name="commute"
                  value={mode}
                  checked={formData.commute.includes(mode)}
                  onChange={handleCheckboxChange}
                />
                {mode}
              </label>
            ))}
          </div>

          {/* Bicycle frequency */}
          <div className="userform-group">
            <label className="userform-label">
              How often do you use a bicycle for transportation?
            </label>
            {["Daily", "A few times a week", "Occasionally", "Dont Have One"].map((opt) => (
              <label key={opt} className="userform-option">
                <input
                  type="radio"
                  name="bikeUsage"
                  value={opt}
                  checked={formData.bikeUsage === opt}
                  onChange={handleRadioChange}
                />
                {opt}
              </label>
            ))}
          </div>

          {/* Bus frequency */}
          <div className="userform-group">
            <label className="userform-label">
              How often do you use public buses for commuting?
            </label>
            {["Daily", "A few times a week", "Occasionally", "Never"].map((opt) => (
              <label key={opt} className="userform-option">
                <input
                  type="radio"
                  name="busUsage"
                  value={opt}
                  checked={formData.busUsage === opt}
                  onChange={handleRadioChange}
                />
                {opt}
              </label>
            ))}
          </div>

          {/* Replace car travel */}
          <div className="userform-group">
            <label className="userform-label">
              Are you open to replacing car travel with cycling or public transport?
            </label>
            {["Yes, always", "Sometimes", "Rarely", "No"].map((opt) => (
              <label key={opt} className="userform-option">
                <input
                  type="radio"
                  name="replaceCar"
                  value={opt}
                  checked={formData.replaceCar === opt}
                  onChange={handleRadioChange}
                />
                {opt}
              </label>
            ))}
          </div>

          {/* Campus selection */}
          <div className="userform-group">
            <label className="userform-label">Which Campus Are You Located In?</label>
            {["Streatham", "St Lukes"].map((campus) => (
              <label key={campus} className="userform-option">
                <input
                  type="radio"
                  name="campus"
                  value={campus}
                  checked={formData.campus === campus}
                  onChange={handleRadioChange}
                />
                {campus}
              </label>
            ))}
          </div>

          {/* Submit button */}
          <button type="submit" className="userform-submit">
            Submit Form
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
