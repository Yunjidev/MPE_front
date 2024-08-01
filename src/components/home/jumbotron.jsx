import image from '../../assets/image.png'
import proparticul from '../../assets/proparticul.png'
import proparticul2 from '../../assets/proparticul2.png'

const Jumbotron = ({ isDarkMode }) => {
    return (
    <div className="container mx-auto flex flex-col lg:flex-row items-center py-8 px-4 lg:py-16">
        <div className="text-container text-center lg:text-left lg:mr-8">
            <img src={isDarkMode ? proparticul : proparticul2} alt='proparticul' />
            <p className=" text-4xl dark:bg-gradient-to-r dark:from-orange-200 dark:to-orange-400 bg-gradient-to-r from-orange-400 to-orange-800  text-transparent bg-clip-text">Développez votre activité locale.</p>
            <p className="mb-8 text-4xl bg-gradient-to-r from-violet-400 to-violet-800 dark:bg-gradient-to-r darkf:rom-violet-200 dark:to-violet-400 text-transparent bg-clip-text">Des professionnels près de chez vous.</p>
            <p className='mt-8 dark:text-neutral-200 text-black'>La plateforme idéale pour connecter les petites entreprises locales avec les clients à la recherche de leurs services.</p>

            <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center lg:justify-start sm:space-y-0">
                <a href="#" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                    Get started
                    <svg class="w-3.5 h-3.5 ml-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
                <a href="#" class="py-3 px-5 sm:ml-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                    Learn more
                </a>  
            </div>
        </div>
        <div class="image-container mt-8 lg:mt-0 lg:ml-8">
            <img src={image} alt="placeholder logo" class="w-full lg:w-auto lg:max-w-md" />
        </div>
    </div>

    );
}


export default Jumbotron;



