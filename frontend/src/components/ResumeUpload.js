import React, { useState } from "react";
import JobDescriptionInput from "./JobDescriptionInput";
import ResumeUpload from "./ResumeUpload";
import AnalyzeButton from "./AnalyzeButton";

const ResumeAnalyzer = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0]; // Get the uploaded file
    setResumeFile(file); // Update state
    console.log("Resume uploaded:", file);
  };

  const analyzeResume = async () => {
    if (!jobDescription || !resumeFile) {
      alert("Please upload a resume and enter a job description.");
      return;
    }

    const formData = new FormData();
    formData.append("job_description", jobDescription);
    formData.append("resume", resumeFile);

    try {
      const response = await fetch("http://localhost:8000/api/analyze/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Analysis Results:", data);
        // Handle displaying results
      } else {
        console.error("Error:", data.error);
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Resume Analyzer
      </h1>
      <JobDescriptionInput
        jobDescription={jobDescription}
        onJobDescriptionChange={handleJobDescriptionChange}
      />
      <ResumeUpload onResumeUpload={handleResumeUpload} />
      <AnalyzeButton onAnalyze={analyzeResume} />
    </div>
  );
};

export default ResumeAnalyzer;
