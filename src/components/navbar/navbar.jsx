/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { UserContext } from '../../context/UserContext';
import logo from '../../../public/assets/img/logo.png';
import { getData } from '../../services/data-fetch';
import SignOut from '../user/signout';

// Atoms
import { useAtom } from "jotai";
import { userAtom } from '../../store/user'

const Navbar = () => {
  const { userType } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [user, setUser] = useAtom(userAtom);
  const [profile, setProfile] = useState(null);

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

  const handleLogout = () => {
    setUser({ ...user, isLogged: false });
  };

  useEffect(() => {
    // Cette fonction est appelée uniquement lorsque `user.id` change.
    const fetchProfileData = async () => {
      if (user.isLogged && user.id) {
        try {
          const data = await getData(`/users/${user.id}`);
          setProfile(data); // Mettre à jour l'état local avec les données de profil
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchProfileData();
  }, [user.id]);

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-full z-50 mt-4">
        <div className="navbar backdrop-filter backdrop-blur-lg bg-white bg-opacity-30 dark:bg-[#232323] dark:bg-opacity-30 dark:text-white font-semibold mx-auto w-5/6 rounded-xl shadow-lg">
          <div className="flex-1 flex justify-between items-center">
            <Link to="/" >
              <img src={logo} alt="logo" className="w-10 h-10 ml-2 transition-transform duration-300 hover:scale-110" />
            </Link>
            <div className="flex justify-center gap-4">
              {userType === 'client' ? (
                <>
                  <Link to="/home-client" className="btn btn-ghost">Accueil</Link>
                  <Link to="/searchentreprise" className="btn btn-ghost">Recherche</Link>
                  <Link to="/faq" className="btn btn-ghost">FAQ</Link>
                </>
              ) : userType === 'enterprise' ? (
                <>
                  <Link to="/home-enterprise" className="btn btn-ghost">Accueil</Link>
                  <Link to="/searchentreprise" className="btn btn-ghost">Recherche</Link>
                  <Link to="/pricing" className="btn btn-ghost">Pricing</Link>
                </>
              ) : null}
            </div>
            <div className="flex-none gap-2 flex items-center relative">
              <div className="form-control">
                <input 
                  type="text" 
                  placeholder="Recherche service ..." 
                  className="dark:bg-neutral-800 bg-white rounded-xl input-bordered input-sm w-full max-w-xs" 
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
                  {user.isLogged ? (
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
                    className="menu menu-sm dropdown-content light:bg-white light:text-black dark:bg-dark dark:text-white rounded-box z-[1] mt-2 absolute right-0 w-52 p-2 shadow-lg"
                  >
                    {user.isLogged ? (
                      <>
                        <li>
                          <Link to="/dashboard">Mon Dashboard</Link>
                        </li>
                        <li><SignOut /></li>
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
