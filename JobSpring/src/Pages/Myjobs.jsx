import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Myjobs = () => {
  const email = "maheshnayakgvt06@gmail.com";
  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage,setCurrentPage] = useState(1);
  const itemsPerPage = 5;


  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:3000/myJobs/maheshnayakgvt06@gmail.com`).then(
      (res) =>
        res.json().then((data) => {
          setJobs(data);
          setIsLoading(false);
        })
    );
  }, [searchText]);

  //pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem-itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstItem,indexOfLastItem)


  //next btn and prveious btm

  const nextPage = () =>{
    if(indexOfLastItem < jobs.length){
      setCurrentPage(currentPage +1);
    }
  }

  const prevPage = () => {
    if(currentPage > 1){
      setCurrentPage(currentPage-1);
    }
  }

  const handleSearch = () => {
    const filter = jobs.filter(
      (job) =>
        job.jobTitle.toLowerCase().indexOf(searchText.toLowerCase()) != -1
    );
    setJobs(filter);
    setIsLoading(false);
  };

  const handleDelete = (id) => {
    // console.log(id);
    fetch(`http://localhost:3000/job/${id}`, {
      method:"DELETE"
    })
      .then((res) => res.json)
      .then((data) => {
        if (data.acknowledged === true) {
          alert("job deleted sucessfully!");
        }
      });
  };
  return (
    <div className="max-w-screen-2xl mx-auto xl:px-24 px-4">
      <div className="search-box p-2 text-center mb-2">
        <input
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          type="text"
          placeholder="Search job title"
          className="py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white font-semibold px-8 py-2 rounded-sm mb-4"
        >
          Search
        </button>

      </div>

      {/* Table */}
      <section className="py-1 bg-blueGray-50">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    All Jobs
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <Link to="/post-job">
                    <button className="bg-indigo-500 text-white text-xs font-bold uppercase px-3 py-1 rounded">
                      Post New Job
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse">
                <thead>
                  <tr>
                    {["No", "Title", "Company Name", "Edit", "Delete"].map(
                      (header) => (
                        <th
                          key={header}
                          className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase font-semibold text-left"
                        >
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        Loading...
                      </td>
                    </tr>
                  ) : currentJobs.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No jobs found.
                      </td>
                    </tr>
                  ) : (
                    currentJobs.map((job, index) => (
                      <tr key={job._id}>
                        <td className="px-6 py-4">
                          {indexOfFirstItem + index + 1}
                        </td>
                        <td className="px-6 py-4">{job.jobTitle}</td>
                        <td className="px-6 py-4">{job.companyName}</td>
                        <td className="px-6 py-4">
                          <Link to={`/edit-job/${job._id}`}>
                            <button className="bg-yellow-500 text-white py-1 px-3 rounded">
                              Edit
                            </button>
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDelete(job._id)}
                            className="bg-red-500 text-white py-1 px-3 rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center text-black space-x-8 mb-8">
          {currentPage > 1 && (
            <button onClick={prevPage} className="hover:underline">
              Previous
            </button>
          )}
          {indexOfLastItem < jobs.length && (
            <button onClick={nextPage} className="hover:underline">
              Next
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Myjobs;
