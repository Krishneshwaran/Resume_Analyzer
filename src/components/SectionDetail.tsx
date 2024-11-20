import React from 'react';
import { Star, XCircle, CheckCircle, AlertCircle } from 'lucide-react';

interface SectionDetailProps {
  section: {
    title: string;
    score: number;
    details: {
      strengths: string[];
      improvements: string[];
      feedback: {
        overview: string;
        recommendations: string[];
        impact: string;
      };
    };
  };
}

const SectionDetail: React.FC<SectionDetailProps> = ({ section }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-8">
      {/* Main Feedback Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
            <p className="text-gray-600 mt-1">{section.details.feedback.overview}</p>
          </div>
          <div className="flex flex-col items-end">
            <div className={`text-3xl font-bold ${getScoreColor(section.score)}`}>
              {section.score}%
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Key Recommendations</h3>
            <ul className="space-y-3">
              {section.details.feedback.recommendations.map((rec, idx) => (
                <li
                  key={idx}
                  className="flex items-start bg-blue-50 p-4 rounded-lg"
                >
                  <CheckCircle className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Impact on Application</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">{section.details.feedback.impact}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Strengths and Improvements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-medium text-gray-700 flex items-center mb-4">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            Strengths
          </h3>
          <ul className="space-y-3">
            {section.details.strengths.map((strength, idx) => (
              <li key={idx} className="flex items-center bg-green-50 p-3 rounded-lg">
                <Star className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-medium text-gray-700 flex items-center mb-4">
            <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
            Areas for Improvement
          </h3>
          <ul className="space-y-3">
            {section.details.improvements.map((improvement, idx) => (
              <li key={idx} className="flex items-center bg-red-50 p-3 rounded-lg">
                <XCircle className="h-4 w-4 text-red-500 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionDetail;