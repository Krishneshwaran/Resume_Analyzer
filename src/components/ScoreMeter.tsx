import React from 'react';
import { Award, TrendingUp } from 'lucide-react';

interface ScoreMeterProps {
  score: number;
  sections: Array<{ id: string; score: number; title: string }>;
}

const ScoreMeter: React.FC<ScoreMeterProps> = ({ score, sections }) => {
  const getScoreColor = (value: number) => {
    if (value >= 90) return 'from-green-500 to-green-600';
    if (value >= 70) return 'from-blue-400 to-blue-800';
    return 'from-red-500 to-red-600';
  };

  const lowestScore = Math.min(...sections.map(s => s.score));
  const highestScore = Math.max(...sections.map(s => s.score));

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Score */}
        <div className="flex items-center space-x-4">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-gray-200"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              <circle
                className="text-blue-600 transition-all duration-1000"
                strokeWidth="10"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 - (251.2 * score) / 100}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <Award className="h-6 w-6 text-blue-600 mx-auto mb-1" />
              <span className="text-xl font-bold text-gray-800">{score}%</span>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Overall Score</h2>
            <p className="text-gray-600">Resume Performance</p>
          </div>
        </div>

        {/* Score Range */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Score Range</span>
            <span className="text-sm font-bold text-gray-800">
              {lowestScore}% - {highestScore}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${getScoreColor(score)}`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-gray-600">Highest</span>
            </div>
            <p className="text-lg font-bold text-gray-800 mt-1">{highestScore}%</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-blue-600 mr-2 transform rotate-180" />
              <span className="text-sm font-medium text-gray-600">Lowest</span>
            </div>
            <p className="text-lg font-bold text-gray-800 mt-1">{lowestScore}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreMeter;