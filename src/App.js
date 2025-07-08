import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./HeroSection";
import Welcome from "./Welcome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;
