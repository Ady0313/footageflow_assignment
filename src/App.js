// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar"; // Ensure the component name is imported correctly
import TranscriptionPage from "./pages/TranscriptionPage";
import StoryGeneratorPage from "./pages/StoryGenerator"; // Corrected import path
import Search from "./components/Search";
import "./styles/App.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <div className="content-wrapper">
          <NavBar /> {/* Navbar remains at the top */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<TranscriptionPage />} />
              <Route path="/storygenerator" element={<StoryGeneratorPage />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
