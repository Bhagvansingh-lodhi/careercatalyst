// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const { email, password } = formData;
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "https://ppp-v4ah.onrender.com/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);

        // Optionally save a placeholder user object to display in profile
        const user = {
          name: "Demo User",
          email: formData.email,
          college: "Demo College",
          branch: "Demo Branch",
          graduationYear: 2025,
        };
        localStorage.setItem("user", JSON.stringify(user));

        setMessage("✅ Login successful! Redirecting to profile...");

        setTimeout(() => navigate("/profile"), 1200);
      } else {
        setMessage("⚠️ Login successful, but no token received");
      }
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.message ||
          "❌ Login failed. Check credentials or try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="login-container"
      style={{ maxWidth: "450px", margin: "50px auto", padding: "40px 30px", background: "white", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
    >
      <h2 className="text-2xl font-semibold mb-4">Welcome Back</h2>
      <p className="text-gray-600 mb-6">Sign in to your placement preparation account</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 text-left">
          <label className="block mb-1 font-medium">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${errors.email ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter your email"
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="mb-4 text-left">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded ${errors.password ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter your password"
            required
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded text-white font-medium ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      {message && <p className={`mt-4 p-2 rounded ${message.includes("successful") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{message}</p>}

      <p className="mt-4 text-gray-600">
        Don't have an account? <Link to="/register" className="text-blue-600 font-medium">Create Account</Link>
      </p>
    </motion.div>
  );
};

export default Login;
