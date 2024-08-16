/* eslint-disable react/no-unescaped-entities */
import { AnimatedBeamMultipleOutputDemo } from "../animatedbeamdemo";
import Calendar from "./calendar";
import Listing from "./listingclient";
import glitchSvg from '../../../assets/svgs/glitch.svg';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 text-white rounded-xl">
      {/* Header Card */}
      <div className="col-span-1 md:col-span-2 bg-neutral-900 p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center">
        <div className="flex-grow max-w-full md:max-w-[50%] pl-0 md:pl-8">
          <h1 className="text-3xl md:text-4xl mb-4 font-bold dark:bg-gradient-to-r dark:from-orange-200 dark:to-orange-400 bg-gradient-to-r from-orange-400 to-orange-800 text-transparent bg-clip-text">
            Pour les particuliers
          </h1>
          <span className="font-semibold">
            Ma Petite Entreprise est une plateforme innovante qui facilite la recherche des meilleures petites entreprises et entrepreneurs indépendants. Nous vous aidons à trouver rapidement les services dont vous avez besoin, tout en vous mettant en relation avec des professionnels de confiance autour de chez vous.
          </span>
        </div>

        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <AnimatedBeamMultipleOutputDemo />
        </div>
      </div>

      {/* Dashboard & Data */}
      <div className="relative bg-neutral-900 p-6 rounded-xl shadow-lg flex flex-col">
        <div
          className="absolute inset-0 bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${glitchSvg})`,
            backgroundPosition: 'bottom left',
            transform: 'rotate(180deg)',
          }}
        ></div>
        <h2 className="relative text-xl md:text-2xl mb-4 mt-4 font-bold dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] bg-gradient-to-r from-[#67FFCC] to-black text-transparent bg-clip-text">
          Recherche & réservation
        </h2>
        <p className="relative font-semibold">Trouvez des entreprises et réservez directement en ligne si elles disposent d'un calendrier intégré.</p>
        <p className="relative mb-6 font-semibold">Sinon, prenez contact pour réserver votre service directement avec l'entreprise.</p>

        <div className="relative w-full flex justify-center mt-4">
          <Calendar />
        </div>
      </div>

      {/* Inventory Management */}
      <div className="relative bg-neutral-900 p-6 rounded-xl shadow-lg flex flex-col">
        <div
          className="absolute inset-0 bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${glitchSvg})`,
            backgroundPosition: 'bottom right',
          }}
        ></div>
        <h2 className="relative text-xl md:text-2xl mb-4 mt-4 font-bold bg-gradient-to-r from-violet-400 to-violet-800 dark:bg-gradient-to-r dark:from-violet-200 dark:to-violet-400 text-transparent bg-clip-text">
          Nos avantages
        </h2>
        <p className="relative font-semibold">Chez MPE plusieurs avantages s'offrent à vous.</p>
        <p className="relative mb-6 font-semibold">Que ce soit pour la recherche ou mise en relation</p>
        <div className="relative w-full flex justify-center mt-4">
          <Listing />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
