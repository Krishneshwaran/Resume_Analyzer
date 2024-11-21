import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, FileText, Send } from "lucide-react";
import axios from "axios";

const ResumeAnalyzer = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // For error handling
  const navigate = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === "application/pdf") {
      setFile(droppedFile);
    }
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const analyzeResume = async () => {
    if (!file || !jobDescription) return;

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("resume_file", file);
    formData.append("job_description", jobDescription);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/analyze-resume/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // Redirect to results page with analysis data
      navigate("/resume-analysis", { state: { analysisResult: response.data.data } });
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred while analyzing the resume.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="glass-container rounded-xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex items-center justify-center mb-8">
                <FileText className="h-12 w-12 text-white" />
                <h1 className="text-3xl font-bold text-white ml-4">Resume Analyzer</h1>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Job Description
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg glass-input text-gray-800 min-h-[150px]"
                    placeholder="Paste the job description here..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Upload Resume
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`glass-card rounded-lg p-8 text-center ${isDragging ? "bg-white/50 border-white/40" : "hover:border-white/40"}`}
                  >
                    <Upload className="h-12 w-12 mx-auto text-white/70" />
                    <p className="mt-2 text-sm text-white">
                      Drag and drop your resume here, or{" "}
                      <label className="text-white hover:text-white/80 cursor-pointer underline">
                        browse
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf"
                          onChange={handleFileInput}
                        />
                      </label>
                    </p>
                    {file && (
                      <p className="mt-2 text-sm text-white">
                        Selected: {file.name}
                      </p>
                    )}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={analyzeResume}
                  disabled={isLoading || !file || !jobDescription}
                  className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 ${isLoading || !file || !jobDescription ? "bg-white/20 cursor-not-allowed text-white/50" : "btn-primary"}`}
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Analyze Resume</span>
                    </>
                  )}
                </motion.button>
                {error && (
                  <p className="mt-4 text-sm text-red-500">
                    Error: {error}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResumeAnalyzer;
