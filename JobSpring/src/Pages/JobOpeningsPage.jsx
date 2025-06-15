import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function JobOpeningsPage() {
    const { id } = useParams();
  
    // Job openings map based on job ID
    const jobOpeningsMap = {
        1: [
            { company: "Company A", position: "Warehouse Associate", location: "New York" },
            { company: "Company B", position: "Warehouse Associate", location: "Los Angeles" },
        ],
        2: [
            { company: "Company C", position: "Backend Developer", location: "Bangalore" },
            { company: "Company D", position: "Backend Developer", location: "Hyderabad" },
        ],
        3: [
            { company: "Company E", position: "Front Desk Agent", location: "Chicago" },
            { company: "Company F", position: "Front Desk Agent", location: "San Francisco" },
        ],
        4: [
            { company: "Company G", position: "Crew Member", location: "Miami" },
            { company: "Company H", position: "Crew Member", location: "Las Vegas" },
        ],
        5: [
            { company: "Company I", position: "Software Engineer", location: "Delhi" },
            { company: "Company J", position: "Software Engineer", location: "Mumbai" },
        ],
        // Add more job openings for other job IDs here as needed
    };

    // State for file upload
    const [resume, setResume] = useState(null);

    const handleResumeChange = (e) => {
        const file = e.target.files[0];
        setResume(file);
    };

    const handleResumeUpload = () => {
        if (!resume) {
            alert("Please select a resume to upload.");
            return;
        }
        // Handle the resume upload logic here (e.g., send to backend or store it locally)
        alert(`Resume for Job ID ${id} uploaded successfully!`);
        // Reset the file input
        setResume(null);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-4">Job Openings for Job ID {id}</h1>
            
            <ul className="list-none space-y-4">
                {jobOpeningsMap[id]?.map((opening, index) => (
                    <li key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-lg">
                        <div>
                            <h3 className="text-xl text-gray-700">{opening.position}</h3>
                            <p className="text-sm text-gray-500">{opening.company} - {opening.location}</p>
                        </div>
                    </li>
                ))}
            </ul>
            
            {/* Upload Resume Section */}
            <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-4">Upload Your Resume</h2>
                
                <input 
    type="file" 
    accept=".pdf, .doc, .docx" 
    onChange={handleResumeChange}
    className="mb-4 w-80 py-2 px-4 border-2 border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-black space-x-0.5 cursor-pointer"
/>

                <button 
                    onClick={handleResumeUpload}
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 m-2"
                >
                    Apply
                </button>
            </div>
        </div>
    );
}

export default JobOpeningsPage;
