import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate(); // <-- add this
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://ppp-v4ah.onrender.com/api/auth/signup",
        {
          name: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );

      if (res.data) {
        alert("✅ Registered successfully! Redirecting to login...");
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        // Redirect to login page after successful registration
        navigate("/login");
      }
    } catch (err) {
      console.error("Registration error:", err.response?.data);
      alert(err.response?.data?.message || "❌ Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Framer motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="inline-flex items-center mb-6">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg mr-3"
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </motion.div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              Career Catalyst
            </span>
          </Link>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create Your Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join thousands of professionals accelerating their careers
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          className="bg-white py-8 px-6 shadow-xl rounded-xl sm:px-10 border border-gray-100"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <form
            className="mb-0 space-y-4"
            onSubmit={handleSubmit}
            noValidate
          >
            {["username", "email", "password", "confirmPassword"].map(
              (field) => {
                const isPassword = field.includes("password");
                const label =
                  field === "confirmPassword"
                    ? "Confirm Password"
                    : field.charAt(0).toUpperCase() + field.slice(1);

                return (
                  <motion.div key={field} variants={itemVariants}>
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {label}
                    </label>
                    <input
                      id={field}
                      name={field}
                      type={isPassword ? "password" : "text"}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={`Enter your ${label.toLowerCase()}`}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors duration-200 ${
                        errors[field]
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-indigo-500"
                      }`}
                    />
                    {errors[field] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[field]}
                      </p>
                    )}
                  </motion.div>
                );
              }
            )}

            <motion.button
              type="submit"
              className="w-full py-3 px-4 text-white font-medium rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
              ) : (
                "Create Account"
              )}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Sign in
            </Link>
          </p>
        </motion.div>

        {/* Footer */}
        <motion.p
          className="mt-8 text-center text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          &copy; {new Date().getFullYear()} Career Catalyst. All rights
          reserved.
        </motion.p>
      </div>
    </div>
  );
}
