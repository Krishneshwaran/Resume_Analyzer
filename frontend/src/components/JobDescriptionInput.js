import React from "react";

const JobDescriptionInput = ({ jobDescription, onJobDescriptionChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">
        Add Job Description:
      </label>
      <textarea
        value={jobDescription}
        onChange={onJobDescriptionChange}
        placeholder="Enter the job description here..."
        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
        rows="4"
      />
    </div>
  );
};

export default JobDescriptionInput;
