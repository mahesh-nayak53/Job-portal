import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from '../Pages/Home';
import Createjob from "../Pages/Createjob";
import Myjobs from "../Pages/Myjobs";
// import SalaryPage from "../Pages/SalaryPage"; 
import UpdateJob from "../Pages/UpdateJob";
import Login from "../Components/Login";
import JobDetails from '../Pages/JobDetails';
import JobOpeningsPage from "../Pages/JobOpeningsPage";
import JobSkillsPage from "../Pages/JobSkillsPage";
import SaveJobs from "../Components/SaveJobs";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/post-job", element: <Createjob /> },
      { path: "/my-job", element: <Myjobs /> },
      // { path: "/salary", element: <SalaryPage /> },
      {path : "/save-job" , element:<SaveJobs />},
      {
        path: "/edit-job/:id",
        element: <UpdateJob />,
        loader: ({ params }) => fetch(`http://localhost:3000/all-jobs/${params.id}`)
      },
      {
        path: "/job/:id", 
        element: <JobDetails /> 
      },
      {path:"/job/:id/openings" ,
        element:<JobOpeningsPage />},

       { path:"/job/:id/skills" , element: <JobSkillsPage />} ,
       ]
  },
  {
    path: "/login",
    element: <Login />
  },
]);

export default router;


