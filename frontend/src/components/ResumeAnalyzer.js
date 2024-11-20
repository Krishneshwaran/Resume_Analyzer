import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResumeAnalyzer = ({ setAnalysisResult }) => {
    const [resumeFile, setResumeFile] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // For navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('resume_file', resumeFile);
        formData.append('job_description', jobDescription);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/analyze-resume/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setAnalysisResult(response.data.data); // Save analysis result in App state
            navigate('/results'); // Redirect to results page
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Resume Analyzer</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Resume File:</label>
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setResumeFile(e.target.files[0])}
                        required
                    />
                </div>
                <div>
                    <label>Job Description:</label>
                    <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Analyzing...' : 'Submit'}
                </button>
            </form>

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    );
};

export default ResumeAnalyzer;
