import React from "react";
import InputField from "../Components/InputField";

const Location = ({ handleChange }) => {
  const locations = ["Bangalore", "Mumbai", "Hyderabad", "Chennai"];

  return (
    <div>
      <h4 className="text-lg font-medium mb-2 text-gray-600">Location</h4>

      <div>
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="location"
            value=""
            onChange={handleChange}
          />
          <span className="checkmark"></span>All
        </label>

        {locations.map((city) => (
          <InputField
            key={city}
            handleChange={handleChange}
            value={city.toLowerCase()}
            title={city}
            name="location"
          />
        ))}
      </div>
    </div>
  );
};

export default Location;
