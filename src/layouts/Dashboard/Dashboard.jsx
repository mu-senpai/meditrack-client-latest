import { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
    FaHome,
    FaUser,
    FaSignOutAlt,
    FaBars,
    FaHandHoldingMedical,
    FaChartBar,
    FaPlus,
    FaClipboardList,
    FaMoneyCheckAlt,
    FaTasks
} from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAdmin from "../../hooks/useAdmin";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import Swal from "sweetalert2";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { user, logOut, isDarkMode, toggleDarkMode, loading } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: userData = {}, refetch } = useQuery({
        queryKey: ["userProfile", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            refetch();
            return res.data;
        },
        enabled: !!user?.email,
    });

    const handleLogout = () => {
        logOut()
            .then(() => {
                setTimeout(() => {
                    navigate('/');
                }, 5);
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Error!',
                    text: `${error.code}`,
                    icon: 'error',
                    confirmButtonText: 'Close'
                })
            });
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    if (loading) {
        return <LoadingPage></LoadingPage>
    }

    return (
        <div className="w-full h-full min-h-screen bg-base-200">
            {/* Sidebar */}
            <div
                className={`fixed top-0 z-50 h-screen bg-accent text-white w-64 lg:w-72 transform ${isSidebarOpen && window.innerWidth < 1024 ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0 transition-transform duration-300`}
            >
                <div className="flex items-center justify-between p-4 shadow-md">
                    <Link to="/" className="text-2xl text-white font-semibold hidden lg:flex items-center gap-2">
                        <FaHandHoldingMedical />
                        MediTrack
                    </Link>
                    <h2 className="text-2xl font-bold lg:hidden">Dashboard</h2>
                    <button
                        className="btn btn-ghost btn-circle lg:hidden text-white text-2xl"
                        onClick={toggleSidebar}
                    >
                        ✕
                    </button>
                </div>

                <nav className="mt-4 space-y-1">
                    {/* Common for both Admin & User */}
                    <NavLink to="/" onClick={() => setIsSidebarOpen(false)} className="flex items-center p-4 rounded-md hover:bg-accent-focus">
                        <FaHome className="mr-3" /> Home
                    </NavLink>
                    <NavLink to="/dashboard/profile" onClick={() => setIsSidebarOpen(false)} className="flex items-center p-4 rounded-md hover:bg-accent-focus">
                        <FaUser className="mr-3" /> Profile
                    </NavLink>

                    {/* Admin Routes */}
                    {isAdmin ? (
                        <>
                            <NavLink to="/dashboard/add-camp" onClick={() => setIsSidebarOpen(false)} className="flex items-center p-4 rounded-md hover:bg-accent-focus">
                                <FaPlus className="mr-3" /> Add Camp
                            </NavLink>
                            <NavLink to="/dashboard/manage-camps" onClick={() => setIsSidebarOpen(false)} className="flex items-center p-4 rounded-md hover:bg-accent-focus">
                                <FaClipboardList className="mr-3" /> Manage Camps
                            </NavLink>
                            <NavLink to="/dashboard/registered-camps-management" onClick={() => setIsSidebarOpen(false)} className="flex items-center p-4 rounded-md hover:bg-accent-focus">
                                <FaTasks className="mr-3" /> Manage Registrations
                            </NavLink>
                        </>
                    ) : (
                        <>
                            {/* User Routes */}
                            <NavLink to="/dashboard/registered-camps" onClick={() => setIsSidebarOpen(false)} className="flex items-center p-4 rounded-md hover:bg-accent-focus">
                                <FaClipboardList className="mr-3" /> Registered Camps
                            </NavLink>
                            <NavLink to="/dashboard/payment-history" onClick={() => setIsSidebarOpen(false)} className="flex items-center p-4 rounded-md hover:bg-accent-focus">
                                <FaMoneyCheckAlt className="mr-3" /> Payment History
                            </NavLink>
                            <NavLink to="/dashboard/analytics" onClick={() => setIsSidebarOpen(false)} className="flex items-center p-4 rounded-md hover:bg-accent-focus">
                                <FaChartBar className="mr-3" /> Analytics
                            </NavLink>
                        </>
                    )}

                    <button onClick={() => { handleLogout(); setIsSidebarOpen(false) }} className="flex cursor-pointer items-center p-4 rounded-md hover:bg-accent-focus">
                        <FaSignOutAlt className="mr-3" /> Logout
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="w-full h-full flex flex-col lg:pl-72">
                {/* Top Navbar */}
                <div className="w-full bg-accent shadow-md sticky top-0 z-40">
                    <div className="w-[95%] mx-auto navbar">
                        <div className="flex items-center">
                            <Link to="/" className="text-2xl text-white font-semibold lg:hidden inline-flex">
                                <FaHandHoldingMedical />
                                MediTrack
                            </Link>
                        </div>
                        <div className="flex items-center space-x-2 lg:space-x-4 ml-auto">
                            <label data-tooltip-id="nav-tooltip" data-tooltip-content="Switch current theme" data-tooltip-delay-show={1000} className="swap swap-rotate text-white">
                                {/* this hidden checkbox controls the state */}
                                <input
                                    type="checkbox"
                                    checked={isDarkMode}
                                    onChange={toggleDarkMode}
                                />

                                {/* sun icon */}
                                <svg
                                    className="swap-off h-10 w-10 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                                </svg>

                                {/* moon icon */}
                                <svg
                                    className="swap-on h-10 w-10 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                                </svg>
                            </label>
                            <Link to="/dashboard/profile" className="avatar cursor-pointer flex items-center space-x-2">
                                <div className="w-10 rounded-full">
                                    <img src={userData?.photoURL || "https://via.placeholder.com/150"} alt="User Avatar" />
                                </div>
                            </Link>
                            <button className="btn btn-sm btn-ghost btn-circle lg:hidden text-2xl" onClick={toggleSidebar}>
                                <FaBars color="#FFFFFF" size={15} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="w-full h-full relative">
                    <section className="w-full h-full z-10">
                        <Outlet />
                    </section>
                </div>
            </div>
            <ScrollToTop></ScrollToTop>
        </div>
    );
};

export default Dashboard;
