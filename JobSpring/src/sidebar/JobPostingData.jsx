import React from 'react'
import InputField from '../Components/InputField'

const JobPostingData = ({ handleChange }) => {
    const now = new Date();
    // console.log(now)
    const twetyFourHoursAgo = new Date(now - 24 * 60 * 60 *1000);
    const SevenDaysAgo = new Date(now - 7 *24 * 60 * 60 *1000);
    const ThirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 *1000)
    // console.log(twetyFourHoursAgo)
    
    // converting data to string
    const twetyFourHoursAgoDAte = twetyFourHoursAgo.toISOString().slice(0,10);
    const SevenDaysAgoDAte = SevenDaysAgo.toISOString().slice(0,10);
    const ThirtyDaysAgoDAte = ThirtyDaysAgo.toISOString().slice(0,10);

    console.log(twetyFourHoursAgoDAte)
  return (
    <div>
      <h4 className="text-lg font-medium mb-2 text-gray-600">Date of Posting</h4>

      <div>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="test"
            id="test"
            value=""
            onChange={handleChange}
          />
          <span className="checkmark"></span>All time
        </label>
        <InputField
          handleChange={handleChange}
          value= {twetyFourHoursAgoDAte}
          title="Last 24 hours"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value={SevenDaysAgoDAte}
          title="Last 7 days"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value={ThirtyDaysAgoDAte}
          title="Last 30 days"
          name="test"
        />
      </div>
    </div>
  )
}

export default JobPostingData
