import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function JobSkillsPage() {
    const { id } = useParams();
  
    // The updated jobSkillsMap with specific skills for each job
    const jobSkillsMap = {
        1: ["Forklift Operation", "Inventory Management", "Order Processing"],
        2: ["Node.js", "Express.js", "MongoDB", "API Development", "RESTful Services"],
        3: ["Customer Service", "Phone Handling", "Booking Management", "Problem-Solving"],
        4: ["Teamwork", "Food Preparation", "Customer Service", "Point of Sale (POS)"],
        5: ["Java", "C++", "Software Development", "Agile Methodologies", "Version Control (Git)"],
        6: ["React Native", "Flutter", "Java", "Swift", "API Integration"],
        7: ["Adobe XD", "Figma", "Wireframing", "User Research", "UI Design Principles"],
        8: ["HTML", "CSS", "JavaScript", "React.js", "Responsive Design"],
        9: ["React.js", "Node.js", "MongoDB", "Express.js", "REST APIs"]
    };

    const [resume, setResume] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setResume(file);
        }
    };

    const handleApply = () => {
        if (resume) {
            // Here you would handle the file upload logic.
            alert("Your resume has been uploaded successfully!");
        } else {
            alert("Please upload your resume before applying.");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-semibold mb-4">Required Skills for Job ID {id}</h1>
            
            <ul className="list-none space-y-4">
                {jobSkillsMap[id]?.map((skill, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-lg">
                        <span className="text-xl text-gray-700">{skill}</span>
                    </li>
                ))}
            </ul>

            {/* Upload Resume Section */}
            <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-4">Upload Your Resume</h2>
                
                <input 
                    type="file" 
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="mb-4 w-80 py-2 px-4 border-2 border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-black space-x-0.5 cursor-pointer"
                />
                
                <button 
                    onClick={handleApply}
                     className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 m-2"
                >
                    Apply
                </button>
            </div>
        </div>
    );
}

export default JobSkillsPage;
