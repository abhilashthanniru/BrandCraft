import React, { useState } from "react";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://brandcraft-4421.onrender.com/api/users/login",
        form
      );
      localStorage.setItem("token", res.data.token);

      alert("Login successful!");

      // ✅ Redirect to dashboard after login
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

      <div className="flex items-center border border-gray-300 rounded px-3 py-2 mb-4">
        <FaEnvelope className="text-gray-500 mr-2" />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full focus:outline-none"
        />
      </div>

      <div className="flex items-center border border-gray-300 rounded px-3 py-2 mb-4 relative">
        <FaLock className="text-gray-500 mr-2" />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full focus:outline-none pr-8"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
      >
        Login
      </button>

      <p className="mt-4 text-sm text-center text-gray-600">
        Don't have an account?{" "}
        <button
          onClick={() => navigate("/register")}
          className="text-blue-500 hover:underline"
          type="button"
        >
          Register
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
