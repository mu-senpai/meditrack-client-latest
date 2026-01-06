import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import {
  FaChartBar,
  FaClipboardList,
  FaHandHoldingMedical,
  FaHome,
  FaMoneyCheckAlt,
  FaPlus,
  FaSignOutAlt,
  FaTasks,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import useAdmin from "../../hooks/useAdmin";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logOut, isDarkMode, toggleDarkMode, loading } =
    useContext(AuthContext);
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

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex h-screen bg-base-200 overflow-hidden">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[280px] bg-base-100 shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-5 border-b border-base-300">
          <Link
            to="/"
            className="text-2xl text-accent font-rubik inline-flex items-center gap-2 font-semibold"
          >
            <FaHandHoldingMedical />
            <span>MediTrack</span>
          </Link>
          <button
            className="lg:hidden text-2xl hover:bg-base-300 rounded-full p-2 transition-colors"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        </div>

        {/* User Profile Section */}
        <div className="p-5 border-b border-base-300">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-12 h-12 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
                <img
                  src={userData?.photoURL || "https://via.placeholder.com/150"}
                  alt={userData?.name || "User"}
                />
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="font-semibold text-base truncate">
                {userData?.name || "User"}
              </p>
              <p className="text-xs text-base-content/60 truncate">
                {isAdmin ? "Administrator" : "Participant"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {/* Common Routes */}
            <div className="mb-4">
              <p className="px-4 text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-2">
                General
              </p>
              <NavLink
                to="/"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive
                      ? "bg-accent text-white shadow-md"
                      : "hover:bg-base-200 text-base-content"
                  }`
                }
              >
                <FaHome className="text-lg" />
                <span>Home</span>
              </NavLink>
              <NavLink
                to="/dashboard/profile"
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive
                      ? "bg-accent text-white shadow-md"
                      : "hover:bg-base-200 text-base-content"
                  }`
                }
              >
                <FaUser className="text-lg" />
                <span>Profile</span>
              </NavLink>
            </div>

            {/* Admin Routes */}
            {isAdmin ? (
              <div className="mb-4">
                <p className="px-4 text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-2">
                  Management
                </p>
                <NavLink
                  to="/dashboard/add-camp"
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                      isActive
                        ? "bg-accent text-white shadow-md"
                        : "hover:bg-base-200 text-base-content"
                    }`
                  }
                >
                  <FaPlus className="text-lg" />
                  <span>Add Camp</span>
                </NavLink>
                <NavLink
                  to="/dashboard/manage-camps"
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                      isActive
                        ? "bg-accent text-white shadow-md"
                        : "hover:bg-base-200 text-base-content"
                    }`
                  }
                >
                  <FaClipboardList className="text-lg" />
                  <span>Manage Camps</span>
                </NavLink>
                <NavLink
                  to="/dashboard/registered-camps-management"
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                      isActive
                        ? "bg-accent text-white shadow-md"
                        : "hover:bg-base-200 text-base-content"
                    }`
                  }
                >
                  <FaTasks className="text-lg" />
                  <span>Manage Registrations</span>
                </NavLink>
              </div>
            ) : (
              /* User Routes */
              <div className="mb-4">
                <p className="px-4 text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-2">
                  My Activities
                </p>
                <NavLink
                  to="/dashboard/registered-camps"
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                      isActive
                        ? "bg-accent text-white shadow-md"
                        : "hover:bg-base-200 text-base-content"
                    }`
                  }
                >
                  <FaClipboardList className="text-lg" />
                  <span>Registered Camps</span>
                </NavLink>
                <NavLink
                  to="/dashboard/payment-history"
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                      isActive
                        ? "bg-accent text-white shadow-md"
                        : "hover:bg-base-200 text-base-content"
                    }`
                  }
                >
                  <FaMoneyCheckAlt className="text-lg" />
                  <span>Payment History</span>
                </NavLink>
                <NavLink
                  to="/dashboard/analytics"
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                      isActive
                        ? "bg-accent text-white shadow-md"
                        : "hover:bg-base-200 text-base-content"
                    }`
                  }
                >
                  <FaChartBar className="text-lg" />
                  <span>Analytics</span>
                </NavLink>
              </div>
            )}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-base-300">
          <button
            onClick={() => {
              handleLogout();
              closeSidebar();
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium w-full transition-all hover:bg-error/10 text-error"
          >
            <FaSignOutAlt className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-base-100 shadow-sm border-b border-base-300 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-2xl p-2 hover:bg-base-200 rounded-lg transition-colors"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open menu"
            >
              <svg
                className="h-6 w-6"
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

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-4 ml-auto">
              {/* Theme Toggle */}
              <label className="swap swap-rotate">
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                  aria-label="Toggle theme"
                />
                <svg
                  className="swap-off h-6 w-6 sm:h-7 sm:w-7 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>
                <svg
                  className="swap-on h-6 w-6 sm:h-7 sm:w-7 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              </label>

              {/* User Avatar - Desktop */}
              <Link
                to="/dashboard/profile"
                className="hidden sm:flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="avatar">
                  <div className="w-9 h-9 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2">
                    <img
                      src={
                        userData?.photoURL || "https://via.placeholder.com/150"
                      }
                      alt={userData?.name || "User"}
                    />
                  </div>
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium truncate max-w-[120px]">
                    {userData?.name?.split(" ")[0] || "User"}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-base-200">
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>

      <ScrollToTop />
    </div>
  );
};

export default Dashboard;
