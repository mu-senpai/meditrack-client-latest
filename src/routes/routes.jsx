import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import AvailableCamps from "../pages/AvailableCamps/AvailableCamps";
import CampDetails from "../pages/CampDetails/CampDetails";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../layouts/Dashboard/Dashboard";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import AddCamp from "../pages/AddCamp/AddCamp";
import ManageCamps from "../pages/ManageCamps/ManageCamps";
import RegisteredCamps from "../pages/RegisteredCamps/RegisteredCamps";
import RegisteredCampsManagement from "../pages/RegisteredCampsManagement/RegisteredCampsManagement";
import PaymentHistory from "../pages/PaymentHistory/PaymentHistory";
import PaymentGateway from "../pages/PaymentPage/PaymentGateway";
import UserAnalytics from "../pages/UserAnalytics/UserAnalytics";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

export const routes = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path: "available-camps",
            element: <AvailableCamps></AvailableCamps>
        },
        {
            path: "camp-details/:id",
            element: <PrivateRoute><CampDetails></CampDetails></PrivateRoute>,
        }
      ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "profile",
                element: <ProfilePage></ProfilePage>,
            },
            {
                path: "add-camp",
                element: <AdminRoute><AddCamp></AddCamp></AdminRoute>,
            },
            {
                path: "manage-camps",
                element: <AdminRoute><ManageCamps></ManageCamps></AdminRoute>,
            },
            {
                path: "registered-camps",
                element: <UserRoute><RegisteredCamps></RegisteredCamps></UserRoute>
            },
            {
                path: "registered-camps-management",
                element: <AdminRoute><RegisteredCampsManagement></RegisteredCampsManagement></AdminRoute>,
            },
            {
                path: "payment-history",
                element: <UserRoute><PaymentHistory></PaymentHistory></UserRoute>,
            },
            {
                path: "payment",
                element: <UserRoute><PaymentGateway></PaymentGateway></UserRoute>,
            },
            {
                path: "analytics",
                element: <UserRoute><UserAnalytics></UserAnalytics></UserRoute>,
            }
        ]
    },
    {
        path: "auth",
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "login",
                element: <Login></Login>,
            },
            {
                path: "signup",
                element: <SignUp></SignUp>,
            }
        ]
    }
  ]);