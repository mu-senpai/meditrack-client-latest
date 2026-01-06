import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import Navbar from "../../components/Navbar/Navbar";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { AuthContext } from "../../providers/AuthProvider";

const MainLayout = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      <ScrollToTop></ScrollToTop>
    </div>
  );
};

export default MainLayout;
