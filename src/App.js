import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Constructions from "./routes/Constructions";
import Services from "./routes/Services";
import Projects from "./routes/Projects";
import Testimonials from "./routes/Testimonials";
import Blogs from "./routes/Blogs";
import Footer from "./components/Footer";
import Contact from "./routes/Contact";
import AboutUs from "./routes/AboutUs";
import ErrorPage from "./components/Error404";
import AdminLogin from "./routes/AdminLogin";
import Dashboard from "./Admin/Dashboard";
import AdminServices from "./Admin/AdminServices";
import AdminProjects from "./Admin/AdminProjects";
import AdminBlogs from "./Admin/AdminBlogs";
import AdminConstructions from "./Admin/AdminConstructions";
import AdminTestimonials from "./Admin/AdminTestimonials";
import AdminHero from "./Admin/AdminHero";
import AdminAboutUs from "./Admin/AdminAboutUs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    localStorage.getItem("isAdminLoggedIn") === "true"
  );

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/check-auth", {
        withCredentials: true,
      })
      .then((response) => {
        setIsAdminLoggedIn(response.data.isAdminLoggedIn);
        localStorage.setItem("isAdminLoggedIn", response.data.isAdminLoggedIn);
      })
      .catch((error) => {
        console.error("Error checking auth:", error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Navbar isAdminLoggedIn={isAdminLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/constructions" element={<Constructions />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="*" element={<ErrorPage />} />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            !isAdminLoggedIn ? (
              <AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />
            ) : (
              <Navigate to="/admin/dashboard" />
            )
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            isAdminLoggedIn ? (
              <Dashboard
                isAdminLoggedIn={isAdminLoggedIn}
                setIsAdminLoggedIn={setIsAdminLoggedIn}
              />
            ) : (
              <Navigate to="/admin" />
            )
          }
        >
          <Route path="services" element={<AdminServices />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="constructions" element={<AdminConstructions />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="hero" element={<AdminHero />} />
          <Route path="aboutus" element={<AdminAboutUs />} />
        </Route>
      </Routes>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
