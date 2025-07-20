import { createBrowserRouter } from "react-router";
import App from "../layouts/App";
import Homepage from "../../features/home/Homepage";
import ActivityDashboard from "../../features/Activities/Dashboard/ActivityDashboard";
import ActivityForm from "../../features/Activities/form/ActivityForm";
import ActivityDetailsPage from "../../features/Activities/details/ActivityDetailPage";

export const router = createBrowserRouter([{
    path:'/',
    element:<App/>,
    children:[
        {
            path:'',
            element:<Homepage/>
        },
        {
            path:'activities',
            element:<ActivityDashboard/>
        },
        {
            path:'activities/:id',
            element:<ActivityDetailsPage/>
        },
        {
            path:'createActivity',
            element:<ActivityForm key='create'/>
        },
        {
            path:'manage/:id',
            element:<ActivityForm/>
        }
    ]

}])