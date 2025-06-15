import React, { useState, useEffect } from "react";
import Banner from "../Components/Banner";
import Card from "../Components/Card";
import Jobs from "./Jobs";
import Sidebar from "../sidebar/Sidebar";
import Newsletter from "../Components/ReviewPage";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [currentPage,setCurrentPage] = useState(1);
  const itmesPerPage = 5;

  useEffect(() => {
    setIsLoading(true);
    fetch("jobs.json")
    //fetch("http://localhost:3000/all-jobs")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setJobs(data);
        setIsLoading(false);
      });
  }, []);
  // console.log(jobs)

  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // filter jobs by tittle

  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  //Radio buttons
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  //button based filtering
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  //calculate the index range
const calculatePageRange = () => {
  const startIndex = (currentPage-1) * itmesPerPage;
  const endIndex = startIndex + itmesPerPage;
  return {startIndex,endIndex};
}

//function for the next page

const nextPage = () =>{
  if(currentPage < Math.ceil(filteredItems.length / itmesPerPage)){
    setCurrentPage(currentPage + 1);
  }
}

//function for the previous page

const previousPage = () => {
  if(currentPage > 1){
    setCurrentPage(currentPage-1);
  }
}

  //Main function

  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;
    //filtering input items
    if (query) {
      filteredJobs = filteredItems;
    }

    //category filtering
    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) => 
          jobLocation.toLowerCase() === selected.toLowerCase() ||
          parseInt(maxPrice) <= parseInt(selected) ||
          postingDate >= selected ||
          experienceLevel.toLowerCase() === selected.toLowerCase() ||
          salaryType.toLowerCase() === selected.toLowerCase() ||
          employmentType.toLowerCase() === selected.toLowerCase()
      );
      console.log(filteredJobs);
    }
    //slice the data based on current page 
    const{startIndex,endIndex} = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex,endIndex);
    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };

  const result = filteredData(jobs, selectedCategory, query);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />

      {/* Main contnent */}

      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        {/*left side */}
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>

        {/* job cards */}
        <div className="bg-white p-4 rounded-sm col-span-2 ">
          {
            isLoading ? (<p className="font-medium">Loading....</p>) : result.length > 0 ?(<Jobs result={result}/>):<>
            <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
            <p>No data found</p>
            </>
          }
        {/*Pagaination here*/}
        {
          result.length > 0 ? (
            <div className="flex justify-center mt-4 space-x-8">
              <button  onClick={previousPage} disabled = {currentPage === 1} className="hover:underline">Previous</button>
              <span className="mx-2">Page{currentPage} of {Math.ceil(filteredItems.length /itmesPerPage )}</span>
              <button onClick={nextPage}  disabled = {currentPage === Math.ceil(filteredItems.length / itmesPerPage)} className="hover:underline mc-2">Next</button>
            </div>
          ) : ""
        }

        </div>
        {/*right side */}
        <div className="bg-white p-4 rounded"><Newsletter/></div>
      </div>
    </div>
  );
};

export default Home;
