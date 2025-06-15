import './index.css'
import {RouterProvider} from "react-router-dom";
import ReactDOM from "react-dom/client";
import router from './Router/Router.jsx';


ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />, 
)