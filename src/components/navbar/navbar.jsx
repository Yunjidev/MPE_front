/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { UserContext } from '../../context/UserContext';
import logo from '../../../public/assets/img/logo.png';
import { getData } from '../../services/data-fetch';
import SignOut from '../user/signout';
import { useAtom } from 'jotai';
import { userAtom } from '../../store/user';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { userType, setUserType } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [user, setUser] = useAtom(userAtom);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
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

  const handleUserTypeToggle = () => {
    const newUserType = userType === 'client' ? 'enterprise' : 'client';
    setUserType(newUserType);
    navigate(newUserType === 'client' ? '/home-client' : '/home-enterprise');
  };

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-full z-50 mt-4">
        <div className="navbar flex justify-center backdrop-filter backdrop-blur-lg bg-[#F8D7DA] bg-opacity-30 dark:bg-[#232323] dark:bg-opacity-30 dark:text-white font-semibold mx-auto w-5/6 h-16 rounded-xl shadow-lg border border-neutral-600">
          <div className="flex-1 flex justify-between items-center">
            <Link to="/">
              <img src={logo} alt="logo" className="w-10 h-10 ml-9 transition-transform duration-300 hover:scale-110" />
            </Link>
            <div className="flex justify-center gap-8 text-black dark:text-white">
              {userType === 'client' ? (
                <>
                  <Link to="/home-client" className='hover:text-neutral-600 hover:dark:text-neutral-300'>Accueil</Link>
                  <a href="#" className='hover:text-neutral-600 hover:dark:text-neutral-300'>Recherche</a>
                  <Link to="/faq" className='hover:text-neutral-600 hover:dark:text-neutral-300'>FAQ</Link>
                  <Link to="/about" className='hover:text-neutral-600 hover:dark:text-neutral-300'>À Propos</Link>
                </>
              ) : userType === 'enterprise' ? (
                <>
                  <Link to="/home-enterprise" className='hover:text-neutral-600 hover:dark:text-neutral-300'>Accueil</Link>
                  <a href="#" className='hover:text-neutral-600 hover:dark:text-neutral-300'>Recherche</a>
                  <Link to="/pricing" className='hover:text-neutral-600 hover:dark:text-neutral-300'>Tarifs</Link>
                  <Link to="/faq" className='hover:text-neutral-600 hover:dark:text-neutral-300'>FAQ</Link>
                  <Link to="/about" className='hover:text-neutral-600 hover:dark:text-neutral-300'>À Propos</Link>
                </>
              ) : null}
            </div>
            <div className="flex-none gap-2 flex items-center relative mr-9">
              <label className="inline-flex items-center cursor-pointer ml-4">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={userType === 'enterprise'}
                  onChange={handleUserTypeToggle}
                />
                <div className={`relative w-11 h-6 rounded-full transition-colors duration-300 ease-in-out 
                  ${userType === 'enterprise' ? 'bg-[#67FFCC]' : 'bg-[#A78BFA]'}
                  peer-checked:after:translate-x-full peer-checked:bg-[#67FFCC]
                  peer-checked:after:bg-[#67FFCC] peer-checked:after:border-white`}
                >
                  <div className={`absolute top-0.5 left-0.5 bg-white border border-gray-300 rounded-full 
                    h-5 w-5 transition-transform duration-300 ease-in-out
                    ${userType === 'enterprise' ? 'translate-x-5' : ''}
                    peer-checked:translate-x-full`}
                  ></div>
                </div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  {userType === 'client' ? 'Mode Particulier' : 'Mode Professionnel'}
                </span>
              </label>
              <div className="form-control">
                <input 
                  type="text" 
                  placeholder="Recherche service ..." 
                  className="dark:bg-neutral-800 bg-white rounded-xl input-bordered dark:border-neutral-600 input-sm w-full max-w-xs" 
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
                        className='rounded-full hover:outline hover:outline-orange-300'
                        alt="User Avatar"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      />
                    </div>
                  ) : (
                    <FaUserCircle className="w-10 h-10 dark:text-white text-black" />
                  )}
                </div>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      tabIndex="0"
                      className="menu menu-sm dropdown-content bg-[#F8D7DA] dark:bg-neutral-800 dark:text-white dark:border dark:border-neutral-600 border border-black rounded-lg rounded-box z-[1] mt-2 absolute right-0 w-52 p-2 shadow-lg"
                    >
                      {user.isLogged ? (
                        <>
                          <li>
                            <Link to="/dashboard" className="text-black dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300">Mon Dashboard</Link>
                          </li>
                          <li><SignOut /></li>
                        </>
                      ) : (
                        <>
                          <li>
                            <Link to="/signin" className="text-black dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300">Connexion</Link>
                          </li>
                          <li>
                            <Link to="/signup" className="text-black dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300">Inscription</Link>
                          </li>
                        </>
                      )}
                    </motion.ul>
                  )}
                </AnimatePresence>
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
