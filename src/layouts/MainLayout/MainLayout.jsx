import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

const MainLayout = () => {

    const { loading } = useContext(AuthContext);

    if (loading) {
        return <LoadingPage></LoadingPage>
    }

    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            <ScrollToTop></ScrollToTop>
        </div>
    );
};

export default MainLayout;