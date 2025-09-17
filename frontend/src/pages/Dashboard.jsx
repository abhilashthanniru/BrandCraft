// Dashboard.jsx
import React, { useEffect, useState } from "react";
import Userdetails from "../components/Userdetails";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("https://brandcraft-4421.onrender.com/api/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setUser(data);

        const isIncomplete = !data.name || !data.role || !data.bio || !data.linkedin;
        setShowPopup(isIncomplete);
      } catch (err) {
        console.error("Error fetching user:", err);
        navigate("/"); // Redirect to home or login if token is invalid
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">
          Welcome, {user?.name || "User"}!
        </h1>
        <p className="text-gray-600">
          This is your personalized dashboard. Let’s complete your profile to unlock your features.
        </p>
      </div>

      {/* Popup form */}
      {showPopup && user && (
        <Userdetails user={user} onComplete={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default Dashboard;
