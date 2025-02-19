import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import { FaHandHoldingMedical, FaUser } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Navbar = () => {

    const { user, logOut, toggleDarkMode, isDarkMode } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const { data: userData = {}, refetch } = useQuery({
        queryKey: ["userProfile", user?.email],
        queryFn: async () => {
            if (user) {
                const res = await axiosSecure.get(`/users/${user?.email}`);
                refetch();
                return res.data;
            }
        },
        enabled: !!user?.email,
    });

    useEffect(() => {
        if (location.pathname === "/") {
            const handleScroll = () => {
                setIsScrolled(window.scrollY > 170);
            };

            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        } else {
            setIsScrolled(true);
        }
    }, [location.pathname]);

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

    const NavigationList = (
        <>
            <li>
                <NavLink
                    to={`/`}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                        `${isActive ? "text-accent" : "hover:text-accent"}`
                    }
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to={`/available-camps`}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                        `${isActive ? "text-accent" : "hover:text-accent"}`
                    }
                >
                    Available Camps
                </NavLink>
            </li>
            {!user ? (
                <>
                    {/* <li>
                        <Link
                            to={`/auth/signup`}
                        >
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="font-bold lg:btn lg:btn-sm lg:btn-accent lg:text-white lg:border-none"
                            >Join Us</button>
                        </Link>
                    </li> */}
                </>
            ) : (
                <>
                    {/* <li>
                        <NavLink
                            to={`/about`}
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) =>
                                `${isActive ? "text-accent" : "hover:text-accent"}`
                            }
                        >
                            About Us
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={`/contact`}
                            onClick={() => setIsMenuOpen(false)}
                            className={({ isActive }) =>
                                `${isActive ? "text-accent" : "hover:text-accent"}`
                            }
                        >
                            Contact
                        </NavLink>
                    </li> */}
                    {/* <li>
                        <button
                            onClick={() => {
                                handleLogout();
                                setIsMenuOpen(false);
                            }}
                            className="font-bold lg:btn lg:btn-sm lg:btn-accent lg:text-white lg:border-none"
                        >
                            Log Out
                        </button>
                    </li> */}
                </>
            )}
        </>
    );

    return (
        <nav
            className={`w-full min-[1920px]:w-[120rem] mx-auto fixed top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-base-200' : 'bg-transparent text-white'}`}
        >
            <div className="w-[97%] mx-auto flex justify-between items-center px-4 py-2 sm:py-3">
                {/* Logo */}
                <Link
                    to="/"
                    className={`text-2xl text-accent md:text-3xl font-rubik inline-flex items-center gap-2 font-semibold`}
                >
                    <FaHandHoldingMedical />
                    MediTrack
                </Link>


                {/* Desktop Navigation */}
                <ul className="hidden lg:flex lg:space-x-5 xl:space-x-6 items-center">
                    <li>
                        <label data-tooltip-id="nav-tooltip" data-tooltip-content="Switch current theme" data-tooltip-delay-show={1000} className="swap swap-rotate">
                            {/* this hidden checkbox controls the state */}
                            <input
                                type="checkbox"
                                checked={isDarkMode}
                                onChange={toggleDarkMode}
                                onClick={() => setIsMenuOpen(false)}
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
                    </li>

                    {NavigationList}

                    {(user ?
                        (<div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt={userData?.name}
                                        src={userData?.photoURL} />
                                </div>
                            </div>
                            <div
                                tabIndex={0}
                                className="card card-compact dropdown-content bg-base-100 text-base-content z-1 mt-3 w-52 shadow">
                                <div className="card-body p-4">
                                    <div className="card-actions">
                                        <button className="btn btn-ghost btn-block">
                                            <FaUser /> {userData?.name?.split(" ")[0]}
                                        </button>
                                    </div>
                                    <Link to={`/dashboard/profile`} className="card-actions">
                                        <button className="btn btn-accent text-white btn-block">Dashboard</button>
                                    </Link>
                                    <div className="card-actions">
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setIsMenuOpen(false);
                                            }}
                                            className="btn btn-error text-white btn-block">Logout</button>
                                    </div>
                                </div>
                            </div>
                        </div>)
                        : (
                            <Link
                                to={`/auth/signup`}
                            >
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="btn btn-sm btn-accent text-white border-none"
                                >Join Us</button>
                            </Link>
                        )
                    )}
                </ul>

                <div className="flex lg:hidden items-center gap-2 sm:gap-3">

                    <label data-tooltip-id="nav-tooltip" data-tooltip-content="Switch current theme" data-tooltip-delay-show={1000} className="swap swap-rotate">
                        {/* this hidden checkbox controls the state */}
                        <input
                            type="checkbox"
                            checked={isDarkMode}
                            onChange={toggleDarkMode}
                            onClick={() => setIsMenuOpen(false)}
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

                    {/* Avatar */}
                    {(user ?
                        (<div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt={userData?.name}
                                        src={userData?.photoURL} />
                                </div>
                            </div>
                            <div
                                tabIndex={0}
                                className="card card-compact dropdown-content bg-base-100 text-base-content z-1 mt-3 w-52 shadow">
                                <div className="card-body p-4">
                                    <div className="card-actions">
                                        <button className="btn btn-ghost btn-block">
                                            <FaUser /> {userData?.name?.split(" ")[0]}
                                        </button>
                                    </div>
                                    <Link to={`/dashboard/profile`} className="card-actions">
                                        <button onClick={() => setIsMenuOpen(false)} className="btn btn-accent text-white btn-block">Dashboard</button>
                                    </Link>
                                    <div className="card-actions">
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setIsMenuOpen(false);
                                            }}
                                            className="btn btn-error text-white btn-block">Logout</button>
                                    </div>
                                </div>
                            </div>
                        </div>)
                        : (
                            <Link
                                to={`/auth/signup`}
                            >
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="btn btn-xs sm:btn-sm btn-accent text-white border-none"
                                >Join Us</button>
                            </Link>
                        )
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        className="block lg:hidden text-2xl text-accent"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        ☰
                    </button>
                </div>
            </div>

            {/* Dropdown for Small Devices */}
            <div
                className={`fixed w-full z-50 transition-transform duration-300 ${isMenuOpen && window.innerWidth < 768 ? "translate-y-0 top-0" : "translate-y-[-100%] -top-[100%]"} bg-base-100/95 ${isDarkMode ? "text-white" : "text-black"} p-14 h-[11rem] md:hidden`}
                // ${user ? 'h-[22rem]' : 'h-44'} 
                style={{ zIndex: 1000 }}
            >
                {/* Close Button */}
                <button
                    className={`absolute top-4 right-6 text-2xl px-4 py-2 ${isDarkMode ? "bg-gray-500 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} rounded-full`}
                    onClick={() => setIsMenuOpen(false)}
                >
                    ✕
                </button>

                {/* Menu Items */}
                <ul className="flex flex-col items-center justify-center space-y-4 text-center text-lg font-semibold tracking-wide">
                    {NavigationList}
                </ul>
            </div>

            {/* Sidebar for Medium Devices */}
            <div
                className={`fixed top-0 z-50 h-screen transition-transform duration-300 ${isMenuOpen && window.innerWidth >= 768 ? "translate-x-0 right-0" : "translate-x-full -right-[100%]"
                    } bg-base-100/95 ${isDarkMode ? "text-white" : "text-black"} w-72 hidden md:block lg:hidden`}
            >
                {/* Close Button */}
                <button
                    className={`absolute top-4 right-6 text-2xl ${isDarkMode ? "bg-gray-500 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} px-4 py-2 rounded-full`}
                    onClick={() => setIsMenuOpen(false)}
                >
                    ✕
                </button>

                {/* Menu Items */}
                <ul className="flex flex-col items-center justify-center h-full space-y-6 text-center text-lg font-semibold tracking-wide">
                    {NavigationList}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;