import { useState, useEffect } from 'react';
import { FaInstagram, FaSun, FaMoon } from 'react-icons/fa';
import { BsTwitterX } from "react-icons/bs";
const SocialLinks = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('dark-mode') === 'true';
    setIsDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('dark-mode', newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <section className="w-16 h-screen bg-transparent fixed top-0 right-0 flex flex-col justify-center items-center hidden sm:flex">
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-4 dark:text-white text-black hover:text-blue-400 dark:hover:text-blue-400 transition"
        aria-label="Compte X"
        id="twitter-link"
      >
        <BsTwitterX className="text-2xl" />
      </a>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-4 dark:text-white text-black hover:text-blue-400 dark:hover:text-blue-400 transition"
        aria-label="Compte Instagram"
        id="instagram-link"
      >
        <FaInstagram className="text-2xl" />
      </a>
      <button
        onClick={toggleDarkMode}
        className="mb-4 dark:text-white text-black hover:text-yellow-400 dark:hover:text-yellow-400 transition"
        aria-label="Toggle Dark Mode"
        id="dark-mode-toggle"
      >
        {isDarkMode ? <FaSun className="text-2xl" /> : <FaMoon className="text-2xl" />}
      </button>
    </section>
  );
};

export default SocialLinks;
