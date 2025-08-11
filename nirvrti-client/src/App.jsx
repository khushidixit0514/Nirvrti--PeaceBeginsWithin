import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; 

import Home from "./pages/Home";
import Writing from "./pages/Writing";
import Detox from "./pages/Detox";
import Reset from "./pages/Reset";
import Capsule from "./pages/Capsule";
import Issues from "./pages/Issues";
import Pledge from "./pages/Pledge";
import Stories from "./pages/Stories";
import AboutUs from "./pages/AboutUs";
import Connect from "./pages/Connect";

import Header from "./partials/Header";
import Footer from "./partials/Footer";
import GetSupport from "./pages/GetSupport";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto"
    });
  }, [location.pathname]);

  return null;
};

const AppContent = () => {
  const location = useLocation();
  const noHeaderFooterPaths = ["/login", "/signup"];
  const hideHeaderFooter = noHeaderFooterPaths.includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      
      {!hideHeaderFooter && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/write" element={<Writing />} />
        <Route path="/detox" element={<Detox />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/capsule" element={<Capsule />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/pledge" element={<Pledge />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/support" element={<GetSupport />} />
      </Routes>

      {!hideHeaderFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
