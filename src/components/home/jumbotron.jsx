/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import image from '../../assets/image.png'
import proparticul from '../../assets/proparticul.png'
import { Link } from 'react-router-dom';
import { MdOutlineRocketLaunch } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";

const Jumbotron = ({ isDarkMode }) => {
    return (
        <div className="container mx-auto my-16 flex flex-col lg:flex-row items-center py-8 px-4 lg:py-16">
            <div className="text-container text-center lg:text-left lg:mr-8">
                <img src={proparticul} alt='proparticul' />
                <p className="text-4xl dark:bg-gradient-to-r dark:from-orange-200 dark:to-orange-400 bg-gradient-to-r from-orange-400 to-orange-800 text-transparent bg-clip-text">Développez votre activité locale.</p>
                <p className="mb-8 text-4xl bg-gradient-to-r from-violet-400 to-violet-800 dark:bg-gradient-to-r dark:from-violet-200 dark:to-violet-400 text-transparent bg-clip-text">Des professionnels près de chez vous.</p>
                <p className='mt-8 dark:text-neutral-200 text-black'>La plateforme idéale pour connecter les petites entreprises locales avec les clients à la recherche de leurs services.</p>

                <div className="flex flex-col mt-8 space-y-4 sm:flex-row sm:justify-center lg:justify-start sm:space-y-0">
                    <button className="flex dark:bg-gradient-to-r dark:from-green-200 dark:to-green-400 bg-gradient-to-r from-green-400 to-green-800 text-transparent bg-clip-text items-center justify-center w-44 h-12 mr-2 border border-neutral-300 font-bold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                        <MdOutlineRocketLaunch className="text-gray-800 dark:text-gray-100 w-8 h-8 mr-4" />
                        Découvrir
                    </button>
                    <button className="flex dark:bg-gradient-to-r dark:from-green-200 dark:to-green-400 bg-gradient-to-r from-green-400 to-green-800 text-transparent bg-clip-text items-center justify-center w-44 h-12 mr-2 border border-neutral-300 font-bold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                        <FaUserPlus className="text-gray-800 dark:text-gray-100 w-8 h-8 mr-4" />
                        <Link to="/signup">S'inscrire</Link>
                    </button>
                </div>
            </div>
            <div className="image-container mt-8 lg:mt-0 lg:ml-8">
                <img src={image} alt="placeholder logo" className="w-full lg:w-auto lg:max-w-md" />
            </div>
        </div>
    );
}

export default Jumbotron;
