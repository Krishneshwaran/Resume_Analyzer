import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import ResumeAnalysis from './pages/ResumeAnalysis';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyze" element={<ResumeAnalyzer />} />
        <Route path="/resume-analysis" element={<ResumeAnalysis />} />
      </Routes>
    </Router>
  );
}

export default App;
