import React from 'react';
import { useNavigate } from 'react-router-dom';

const Results = ({ analysis }) => {
    const navigate = useNavigate();

    if (!analysis) {
        // Redirect to the homepage if no analysis data is available
        navigate('/');
        return null;
    }
    const {
        overall_match_percentage,
        skills_analysis,
        experience_analysis,
        education_analysis,
        keyword_analysis,
        detailed_feedback,
      } = analysis;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Analysis Results</h1>
            {/* Display Analysis Results */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4">
                    Match Score:{' '}
                    {analysis.overall_match_percentage >= 80
                        ? '🟢'
                        : analysis.overall_match_percentage >= 60
                        ? '🟡'
                        : '🔴'}{' '}
                    {analysis.overall_match_percentage}%
                </h2>
                <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-gray-600">Skills Match</p>
            <p className="text-2xl font-bold">{skills_analysis.hard_skills.score}%</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Experience Match</p>
            <p className="text-2xl font-bold">{experience_analysis.relevance_score}%</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Education Match</p>
            <p className="text-2xl font-bold">{education_analysis.relevance_score}%</p>
          </div>
        </div>
      </div>

      {/* Keyword Analysis */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">📝 Keyword Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold mb-2">Matched Keywords:</h4>
            <p>{keyword_analysis.matched_keywords.length > 0 ? keyword_analysis.matched_keywords.join(', ') : 'None'}</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Missing Keywords:</h4>
            <p>{keyword_analysis.missing_keywords.length > 0 ? keyword_analysis.missing_keywords.join(', ') : 'None'}</p>
          </div>
        </div>
      </div>

      {/* Skills Breakdown */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">🔧 Skills Breakdown</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold mb-2">Hard Skills</h4>
            {skills_analysis.hard_skills.matched.map((skill, index) => (
              <p key={index}>✅ {skill}</p>
            ))}
          </div>
          <div>
            <h4 className="font-bold mb-2">Soft Skills</h4>
            {skills_analysis.soft_skills.matched.map((skill, index) => (
              <p key={index}>✅ {skill}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Analysis */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">💼 Experience Analysis</h3>
        <p className="mb-2">
          <strong>Years of Experience:</strong> {experience_analysis.years_of_experience}
        </p>
        <h4 className="font-bold mb-2">Relevant Positions:</h4>
        <ul className="list-disc list-inside">
          {experience_analysis.relevant_positions.map((position, index) => (
            <li key={index}>{position}</li>
          ))}
        </ul>
      </div>

      {/* Detailed Feedback */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">📋 Detailed Feedback</h3>
        <p>{detailed_feedback}</p>
      </div>

      <a
        href="/analyze"
        className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Analyze Another Resume
      </a>
    </div>
  );
};

export default Results;
