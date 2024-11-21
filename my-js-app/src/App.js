import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import ResumeAnalysis from './pages/ResumeAnalysis';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyze" element={<ResumeAnalyzer />} />
        <Route path="/resume-analysis" element={<ResumeAnalysis />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;