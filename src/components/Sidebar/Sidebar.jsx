import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaTachometerAlt,
  FaCog,
  FaUsers,
  FaBuilding,
  FaBriefcase,
  FaChartBar,
  FaChartLine,
  FaUserShield,
  FaChevronDown,
  FaChevronUp,
  FaCalendarAlt,
  FaEdit,
  FaPlusCircle,
  FaEye,
} from "react-icons/fa";
import { getData } from "../../services/data-fetch"; // Adjust the import path as needed

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdowns, setDropdowns] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getData("user/profile");
        console.log('Fetched user data:', data);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const toggleDropdown = (enterpriseId) => {
    setDropdowns((prevDropdowns) => ({
      ...prevDropdowns,
      [enterpriseId]: !prevDropdowns[enterpriseId],
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest("aside") === null && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <>
      {/* Hamburger Button */}
      <button
        type="button"
        className="fixed top-24 left-4 lg:hidden inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={toggleSidebar}
        aria-expanded={isSidebarOpen}
        aria-controls="sidebar"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75,0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
      <aside className="sticky top-12 w-auto h-screen bg-gray-800 text-white mb-12 mt-16">
        <div className="flex flex-col h-full p-3 space-y-2 dark:bg-neutral-900 rounded-xl dark:text-gray-200 overflow-auto">
          {/* Profile Section */}
          <div className="flex items-center p-2 space-x-4">
            <img
              src={user?.avatar || "https://source.unsplash.com/100x100/?portrait"}
              alt="Profile"
              className="w-12 h-12 rounded-full dark:bg-gray-500"
            />
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-violet-800 dark:bg-gradient-to-r dark:from-violet-200 dark:to-violet-400 text-transparent bg-clip-text">
                {user ? user.username : "Guest"}
              </h2>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="border-t border-black dark:border-white my-4 mx-4">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li>
                <Link
                  to={`/dashboard/user-db`}
                  className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={closeSidebar}
                >
                  <FaTachometerAlt className="w-5 h-5 fill-current dark:text-white text-black" />
                  <span className="font-semibold bg-gradient-to-r from-violet-400 to-violet-800 dark:bg-gradient-to-r dark:from-violet-200 dark:to-violet-400 text-transparent bg-clip-text">Profil Utilisateur</span>
                </Link>
              </li>
              <li>
                <Link
                  to={`/dashboard/register-company`}
                  className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={closeSidebar}
                >
                  <FaBuilding className="w-5 h-5 fill-current dark:text-white text-black" />
                  <span className="font-semibold bg-gradient-to-r from-violet-400 to-violet-800 dark:bg-gradient-to-r dark:from-violet-200 dark:to-violet-400 text-transparent bg-clip-text">Création Entreprise</span>
                </Link>
              </li>
              <li>
                <Link
                  to={`/dashboard/security`}
                  className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={closeSidebar}
                >
                  <FaCog className="w-5 h-5 fill-current dark:text-white text-black" />
                  <span className="font-semibold bg-gradient-to-r from-violet-400 to-violet-800 dark:bg-gradient-to-r dark:from-violet-200 dark:to-violet-400 text-transparent bg-clip-text">Gestion mot de passe</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Section Divider */}
          <div className="border-t border-black dark:border-white my-4 mx-2"></div>

          {/* Conditional Sections */}
          {user && user.isEntrepreneur && (
            <div className="flex flex-col flex-grow space-y-4">
              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <FaBriefcase className="w-10 h-10 mr-2 dark:text-white text-black" />
                <div>
                  <h3 className="text-lg font-bold dark:bg-gradient-to-r dark:from-orange-200 dark:to-orange-400 bg-gradient-to-r from-orange-400 to-orange-800 text-transparent bg-clip-text">Entreprise</h3>
                  <p className="text-xs dark:text-white text-black">Gestion des entreprises</p>
                </div>
              </div>
              <ul className="pt-2 pb-4 space-y-1 text-sm">
                {user.enterprises && user.enterprises.map((enterprise) => (
                  <li key={enterprise.id}>
                    <div>
                      <button
                        className="flex items-center justify-between w-full p-2 space-x-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => enterprise.isValidate && toggleDropdown(enterprise.id)}
                        disabled={!enterprise.isValidate}
                      >
                        <div className="flex items-center space-x-3">
                          <FaBuilding className="w-5 h-5 fill-current dark:text-white text-black" />
                          <span className={`font-semibold ${!enterprise.isValidate ? 'text-gray-500 dark:text-gray-400' : 'text-black dark:text-gray-100'}`}>
                            {enterprise.name}
                          </span>
                          {!enterprise.isValidate && (
                            <span className="bg-red-100 text-red-800 text-xs font-medium px-1 py-0.5 rounded dark:bg-red-700 dark:text-white">
                            Attente Validation
                          </span>
                          )}
                        </div>
                        <div>
                          {dropdowns[enterprise.id] ? (
                            <FaChevronUp className="w-5 h-5 fill-current dark:text-white text-black" />
                          ) : (
                            <FaChevronDown className="w-5 h-5 fill-current dark:text-white text-black" />
                          )}
                        </div>
                      </button>

                      {enterprise.isValidate && dropdowns[enterprise.id] && (
                        <ul className="pl-6 mt-2 space-y-1 text-sm">
                          <li>
                            <Link
                              to={`/dashboard/enterprise/${enterprise.id}/statistics`}
                              className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                              onClick={closeSidebar}
                            >
                              <FaChartBar className="w-4 h-4 fill-current dark:text-white text-black" />
                              <span className="font-semibold dark:text-gray-100 text-black">Statistiques</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={`/dashboard/enterprise/${enterprise.id}/planning`}
                              className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                              onClick={closeSidebar}
                            >
                              <FaCalendarAlt className="w-4 h-4 fill-current dark:text-white text-black" />
                              <span className="font-semibold dark:text-gray-100 text-black">Planning</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={`/dashboard/enterprise/${enterprise.id}/edit`}
                              className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                              onClick={closeSidebar}
                            >
                              <FaEdit className="w-4 h-4 fill-current dark:text-white text-black" />
                              <span className="font-semibold dark:text-gray-100 text-black">Édition</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={`/dashboard/enterprise/${enterprise.id}/services`}
                              className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                              onClick={closeSidebar}
                            >
                              <FaPlusCircle className="w-4 h-4 fill-current dark:text-white text-black" />
                              <span className="font-semibold dark:text-gray-100 text-black">Offres</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={`/enterprise/${enterprise.id}`}
                              className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                              onClick={closeSidebar}
                            >
                              <FaEye className="w-4 h-4 fill-current dark:text-white text-black" />
                              <span className="font-semibold dark:text-gray-100 text-black">Ma page entreprise</span>
                            </Link>
                          </li>
                        </ul>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Section Divider */}
          {user && user.isEntrepreneur && <div className="border-t border-black dark:border-white my-4 mx-2"></div>}

          {user && user.isAdmin && (
            <div className="flex flex-col flex-grow space-y-4">
              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <FaUserShield className="w-10 h-10 mr-2 fill-current dark:text-white text-black" />
                <div>
                  <h3 className="text-lg font-bold dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] bg-gradient-to-r from-[#67FFCC] to-black text-transparent bg-clip-text">Dashboard</h3>
                  <p className="text-xs dark:text-white text-black">Admin</p>
                </div>
              </div>
              <ul className="pt-2 pb-4 space-y-1 text-sm">
                <li>
                  <Link
                    to={`/dashboard/admin-overview`}
                    className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={closeSidebar}
                  >
                    <FaTachometerAlt className="w-5 h-5 fill-current dark:text-white text-black" />
                    <span className="font-semibold dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] bg-gradient-to-r from-[#67FFCC] to-black text-transparent bg-clip-text">Tableau de bord</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/dashboard/accept-company`}
                    className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={closeSidebar}
                  >
                    <FaBuilding className="w-5 h-5 fill-current dark:text-white text-black" />
                    <span className="font-semibold dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] bg-gradient-to-r from-[#67FFCC] to-black text-transparent bg-clip-text">Validation Entreprises</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/dashboard/manage-users`}
                    className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={closeSidebar}
                  >
                    <FaUsers className="w-5 h-5 fill-current dark:text-white text-black" />
                    <span className="font-semibold dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] bg-gradient-to-r from-[#67FFCC] to-black text-transparent bg-clip-text">Liste des utilisateurs</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/dashboard/manage-companies`}
                    className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={closeSidebar}
                  >
                    <FaBuilding className="w-5 h-5 fill-current dark:text-white text-black" />
                    <span className="font-semibold dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] bg-gradient-to-r from-[#67FFCC] to-black text-transparent bg-clip-text">Liste des entreprises</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/dashboard/statistics`}
                    className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={closeSidebar}
                  >
                    <FaChartBar className="w-5 h-5 fill-current dark:text-white text-black" />
                    <span className="font-semibold dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] bg-gradient-to-r from-[#67FFCC] to-black text-transparent bg-clip-text">Statistiques</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/dashboard/reports`}
                    className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={closeSidebar}
                  >
                    <FaChartLine className="w-5 h-5 fill-current dark:text-white text-black" />
                    <span className="font-semibold dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] bg-gradient-to-r from-[#67FFCC] to-black text-transparent bg-clip-text">Reports</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
