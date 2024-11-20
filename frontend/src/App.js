import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResumeAnalyzer from "./components/ResumeAnalyzer";
import Results from "./components/Results";

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);

  return (
    <Router>
      <div className="flex justify-center items-center min-h-screen bg-blue-50">
        <Routes>
          <Route
            path="/"
            element={<ResumeAnalyzer setAnalysisResult={setAnalysisResult} />}
          />
          <Route path="/results" element={<Results analysis={analysisResult} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
