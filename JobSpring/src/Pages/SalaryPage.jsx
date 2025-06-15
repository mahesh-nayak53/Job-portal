import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../Components/PageHeader';

const SalaryPage = () => {
  const [searchText, setSearchText] = useState("");
  const [salaryData, setSalaryData] = useState([]);  
  const [filteredSalary, setFilteredSalary] = useState([]);  

  useEffect(() => {
    fetch("salary.json")
      .then(res => res.json())
      .then(data => {
        setSalaryData(data);
        setFilteredSalary(data);  
      });
  }, []);

  const handleSearch = () => {
    const filter = salaryData.filter(
      (job) =>
        job.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
    setFilteredSalary(filter);  
  };

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-24 bg-gradient-to-r from-purple-300 via-pink-300 to-red-400'>
        <PageHeader title={"Estimate Salary"} path={"Salary"} />

        <div className='mt-5'>
          <div className='search-box p-2 text-center mb-2'>
            <input
              type="text"
              name='search'
              id='search'
              className='py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full'
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className='bg-blue-500 text-white font-semibold px-8 py-2 rounded-sm mb-4'
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Salary display card */}
      <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-24 my-14 items-center'>
        {filteredSalary.map((data) => (
          <div
            className='shadow px-4 py-8 hover:bg-blue-50 bg-white rounded-2xl'
            key={data.id}
          >
            <h4 className='font-semibold text-gray-600 text-2xl'>{data.title}</h4>
            <p className='my-2 font-medium text-black text-lg'>{data.salary}</p>
            <div className='flex flex-wrap gap-4'>
              {/* Link to job openings */}
              <Link
                to={`/job/${data.id}/openings`}
                className='underline text-blue-400 hover:text-blue-800'
              >
                Job Openings
              </Link>

              {/* Link to job skills */}
              <Link
                to={`/job/${data.id}/skills`}
                className='underline text-blue-400 hover:text-blue-800'
              >
                Skills
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalaryPage;
