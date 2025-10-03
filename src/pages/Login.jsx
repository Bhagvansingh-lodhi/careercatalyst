// src/pages/Login.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
    loading: { scale: 0.98, opacity: 0.8 },
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validation
  const validateForm = () => {
    const { email, password } = formData;
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit (using fetch)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await fetch("https://ppp-v4ah.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      console.log("Backend response:", data);

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        setMessage("✅ Login successful! Redirecting to profile...");
        setTimeout(() => navigate("/profile"), 1500);
      } else {
        setMessage(data.message || "❌ Invalid credentials");
      }
    } catch (err) {
      setMessage("🚫 Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="login-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{
        maxWidth: "450px",
        margin: "50px auto",
        padding: "40px 30px",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      <motion.h2
        variants={itemVariants}
        style={{
          marginBottom: "30px",
          color: "#333",
          fontSize: "2rem",
          fontWeight: "600",
        }}
      >
        Welcome Back
      </motion.h2>

      <motion.p
        variants={itemVariants}
        style={{
          marginBottom: "30px",
          color: "#666",
          fontSize: "16px",
        }}
      >
        Sign in to your placement preparation account
      </motion.p>

      <form onSubmit={handleSubmit}>
        {/* Email */}
        <motion.div
          variants={itemVariants}
          style={{ marginBottom: "20px", textAlign: "left" }}
        >
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "500",
              color: "#555",
            }}
          >
            Email Address
          </label>
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: "#007bff" }}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px 15px",
              border: `2px solid ${errors.email ? "#ff4757" : "#e1e5e9"}`,
              borderRadius: "8px",
              fontSize: "16px",
              transition: "all 0.3s ease",
              outline: "none",
            }}
          />
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                color: "#ff4757",
                fontSize: "14px",
                marginTop: "5px",
                textAlign: "left",
              }}
            >
              {errors.email}
            </motion.p>
          )}
        </motion.div>

        {/* Password */}
        <motion.div
          variants={itemVariants}
          style={{ marginBottom: "25px", textAlign: "left" }}
        >
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "500",
              color: "#555",
            }}
          >
            Password
          </label>
          <motion.input
            whileFocus={{ scale: 1.02, borderColor: "#007bff" }}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px 15px",
              border: `2px solid ${errors.password ? "#ff4757" : "#e1e5e9"}`,
              borderRadius: "8px",
              fontSize: "16px",
              transition: "all 0.3s ease",
              outline: "none",
            }}
          />
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                color: "#ff4757",
                fontSize: "14px",
                marginTop: "5px",
                textAlign: "left",
              }}
            >
              {errors.password}
            </motion.p>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          variants={buttonVariants}
          initial="initial"
          whileHover={loading ? "loading" : "hover"}
          whileTap="tap"
          animate={loading ? "loading" : "initial"}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: loading ? "#6c757d" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            marginBottom: "20px",
          }}
        >
          {loading ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid transparent",
                  borderTop: "2px solid white",
                  borderRadius: "50%",
                }}
              />
              Signing In...
            </motion.span>
          ) : (
            "Sign In"
          )}
        </motion.button>
      </form>

      {/* Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            padding: "15px",
            marginTop: "20px",
            borderRadius: "8px",
            backgroundColor: message.includes("successful")
              ? "#d4edda"
              : "#f8d7da",
            color: message.includes("successful") ? "#155724" : "#721c24",
            border: `1px solid ${
              message.includes("successful") ? "#c3e6cb" : "#f5c6cb"
            }`,
          }}
        >
          {message}
        </motion.div>
      )}

      {/* Register Link */}
      <motion.p
        variants={itemVariants}
        style={{ marginTop: "25px", color: "#666" }}
      >
        Don't have an account?{" "}
        <Link
          to="/register"
          style={{
            color: "#007bff",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Create Account
        </Link>
      </motion.p>

      {/* Demo Info */}
      <motion.div
        variants={itemVariants}
        style={{
          marginTop: "30px",
          padding: "15px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          border: "1px solid #e9ecef",
        }}
      >
        <p style={{ margin: 0, color: "#6c757d", fontSize: "14px" }}>
          <strong>Demo Credentials:</strong>
          <br />
          Use your registered email and password to test the login
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Login;
