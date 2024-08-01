import { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { UserContext } from '../../context/UserContext';
import logo from '../../../public/assets/img/logo.png';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { userType } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-8xl z-50 mt-4">
        <div className="navbar bg-base-100 dark:bg-gray-900 dark:text-white font-semibold mx-auto w-3/4 rounded-xl shadow-lg" data-theme="light">
          <div className="flex-1 flex justify-between items-center">
            <Link to="/" >
              <img src={logo} alt="logo" className="w-10 h-10 ml-2 transition-transform duration-300 hover:scale-110" />
            </Link>
            <div className="flex justify-center gap-4">
              {userType === 'client' ? (
                <>
                  <Link to="/home-client" className="btn btn-ghost">Accueil</Link>
                  <a href="#" className="btn btn-ghost">Recherche</a>
                  <a href="#" className="btn btn-ghost">FAQ</a>
                </>
              ) : userType === 'enterprise' ? (
                <>
                  <Link to="/home-enterprise" className="btn btn-ghost">Accueil</Link>
                  <a href="#" className="btn btn-ghost">Recherche</a>
                  <a href="#" className="btn btn-ghost">Pricing</a>
                </>
              ) : null}
            </div>
            <div className="flex-none gap-2 flex items-center relative">
              <div className="form-control">
                <input 
                  type="text" 
                  placeholder="Recherche service ..." 
                  className="input input-bordered input-sm w-full max-w-xs" 
                />
              </div>
              <div 
                className="relative" 
                ref={dropdownRef}
              >
                <div 
                  tabIndex="0" 
                  role="button" 
                  className="btn btn-ghost btn-circle avatar" 
                  onClick={toggleDropdown}
                >
                  {isAuthenticated ? (
                    <div className="w-10 rounded-full">
                      <img
                        alt="User Avatar"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      />
                    </div>
                  ) : (
                    <FaUserCircle className="w-10 h-10" />
                  )}
                </div>
                {isDropdownOpen && ( 
                  <ul
                    tabIndex="0"
                    className="menu menu-sm dropdown-content bg-base-100 dark:bg-gray-900 rounded-box z-[1] mt-2 absolute right-0 w-52 p-2 shadow-lg"
                  >
                    {isAuthenticated ? (
                      <>
                        <li>
                          <Link to="/dashboard">Mon Dashboard</Link>
                        </li>
                        <li><a href="#" onClick={() => setIsAuthenticated(false)}>Logout</a></li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link to="/signin">Connexion</Link>
                        </li>
                        <li>
                          <Link to="/signup">Inscription</Link>
                        </li>
                      </>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="pt-14">
      </div>
    </>
  );
};

export default Navbar;
