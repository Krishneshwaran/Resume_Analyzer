import React from 'react';
import { useNavigate } from 'react-router-dom';

const Results = ({ analysis }) => {
  const navigate = useNavigate();

  if (!analysis) {
    navigate('/');
    return null;
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const ScoreCard = ({ title, score, reason }) => (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
          {score}%
        </span>
      </div>
      <p className="text-gray-600">{reason}</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Resume Analysis Results</h1>
      
      {/* Overall Summary */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Overall Score</h2>
          <span className={`text-3xl font-bold ${getScoreColor(analysis.overall_summary.total_score)}`}>
            {analysis.overall_summary.total_score}%
          </span>
        </div>
        <p className="text-gray-600">{analysis.overall_summary.summary}</p>
      </div>

      {/* ATS Parse Rate */}
      <ScoreCard
        title="ATS Compatibility"
        score={analysis.ats_parse_rate.score}
        reason={analysis.ats_parse_rate.reason}
      />

      {/* Contact Information */}
      <ScoreCard
        title="Contact Information"
        score={analysis.contact_information.score}
        reason={analysis.contact_information.reason}
      />

      {/* Skills Analysis */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">Skills Analysis</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Hard Skills */}
          <div>
            <h4 className="font-bold mb-2">Hard Skills</h4>
            <div className={`text-xl font-bold mb-2 ${getScoreColor(analysis.skills_analysis.hard_skills.score)}`}>
              Score: {analysis.skills_analysis.hard_skills.score}%
            </div>
            
            <div className="mb-4">
              <h5 className="font-semibold text-green-600 mb-2">Matched Skills:</h5>
              <ul className="list-disc list-inside">
                {analysis.skills_analysis.hard_skills.matched.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-red-600 mb-2">Missing/Not Suited Skills:</h5>
              <ul className="list-disc list-inside">
                {analysis.skills_analysis.hard_skills.not_suited.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <h4 className="font-bold mb-2">Soft Skills</h4>
            <div className={`text-xl font-bold mb-2 ${getScoreColor(analysis.skills_analysis.soft_skills.score)}`}>
              Score: {analysis.skills_analysis.soft_skills.score}%
            </div>
            
            <div className="mb-4">
              <h5 className="font-semibold text-green-600 mb-2">Matched Skills:</h5>
              <ul className="list-disc list-inside">
                {analysis.skills_analysis.soft_skills.matched.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold text-red-600 mb-2">Missing/Not Suited Skills:</h5>
              <ul className="list-disc list-inside">
                {analysis.skills_analysis.soft_skills.not_suited.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-gray-600">{analysis.skills_analysis.reason}</p>
        </div>
      </div>

      {/* Description Quality */}
      <ScoreCard
        title="Description Quality"
        score={analysis.description_quality.score}
        reason={analysis.description_quality.reason}
      />

      {/* Experience Analysis */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Experience Analysis</h3>
          <span className={`text-2xl font-bold ${getScoreColor(analysis.experience_analysis.score)}`}>
            {analysis.experience_analysis.score}%
          </span>
        </div>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Years of Experience:</span> {analysis.experience_analysis.years_of_experience}
        </p>
        <p className="text-gray-600">{analysis.experience_analysis.reason}</p>
      </div>

      {/* Education Analysis */}
      <ScoreCard
        title="Education Analysis"
        score={analysis.education_analysis.score}
        reason={analysis.education_analysis.reason}
      />

      {/* Projects Analysis */}
      <ScoreCard
        title="Projects Analysis"
        score={analysis.projects_analysis.score}
        reason={analysis.projects_analysis.reason}
      />

      {/* Action Buttons */}
      <div className="flex gap-4">
        <a
          href="/analyze"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition-colors"
        >
          Analyze Another Resume
        </a>
        <button
          onClick={() => window.print()}
          className="inline-block bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded transition-colors"
        >
          Export Results
        </button>
      </div>
    </div>
  );
};

export default Results;