import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { FaHandHoldingMedical, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAxiosPublic } from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut, toggleDarkMode, isDarkMode } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: userData = {}, refetch } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      if (user) {
        const res = await axiosPublic.get(`/users/public-info/${user?.uid}`);
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

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  const handleLogout = () => {
    logOut()
      .then(() => {
        setTimeout(() => {
          navigate("/");
        }, 5);
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: `${error.code}`,
          icon: "error",
          confirmButtonText: "Close",
        });
      });
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`w-full fixed top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-base-200 shadow-lg" : "bg-transparent text-white"
        }`}
      >
        <div className="w-[97%] mx-auto flex justify-between items-center px-4 py-2 sm:py-3">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl text-accent md:text-3xl font-rubik inline-flex items-center gap-2 font-semibold"
          >
            <FaHandHoldingMedical />
            MediTrack
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Navigation Links */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-medium transition-colors ${
                  isActive ? "text-accent" : "hover:text-accent"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/available-camps"
              className={({ isActive }) =>
                `font-medium transition-colors ${
                  isActive ? "text-accent" : "hover:text-accent"
                }`
              }
            >
              Available Camps
            </NavLink>

            {/* Theme Toggle */}
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleDarkMode}
                aria-label="Toggle theme"
              />
              <svg
                className="swap-off h-8 w-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
              <svg
                className="swap-on h-8 w-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>

            {/* User Section */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  aria-label="User menu"
                >
                  <div className="avatar">
                    <div className="w-10 h-10 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
                      <img
                        alt={userData?.name || "User"}
                        src={
                          userData?.photoURL ||
                          "https://via.placeholder.com/150"
                        }
                      />
                    </div>
                  </div>
                  <span className="font-medium hidden xl:inline">
                    {userData?.name?.split(" ")[0] || "User"}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-base-100 rounded-lg shadow-xl border border-base-300 overflow-hidden z-50">
                    <div className="p-4 border-b border-base-300">
                      <p className="font-semibold text-sm truncate text-base-content">
                        {userData?.name || "User"}
                      </p>
                      <p className="text-xs text-base-content/70 truncate">
                        {userData?.email}
                      </p>
                    </div>
                    <Link
                      to="/dashboard/profile"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-base-200 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaUser className="text-accent" />
                      <span className="font-medium text-base-content">
                        Dashboard
                      </span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-base-200 transition-colors w-full text-left text-error"
                    >
                      <FaSignOutAlt />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth/signup">
                <button className="btn btn-sm btn-accent text-white border-none">
                  Join Us
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Navigation - Visible only on mobile */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleDarkMode}
                aria-label="Toggle theme"
              />
              <svg
                className="swap-off h-7 w-7 sm:h-8 sm:w-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
              <svg
                className="swap-on h-7 w-7 sm:h-8 sm:w-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>

            {/* User Avatar - Mobile */}
            {user && (
              <Link
                to="/dashboard/profile"
                className="avatar hover:opacity-80 transition-opacity"
                title="Go to Dashboard"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
                  <img
                    alt={userData?.name || "User"}
                    src={
                      userData?.photoURL || "https://via.placeholder.com/150"
                    }
                  />
                </div>
              </Link>
            )}

            {/* Hamburger Menu Button */}
            <button
              className="text-2xl sm:text-3xl text-accent focus:outline-none p-2 hover:bg-base-300 rounded-full bg-white/10 transition-colors"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6 sm:h-7 sm:w-7"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay - Mobile Only */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden transition-opacity duration-300"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - Mobile Only */}
      <aside
        className={`fixed top-0 right-0 h-screen w-[280px] sm:w-[320px] bg-base-100 shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out lg:hidden ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-5 border-b border-base-300">
            <Link
              to="/"
              onClick={closeSidebar}
              className="text-2xl text-accent font-rubik inline-flex items-center gap-2 font-semibold"
            >
              <FaHandHoldingMedical />
              MediTrack
            </Link>
            <button
              className="text-2xl hover:bg-base-300 rounded-full p-2 transition-colors"
              onClick={closeSidebar}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* User Profile Section */}
          {user && (
            <div className="p-5 border-b border-base-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="avatar">
                  <div className="w-12 h-12 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
                    <img
                      alt={userData?.name || "User"}
                      src={
                        userData?.photoURL || "https://via.placeholder.com/150"
                      }
                    />
                  </div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-semibold text-base truncate">
                    {userData?.name || "User"}
                  </p>
                  <p className="text-sm text-base-content/70 truncate">
                    {userData?.email}
                  </p>
                </div>
              </div>
              <Link to="/dashboard/profile" onClick={closeSidebar}>
                <button className="btn btn-accent text-white btn-block btn-sm">
                  <FaUser /> Dashboard
                </button>
              </Link>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-5">
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/"
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg font-medium transition-colors ${
                      isActive
                        ? "bg-accent text-white"
                        : "hover:bg-base-300 text-base-content"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/available-camps"
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-lg font-medium transition-colors ${
                      isActive
                        ? "bg-accent text-white"
                        : "hover:bg-base-300 text-base-content"
                    }`
                  }
                >
                  Available Camps
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-5 border-t border-base-300">
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  closeSidebar();
                }}
                className="btn btn-error text-white btn-block"
              >
                Logout
              </button>
            ) : (
              <Link to="/auth/signup" onClick={closeSidebar}>
                <button className="btn btn-accent text-white btn-block">
                  Join Us
                </button>
              </Link>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
