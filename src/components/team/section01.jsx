/* eslint-disable react/no-unescaped-entities */
import { MdEmail } from 'react-icons/md';

export default function Section01() {
  return (
    <section className="flex flex-col md:flex-row justify-between max-w-[85vw] mx-auto mb-[5%] mt-16" id="sectionZero">
      <div className="flex-1 flex flex-col items-center justify-center gap-8 p-4">
        <div className="flex flex-col justify-center max-w-[1000px]">
          <h3 className="text-3xl md:text-4xl lg:text-5xl mb-8 relative w-fit">
            <span className="text-orange-500 font-semibold">Qui sommes-nous ?</span>
            <span className="text-gray-500">L'entreprise</span>
            <span className="block h-1 bg-orange-500 transform scale-x-0 origin-bottom-right transition-transform duration-150 ease-out hover:scale-x-100 origin-bottom-left absolute bottom-0 left-0"></span>
          </h3>
          <p className="tracking-wide text-sm md:text-base lg:text-lg pb-4 dark:text-gray-300 text-gray-700">
            Nous sommes une entreprise de développement web spécialisée dans la création d'applications et de sites web sur mesure. Nous avons eu l'opportunité de travailler sur divers projets, allant des boutiques e-commerce aux sites web pour particuliers et entreprises, en passant par le domaine émergent du Web3.
          </p>
          <p className="tracking-wide text-sm md:text-base lg:text-lg pb-4 dark:text-gray-300 text-gray-700">
            Nous sommes déterminés à fournir un code de haute qualité, évolutif et facile à maintenir. Nous comprenons l'importance d'un développement soigné pour éviter les bugs coûteux et répondre précisément aux attentes de nos clients. Nous mettons un point d'honneur à optimiser nos projets en fonction de plusieurs métriques essentielles : la vitesse de chargement des pages, l'accessibilité, la performance générale de l'application, la sécurité des données, et l'expérience utilisateur.
          </p>
          <p className="tracking-wide text-sm md:text-base lg:text-lg pb-4 mb-8 dark:text-gray-300 text-gray-700">
            Nous sommes passionnés par notre travail et nous engageons à accompagner nos clients tout au long de leur projet. Que vous ayez besoin d'une application web, d'un site internet ou d'une refonte complète de votre plateforme actuelle, nous sommes à votre disposition pour discuter de vos besoins et de vos attentes. N'hésitez pas à nous contacter par message privé pour entamer une collaboration fructueuse et concrétiser vos idées numériques.
          </p>
          <a 
            href="mailto:contactblfdev@gmail.com" 
            className="bg-orange-400 text-black dark:text-white font-semibold py-2 px-4 rounded-xl text-center dark:border-2 transition duration-300 ease-in-out hover:bg-orange-600 dark:bg-[#232323] dark:border-gray-600 dark:hover:bg-neutral-800 shadow-md dark:shadow-none hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center gap-2"
          >
            <MdEmail className="text-lg" />
            Contactez-nous par email
          </a>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <img
          src="https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Description"
          className="max-w-[1000px] w-full rounded-xl"
        />
      </div>
    </section>
  );
}
