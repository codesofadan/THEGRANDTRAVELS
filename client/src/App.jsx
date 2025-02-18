import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./assets/components/Header/Header";
import "./App.css"; // Optional, for any global styles
import Footer from "./assets/components/Footer/Footer";
import Destinations from "./assets/pages/Destinations/Destinations";
import FAQ from "./assets/pages/FAQ/FAQ";
import Testimony from "./assets/pages/Testimony/Testimony";
import Home from "./assets/pages/Home/Home";
import Contact from "./assets/pages/Contact/Contact";
import Blog from "./assets/pages/Blog/Blog";
import Agent from "./assets/pages/Agent/Agent";
import Admin from "./assets/pages/Admin/Admin";
import Flights from "./assets/pages/Flights/Flights";
import NewPackages from "./assets/pages/NewPackages/NewPackages";
import Hotels from "./assets/pages/Hotels/Hotels";
import SignUp from "./assets/pages/SignUpPage/SignUpPage";
import LoginPage from "./assets/pages/LoginPage/LoginPage";
import Profile from "./assets/components/Profile/Profile";
import MyBookings from "./assets/pages/MyBookings/MyBookings";

const App = () => {
  return (
    <Router>
            {/* Add persistent components like Header */}
            <Header />

            {/* Define routes for each page */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/packages" element={<NewPackages />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/testimonials" element={<Testimony />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/agent" element={<Agent />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/flights" element={<Flights />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/bookings" element={<MyBookings />} />
            
            </Routes>

            {/* Add Footer */}
            <Footer />
        </Router>
  );
};

export default App;