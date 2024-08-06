import image from '../../assets/image.png'
import proparticul from '../../assets/proparticul.png'
import { Link } from 'react-router-dom';
import { MdOutlineRocketLaunch } from "react-icons/md";

const Jumbotron = ({ isDarkMode }) => {
    return (
    <div className="container mx-auto my-16 flex flex-col lg:flex-row items-center py-8 px-4 lg:py-16">
        <div className="text-container text-center lg:text-left lg:mr-8">
            <img src={proparticul} alt='proparticul' />
            <p className=" text-4xl dark:bg-gradient-to-r dark:from-orange-200 dark:to-orange-400 bg-gradient-to-r from-orange-400 to-orange-800  text-transparent bg-clip-text">Développez votre activité locale.</p>
            <p className="mb-8 text-4xl bg-gradient-to-r from-violet-400 to-violet-800 dark:bg-gradient-to-r dark:from-violet-200 dark:to-violet-400 text-transparent bg-clip-text">Des professionnels près de chez vous.</p>
            <p className='mt-8 dark:text-neutral-200 text-black'>La plateforme idéale pour connecter les petites entreprises locales avec les clients à la recherche de leurs services.</p>

            <div class="flex flex-col mt-8 space-y-4 sm:flex-row sm:justify-center mt-4 lg:justify-start sm:space-y-0">
                <button className="flex dark:bg-gradient-to-r dark:from-green-200 dark:to-green-400 bg-gradient-to-r from-green-400 to-green-800  text-transparent bg-clip-text items-center justify-center w-44 h-12 mr-2 border border-neutral-300 font-semibold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                <MdOutlineRocketLaunch className="text-gray-800 dark:text-gray-100 w-8 h-8" />
                        Découvrir
                </button>
                <button className="flex dark:bg-gradient-to-r dark:from-green-200 dark:to-green-400 bg-gradient-to-r from-green-400 to-green-800  text-transparent bg-clip-text items-center justify-center w-44 h-12 mr-2 border border-white font-semibold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                    <svg width="25" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg" className='mr-2'>
                        <path d="M23.25 6.88889L21.0645 9.31722L25.0635 13.7778H9.3V17.2222H25.0635L21.0645 21.6656L23.25 24.1111L31 15.5M3.1 3.44444H15.5V0H3.1C1.395 0 0 1.55 0 3.44444V27.5556C0 29.45 1.395 31 3.1 31H15.5V27.5556H3.1V3.44444Z" fill="white"/>
                    </svg>
                    <Link to="/signup">S'inscrire</Link>
                </button>
            </div>
        </div>
        <div class="image-container mt-8 lg:mt-0 lg:ml-8">
            <img src={image} alt="placeholder logo" class="w-full lg:w-auto lg:max-w-md" />
        </div>
    </div>
    );
}


export default Jumbotron;



