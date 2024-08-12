// Sidebar.jsx
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { FaTachometerAlt, FaCog, FaUsers, FaBuilding, FaBriefcase, FaChartBar, FaChartLine, FaUserShield } from 'react-icons/fa';
import { UserContext } from '../../context/UserContext';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useContext(UserContext);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (user && user.id) {
      setUserId(user.id);
    }
  }, [user]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (window.innerWidth < 1024) { // Apply only on mobile
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('aside') === null && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75,0 010 1.5H2.75A.75.75,0 012 10z"
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`fixed top-28 ${isSidebarOpen ? 'left-0' : 'left-full'} lg:left-8 rounded-xl z-40 w-64 h-4/5 bg-gray-50 dark:bg-neutral-600 transition-transform duration-300 ease-in-out`}
        aria-label="Sidebar"
      >
        <div className="h-full p-3 space-y-2 dark:bg-neutral-600 rounded-xl dark:text-gray-200">
          {/* Profile Section */}
          <div className="flex items-center p-2 space-x-4">
            <img
              src="https://source.unsplash.com/100x100/?portrait"
              alt="Profile"
              className="w-12 h-12 rounded-full dark:bg-gray-500"
            />
            <div>
              <h2 className="text-lg font-semibold">{user ? user.username : 'Guest'}</h2>
              <span className="flex items-center space-x-1">
                <Link
                  to={`/dashboard/${userId}/user`} // Utiliser l'ID utilisateur pour les liens de profil
                  className="text-xs hover:underline dark:text-gray-400"
                  onClick={closeSidebar}
                >
                  View profile
                </Link>
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="divide-y dark:divide-gray-700">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li>
                <Link
                  to={`/dashboard/${userId}/company-db`} // Utiliser l'ID utilisateur pour les liens de navigation
                  className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={closeSidebar}
                >
                  <FaTachometerAlt className="w-5 h-5 fill-current dark:text-gray-400" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to={`/dashboard/${userId}/register-company`}
                  className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={closeSidebar}
                >
                  <FaBuilding className="w-5 h-5 fill-current dark:text-gray-400" />
                  <span>Create Company</span>
                </Link>
              </li>
              <li>
                <Link
                  to={`/dashboard/${userId}/security`}
                  className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={closeSidebar}
                >
                  <FaCog className="w-5 h-5 fill-current dark:text-gray-400" />
                  <span>Security</span>
                </Link>
              </li>
            </ul>
          </div>

          {user && user.isAdmin && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <FaUserShield className="w-10 h-10 mr-2 fill-current dark:text-gray-400" />
                <div>
                  <h3 className="text-lg font-semibold">Admin</h3>
                  <p className="text-xs">Dashboard</p>
                </div>
              </div>
              <ul className="pt-2 pb-4 space-y-1 text-sm">
                <li>
                  <Link
                    to={`/dashboard/${userId}`}
                    className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={closeSidebar}
                  >
                    <FaTachometerAlt className="w-5 h-5 fill-current dark:text-gray-400" />
                    <span>Tableau de Bord</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/dashboard/${userId}/accept-company`}
                    className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={closeSidebar}
                  >
                    <FaBuilding className="w-5 h-5 fill-current dark:text-gray-400" />
                    <span>Acceptation entreprise</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/dashboard/${userId}/manage-users`}
                    className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={closeSidebar}
                  >
                    <FaUsers className="w-5 h-5 fill-current dark:text-gray-400" />
                    <span>Gestion Utilisateur</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/dashboard/${userId}/manage-companies`}
                    className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={closeSidebar}
                  >
                    <FaBuilding className="w-5 h-5 fill-current dark:text-gray-400" />
                    <span>Gestion Entreprise</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/dashboard/${userId}/manage-careers`}
                    className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={closeSidebar}
                  >
                    <FaBriefcase className="w-5 h-5 fill-current dark:text-gray-400" />
                    <span>Gestion des Métiers</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/dashboard/${userId}/manage-subscriptions`}
                    className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={closeSidebar}
                  >
                    <FaChartLine className="w-5 h-5 fill-current dark:text-gray-400" />
                    <span>Gestion des Abonnements</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/dashboard/${userId}/reports`}
                    className="flex items-center p-2 space-x-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={closeSidebar}
                  >
                    <FaChartBar className="w-5 h-5 fill-current dark:text-gray-400" />
                    <span>Reports</span>
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
