/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useModal } from "../../context/ModalContext";
import logo from "../../../public/assets/img/logo.png";
import { getData } from "../../services/data-fetch";
import SignOut from "../user/signout";
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";
import { motion, AnimatePresence } from "framer-motion";
import "./navbar.css";

const Navbar = () => {
  const { userType, setUserType } = useModal();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [user, setUser] = useAtom(userAtom);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isSelectionPage = location.pathname === "/";
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setUser({ ...user, isLogged: false });
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      if (user.isLogged && user.id) {
        try {
          const data = await getData("user/profile");
          console.log("Fetched profile data:", data); // Log fetched data
          setProfile(data);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }
    };

    fetchProfileData();
  }, [user.id]);

  const handleUserTypeToggle = () => {
    const newUserType = userType === "client" ? "enterprise" : "client";
    setUserType(newUserType);
    navigate(newUserType === "client" ? "/home-client" : "/home-enterprise");
  };

  // Base URL for avatars
  const baseAvatarUrl = "http://localhost:8080/api";

  // Construct avatar URL
  const avatarUrl = profile?.avatar
    ? `${baseAvatarUrl}${user.avatar}`
    : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
  console.log("Avatar URL:", avatarUrl);
  return (
    <>
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-full z-50 mt-4">
        <div className="navbar flex justify-between items-center backdrop-filter backdrop-blur-lg bg-[#F8D7DA] bg-opacity-30 dark:bg-[#232323] dark:bg-opacity-30 dark:text-white border border-neutral-200 font-semibold mx-auto w-5/6 h-16 rounded-xl neon-nav">
          <div className="flex items-center">
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="w-10 h-10 ml-2 lg:ml-9 transition-transform duration-300 hover:scale-110"
              />
            </Link>
          </div>

          {!isSelectionPage && (
            <div className="hidden md:flex justify-center items-center gap-8 text-black dark:text-white">
              {userType === "client" ? (
                <>
                  <Link
                    to="/home-client"
                    className="hover:text-neutral-600 hover:dark:text-neutral-300"
                  >
                    Accueil
                  </Link>
                  <Link
                    to="/searchentreprise"
                    className="hover:text-neutral-600 hover:dark:text-neutral-300"
                  >
                    Recherche
                  </Link>
                  <Link
                    to="/faq"
                    className="hover:text-neutral-600 hover:dark:text-neutral-300"
                  >
                    FAQ
                  </Link>
                  <Link
                    to="/about"
                    className="hover:text-neutral-600 hover:dark:text-neutral-300"
                  >
                    À Propos
                  </Link>
                </>
              ) : userType === "enterprise" ? (
                <>
                  <Link
                    to="/home-enterprise"
                    className="hover:text-neutral-600 hover:dark:text-neutral-300"
                  >
                    Accueil
                  </Link>
                  <Link
                    to="/searchentreprise"
                    className="hover:text-neutral-600 hover:dark:text-neutral-300"
                  >
                    Recherche
                  </Link>
                  <Link
                    to="/pricing"
                    className="hover:text-neutral-600 hover:dark:text-neutral-300"
                  >
                    Tarifs
                  </Link>
                  <Link
                    to="/faq"
                    className="hover:text-neutral-600 hover:dark:text-neutral-300"
                  >
                    FAQ
                  </Link>
                  <Link
                    to="/about"
                    className="hover:text-neutral-600 hover:dark:text-neutral-300"
                  >
                    À Propos
                  </Link>
                </>
              ) : null}

              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={userType === "enterprise"}
                  onChange={handleUserTypeToggle}
                />
                <div
                  className={`relative w-11 h-6 rounded-full transition-colors duration-300 ease-in-out 
                  ${userType === "enterprise" ? "bg-[#67FFCC]" : "bg-[#A78BFA]"}
                  peer-checked:after:translate-x-full peer-checked:bg-[#67FFCC]
                  peer-checked:after:bg-[#67FFCC] peer-checked:after:border-white`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 bg-white border border-gray-300 rounded-full 
                    h-5 w-5 transition-transform duration-300 ease-in-out
                    ${userType === "enterprise" ? "translate-x-5" : ""}
                    peer-checked:translate-x-full`}
                  ></div>
                </div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  {userType === "client"
                    ? "Mode Particulier"
                    : "Mode Professionnel"}
                </span>
              </label>
            </div>
          )}

          <div className="flex items-center gap-2 lg:mr-9">
            {!isSelectionPage && (
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Recherche service ..."
                  className="dark:bg-neutral-800 bg-white rounded-xl input-bordered dark:border-neutral-600 input-sm w-full max-w-xs"
                />
              </div>
            )}
            <div className="relative" ref={dropdownRef}>
              <div
                tabIndex="0"
                role="button"
                className="btn btn-ghost btn-circle avatar"
                onClick={toggleDropdown}
              >
                {user.isLogged ? (
                  <div className="w-10 rounded-full">
                    <img
                      className="rounded-full hover:outline hover:outline-orange-300"
                      alt="User Avatar"
                      src={avatarUrl} // Use computed avatar URL
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
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    tabIndex="0"
                    className="menu menu-sm dropdown-content bg-[#F8D7DA] dark:bg-neutral-800 dark:text-white dark:border dark:border-neutral-600 border border-black rounded-lg rounded-box z-[1] mt-2 absolute right-0 w-52 p-2 shadow-lg"
                  >
                    {user.isLogged ? (
                      <>
                        <li>
                          <Link
                            to={`/dashboard/user-db`}
                            className="text-black dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300"
                          >
                            Mon Dashboard
                          </Link>
                        </li>
                        <li>
                          <SignOut />
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link
                            to="/signin"
                            className="text-black dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300"
                          >
                            Connexion
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/signup"
                            className="text-black dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300"
                          >
                            Inscription
                          </Link>
                        </li>
                      </>
                    )}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
            {!isSelectionPage && (
              <div className="md:hidden flex items-center mr-2 lg:mr-9">
                <button onClick={toggleMobileMenu}>
                  {isMobileMenuOpen ? (
                    <FaTimes className="w-6 h-6" />
                  ) : (
                    <FaBars className="w-6 h-6" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
        {!isSelectionPage && isMobileMenuOpen && (
          <div className="md:hidden backdrop-filter backdrop-blur-lg bg-[#F8D7DA] bg-opacity-30 dark:bg-[#232323] dark:bg-opacity-30 dark:text-white border border-neutral-200 font-semibold mx-auto w-5/6 mt-4 rounded-xl neon-nav">
            <div className="flex flex-col items-center gap-4 py-4">
              {userType === "client" ? (
                <>
                  <Link
                    to="/home-client"
                    onClick={toggleMobileMenu}
                    className="hover:text-neutral-600 hover:dark:text-neutral-300"
                  >
                    Accueil
                  </Link>
                  <a
                    href="#"
                    onClick={toggleMobileMenu}
                    className="hover:text-neutral-600 hover:dark:text-neutral-300"
                  >
                    Recherche
                  </a>
                  <Link
                    to="/faq"
                    onClick={toggleMobileMenu}
                    className="hover:text-neutral-600 hover:dark:text-neutral-300"
                  >
                    FAQ
                  </Link>
                  <Link
                    to="/about"
                    onClick={toggleMobileMenu}
                    className="hover:text-neutral-600 hover:dark:text-neutral-300"
                  >
                    À Propos
                  </Link>
                </>
              ) : userType === "enterprise" ? (
                <>
                  <Link
                    to="/home-enterprise"
                    onClick={toggleMobileMenu}
                    className="hover:text-neutral-600 hover:dark:text-neutral-300"
                  >
                    Accueil
                  </Link>
                  <a
                    href="#"
                    onClick={toggleMobileMenu}
                    className="hover:text-neutral-600 hover:dark:text-neutral-300"
                  >
                    Recherche
                  </a>
                  <Link
                    to="/pricing"
                    onClick={toggleMobileMenu}
                    className="hover:text-neutral-600 hover:dark:text-neutral-300"
                  >
                    Tarifs
                  </Link>
                  <Link
                    to="/faq"
                    onClick={toggleMobileMenu}
                    className="hover:text-neutral-600 hover:dark:text-neutral-300"
                  >
                    FAQ
                  </Link>
                  <Link
                    to="/about"
                    onClick={toggleMobileMenu}
                    className="hover:text-neutral-600 hover:dark:text-neutral-300"
                  >
                    À Propos
                  </Link>
                </>
              ) : null}
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={userType === "enterprise"}
                  onChange={handleUserTypeToggle}
                />
                <div
                  className={`relative w-11 h-6 rounded-full transition-colors duration-300 ease-in-out 
                  ${userType === "enterprise" ? "bg-[#67FFCC]" : "bg-[#A78BFA]"}
                  peer-checked:after:translate-x-full peer-checked:bg-[#67FFCC]
                  peer-checked:after:bg-[#67FFCC] peer-checked:after:border-white`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 bg-white border border-gray-300 rounded-full 
                    h-5 w-5 transition-transform duration-300 ease-in-out
                    ${userType === "enterprise" ? "translate-x-5" : ""}
                    peer-checked:translate-x-full`}
                  ></div>
                </div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  {userType === "client"
                    ? "Mode Particulier"
                    : "Mode Professionnel"}
                </span>
              </label>
            </div>
          </div>
        )}
      </div>

      <div className="pt-14"></div>
    </>
  );
};

export default Navbar;