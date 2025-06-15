import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// Optional: default styles

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [applied, setApplied] = useState(false);

  const [isSaved, setIsSaved] = useState(false);

// Check if this job is already saved
useEffect(() => {
  const saved = JSON.parse(localStorage.getItem('savedJobs')) || [];
  const found = saved.find(j => j.id === parseInt(id));
  if (found) setIsSaved(true);
}, [id]);

const handleSaveJob = () => {
  const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
  const isAlreadySaved = savedJobs.find(j => j.id === job.id);

  if (!isAlreadySaved) {
    savedJobs.push(job);
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    setIsSaved(true);
    Swal.fire('Saved!', 'Job added to Saved Jobs', 'success');
  } else {
    Swal.fire('Info', 'This job is already saved', 'info');
  }
};


  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch('/jobs.json');
        const data = await res.json();
        const foundJob = data.find(job => job.id === parseInt(id));
        setJob(foundJob);
      } catch (err) {
        console.error("Error fetching job data:", err);
      }
    };

    fetchJob();
  }, [id]);

  if (!job) {
    return <div className="text-center text-red-500 py-10">Job not found</div>;
  }

  const getShortDescription = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleApply = async () => {
    const result = await Swal.fire({
      title: 'Upload Resume',
      html: '<input type="file" id="resume" class="swal2-input" accept=".pdf,.doc,.docx">',
      showCancelButton: true,
      confirmButtonText: 'Apply',
      preConfirm: () => {
        const file = document.getElementById('resume').files[0];
        if (!file) {
          Swal.showValidationMessage('Please upload your resume first');
          return false;
        }
        return file;
      }
    });

    if (result.isConfirmed && result.value) {
      setApplied(true);
      Swal.fire({
        icon: 'success',
        title: 'Application Submitted!',
        text: 'Your resume has been uploaded successfully.'
      });

      // OPTIONAL: Handle file upload here
      console.log('Uploaded Resume:', result.value);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-md mt-10 rounded-lg">
      <div className="flex items-center mb-6">
        <img src={job.companyLogo} alt={job.companyName} className="w-20 h-20 object-contain mr-4" />
        <div>
          <h2 className="text-2xl font-bold">{job.jobTitle}</h2>
          <p className="text-gray-600">{job.companyName} - {job.jobLocation}</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <span className="bg-[#9eacd7] text-blue-600 px-4 py-1 rounded font-medium">
          {job.employmentType}
        </span>
        <button
          onClick={handleApply}
          disabled={applied}
          className={`px-5 py-2 rounded-md font-semibold 
            ${applied ? 'bg-green-500 cursor-not-allowed text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}
        >
          {applied ? 'Applied' : 'Apply Now'}
        </button>

        <button
  onClick={handleSaveJob}
  disabled={isSaved}
  className={`px-3 py-2 rounded font-semibold 
    ${isSaved ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
>
  {isSaved ? 'Saved' : 'Save Job'}
</button>
      </div>
      

      <div className="space-y-2 mb-8">
        <p><strong>Salary:</strong> {job.minPrice} - {job.maxPrice} LPA ({job.salaryType})</p>
        <p><strong>Experience:</strong> {job.experienceLevel}</p>
        <p><strong>Posted On:</strong> {job.postingDate}</p>
        <p>
          <strong>Description:</strong>{' '}
          {showFullDesc ? job.description : getShortDescription(job.description)}
          {job.description.length > 150 && (
            <button
              onClick={() => setShowFullDesc(!showFullDesc)}
              className="text-blue-600 ml-2 underline"
            >
              {showFullDesc ? 'Show Less' : 'Read More'}
            </button>
          )}
        </p>
      </div>

      {job.benefits && job.benefits.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Benefits</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            {job.benefits.map((benefit, idx) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-1">Outline</h3>
          <p className="text-gray-700">{job.outline}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Future Growth</h3>
          <p className="text-gray-700">{job.futureGrowth}</p>
        </div>
      </div>
      
    </div>
  );
};

export default JobDetails;
