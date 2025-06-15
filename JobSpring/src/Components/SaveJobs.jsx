import React, { useEffect, useState } from 'react';

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
    setSavedJobs(jobs);
  }, []);

  const handleRemove = (id) => {
    const updatedJobs = savedJobs.filter(job => job.id !== id);
    setSavedJobs(updatedJobs);
    localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
  };

  return (
    <div className="max-w-3xl mx-auto p-8 mt-10 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Saved Jobs</h2>
      {savedJobs.length === 0 ? (
        <p className="text-gray-500">No saved jobs yet.</p>
      ) : (
        <div className="grid gap-6">
          {savedJobs.map(job => (
            <div key={job.id} className="p-4 border rounded">
              <div className="flex items-center mb-3">
                <img src={job.companyLogo} alt={job.companyName} className="w-12 h-12 mr-4" />
                <div>
                  <h3 className="font-semibold text-lg">{job.jobTitle}</h3>
                  <p className="text-sm text-gray-600">{job.companyName} - {job.jobLocation}</p>
                </div>
              </div>
              <p className="text-sm mb-2">
                <strong>Salary:</strong> {job.minPrice} - {job.maxPrice} LPA
              </p>
              <div className="flex items-center justify-between">
                <a
                  href={`/job/${job.id}`}
                  className="text-blue-600 underline text-sm"
                >
                  View Details
                </a>
                <button
                  onClick={() => handleRemove(job.id)}
                  className=" flex bg-blue text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
