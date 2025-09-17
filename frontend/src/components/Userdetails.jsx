import React, { useState } from "react";
import { motion } from "framer-motion";

const Userdetails = ({ user, onComplete }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: user?.email || "",
    role: "",
    bio: "",
    linkedin: "",
    skills: "",
    profilePicture: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/user/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    onComplete(); // Will trigger user refetch + close popup
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Complete Your Profile</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          disabled
          className="w-full mb-3 p-2 border bg-gray-100 text-gray-600 rounded"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        >
          <option value="">Select Role</option>
          <option value="Student">Student</option>
          <option value="Startup Founder">Startup Founder</option>
          <option value="Investor">Investor</option>
        </select>

        <textarea
          name="bio"
          placeholder="Short Bio/About"
          value={formData.bio}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn / Portfolio URL"
          value={formData.linkedin}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma-separated)"
          value={formData.skills}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="text"
          name="profilePicture"
          placeholder="Profile Picture URL"
          value={formData.profilePicture}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          Save & Continue
        </button>
      </motion.form>
    </div>
  );
};

export default Userdetails;
