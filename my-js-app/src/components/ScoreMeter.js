import React, { useState } from 'react';
import { Award, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ScoreMeter = ({ score, sections }) => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Redirect to home
    navigate('/');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 relative">
      {/* Score Meter Content */}
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
      </div>

      {/* Profile Button on the Right */}
      <div className="absolute top-6 right-6">
        <button
          className="flex items-center px-4 py-2 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 focus:outline-none"
          onClick={() => setShowLogout(!showLogout)}
        >
          <User className="h-5 w-5 mr-2" />
          <span>Profile</span>
        </button>

        {/* Logout Button with Transition */}
        <div
          className={`transition-all duration-300 ease-in-out transform ${
            showLogout
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <button
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreMeter;