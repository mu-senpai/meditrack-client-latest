import { Navigate, useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import LoadingPage from "../components/LoadingPage/LoadingPage";


const PrivateRoute = (props = {}) => {
    const { children } = props || {};
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <LoadingPage></LoadingPage>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/auth/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;