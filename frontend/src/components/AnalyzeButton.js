import React from "react";

const AnalyzeButton = ({ onAnalyze }) => {
  return (
    <button
      onClick={onAnalyze}
      className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
    >
      Analyze My Resume
    </button>
  );
};

export default AnalyzeButton;
