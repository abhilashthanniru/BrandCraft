import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signin from "./pages/Signin";
import LoginRegister from "./components/LoginRegister";
import Dashboard from "./pages/Dashboard";
import LogoCreator from "./pages/LogoCreator"; 
import Footer from "./components/Footer";
import TaglineCreate from "./pages/TaglineCreate";
import BusinessPage from "./components/BusinessPage";

function App() {
  return (
    <div>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/register" element={<LoginRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logocreator" element={<LogoCreator />} />
        <Route path="/taglinecreator" element={<TaglineCreate/>} />
        <Route path="/businesscard" element={<BusinessPage/>} />
        {/* <Route path="/postgeneration" element={<PostGen} />
       */}
        
      </Routes>
       <Footer/>
    </div>
  );
}

export default App;

