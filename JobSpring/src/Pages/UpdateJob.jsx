import React from 'react'
import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";


const UpdateJob = () => {
  const { id } = useParams();
  // const job = useLoaderData(); 

  // Extracting job data from the response
  const {
    _id, jobTitle, companyName, minPrice, maxPrice, salaryType,
    jobLocation, postingDate, experienceLevel,
    companyLogo, employmentType, description, postedBy, skills,
    benefits, outline, futureGrowth
  } = useLoaderData();

   const [selectedOption, setSelectedOption] = useState(null);
   const {
     register,
     handleSubmit,
     reset,
     formState: { errors },
   } = useForm();
 
   const onSubmit = (data) => {
     data.skills = selectedOption;
     // console.log(data);
 
     fetch(`http://localhost:3000/update-job/${id}`,{
       method: "PATCH",
       headers:{
         'content-type': 'application/json'
       },
       body: JSON.stringify(data)
     })
       .then((res) => res.json())
       .then((result) => {
         if(result.acknowledged === true){
           alert("job updated sucessfully!");
         }
         reset()
       });
   };
 
   const options = [
     { value: "HTML", label: "HTML" },
     { value: "Redux", label: "Redux" },
     { value: "JavaScript", label: "JavaScript" },
     { value: "C++", label: "C++" },
     { value: "React", label: "React" },
     { value: "CSS", label: "CSS" },
     { value: "Node", label: "Node" },
     { value: "MongoDB", label: "MongoDB" },
   ];

  return (
 <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="bg-[#ffffff] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Job Title and Company Name */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                type="text"
                defaultValue={jobTitle}
                {...register("jobTitle", { required: "Job title is required" })}
                className="create-job-input"
              />
              {errors.jobTitle && (
                <p className="text-red-500">{errors.jobTitle.message}</p>
              )}
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name</label>
              <input
                type="text"
                defaultValue={companyName}
                placeholder="Ex: Microsoft"
                {...register("companyName", {
                  required: "Company name is required",
                })}
                className="create-job-input"
              />
              {errors.companyName && (
                <p className="text-red-500">{errors.companyName.message}</p>
              )}
            </div>
          </div>

          {/* Salary Inputs */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input
                type="number"
                placeholder="₹ 20k"
                defaultValue={minPrice}
                {...register("minPrice", {
                  required: "Minimum salary is required",
                })}
                className="create-job-input"
              />
              {errors.minPrice && (
                <p className="text-red-500">{errors.minPrice.message}</p>
              )}
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input
                type="number"
                placeholder="₹ 120k"
                defaultValue={maxPrice}
                {...register("maxPrice", {
                  required: "Maximum salary is required",
                })}
                className="create-job-input"
              />
              {errors.maxPrice && (
                <p className="text-red-500">{errors.maxPrice.message}</p>
              )}
            </div>
          </div>

          {/* Salary Type and Job Location */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select {...register("salaryType")} className="create-job-input">
                <option value={salaryType}>{salaryType}</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location</label>
              <input
                type="text"
                placeholder="Ex: London"
                defaultValue={jobLocation}
                {...register("jobLocation", {
                  required: "Job location is required",
                })}
                className="create-job-input"
              />
              {errors.jobLocation && (
                <p className="text-red-500">{errors.jobLocation.message}</p>
              )}
            </div>
          </div>

          {/* Job Posting Date and Experience Level */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Posting Date</label>
              <input
                type="date"
                defaultValue={postingDate}
                {...register("postingDate", {
                  required: "Posting date is required",
                })}
                className="create-job-input"
              />
              {errors.postingDate && (
                <p className="text-red-500">{errors.postingDate.message}</p>
              )}
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select
                {...register("experienceLevel")}
                className="create-job-input"
              >
                <option value={experienceLevel}>{experienceLevel}</option>
                <option value="NoExperience">No Experience</option>
                <option value="Internship">Internship</option>
                <option value="WorkRemotely">Work Remotely</option>
              </select>
            </div>
          </div>

          {/* Required Skills */}
          <div>
            <label className="block mb-2 text-lg">Required Skills</label>
            <CreatableSelect
              defaultValue={skills}
              onChange={setSelectedOption}
              options={options}
              isMulti
              className="create-job-input py-4"
            />
          </div>

          {/* Company Logo and Employment Type */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Logo</label>
              <input
                type="url"
                placeholder="Company logo URL"
                defaultValue={companyLogo}
                {...register("companyLogo")}
                className="create-job-input"
              />
              {errors.companyLogo && (
                <p className="text-red-500">{errors.companyLogo.message}</p>
              )}
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select
                {...register("employmentType")}
                className="create-job-input"
              >
                <option value={employmentType}>{employmentType}</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <label className="block mb-2 text-lg">Job Description</label>
            <textarea
              rows={6}
              defaultValue={description}
              placeholder="Write Job Description here......"
              {...register("description", {})}
              className="w-full text-gray-600 pl-3 py-1.5 focus:outline-none placeholder:text-gray-700 create-job-input"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Benefits and Company Outline */}
          <div>
            <label className="block mb-2 text-lg">Benefits</label>
            <textarea
              rows={4}
              defaultValue={benefits}
              placeholder="List benefits (e.g., $55k–65k, certifications, etc.)"
              {...register("benefits")}
              className="w-full text-gray-600 pl-3 py-1.5 focus:outline-none placeholder:text-gray-700 create-job-input"
            />
          </div>
          <div>
            <label className="block mb-2 text-lg">Company Outline</label>
            <textarea
              rows={4}
              defaultValue={outline}
              placeholder="Describe the company (e.g., Capgemini is a global consulting...)"
              {...register("outline")}
              className="w-full text-gray-600 pl-3 py-1.5 focus:outline-none placeholder:text-gray-700 create-job-input"
            />
          </div>

          {/* Job Poster Email */}
          <div>
            <label className="block mb-2 text-lg">Job Posted By</label>
            <input
              type="email"
              defaultValue={postedBy}
              placeholder="Your email"
              {...register("postedBy", { required: "Email is required" })}
              className="create-job-input"
            />
            {errors.postedBy && (
              <p className="text-red-500">{errors.postedBy.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <input
            type="submit"
            className="block mt-12 bg-blue-500 text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
            value="Update Job"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
