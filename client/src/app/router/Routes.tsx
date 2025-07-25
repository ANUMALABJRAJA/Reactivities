import { createBrowserRouter, Navigate } from "react-router";
import App from "../layouts/App";
import Homepage from "../../features/home/Homepage";
import ActivityDashboard from "../../features/Activities/Dashboard/ActivityDashboard";
import ActivityForm from "../../features/Activities/form/ActivityForm";
import ActivityDetailsPage from "../../features/Activities/details/ActivityDetailPage";
import Counter from "../../features/Counter/counter";
import TestErrors from "../../errors/TestErrors";
import NotFound from "../../errors/NotFound";
import ServerError from "../../errors/ServerError";

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
        },
        {
            path:'counter',
            element:<Counter/>
        },
        {
            path:'errors',
            element:<TestErrors/>
        },
        {
            path:'not-found',
            element:<NotFound/>
        },
        {
            path:'server-error',
            element:<ServerError/>
        },
        {
            path:'*',
            element:<Navigate replace to='/not-found'/>
        }
        
        
    ]

}])