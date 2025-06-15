import React from 'react'
import { Link } from 'react-router-dom'
import {FiCalendar, FiClock, FiMapPin} from 'react-icons/fi'
import { FaRupeeSign } from 'react-icons/fa';

const Card = ({ data }) => {
  const { id, companyName, companyLogo, jobTitle, minPrice, maxPrice, salaryType, jobLocation, postingDate, employmentType } = data;
  return (
    <section className="card">
      <Link to={`/job/${id}`} className="flex gap-4 flex-col sm:flex-row items-start">
        <img src={companyLogo} alt="" className="w-30 h-20 object-contain rounded-md" />
        <div>
          <h4 className="text-gray-600 mb-1">{companyName}</h4>
          <h3 className="text-lg font-semibold mb-2">{jobTitle}</h3>
          <div className="text-base flex flex-wrap gap-2 mb-2">
            <span className="flex items-center gap-2 text-gray-600"><FiMapPin />{jobLocation}</span>
            <span className="flex items-center gap-2 text-gray-600"><FiClock />{employmentType}</span>
            <span className="flex items-center gap-2 text-gray-600"><FaRupeeSign />{minPrice}-{maxPrice}</span>
            <span className="flex items-center gap-2 text-gray-600"><FiCalendar />{postingDate}</span>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default Card
