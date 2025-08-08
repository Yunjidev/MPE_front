/* eslint-disable react/no-unescaped-entities */
import { AnimatedBeamMultipleOutputDemo } from "../animatedbeamdemo";
import Calendar from "./calendar";
import Listing from "./listingclient";
import glitchSvg from '../../../assets/svgs/glitch.svg';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 text-white rounded-xl">
      {/* Header Card */}
      <div className="col-span-1 md:col-span-2 bg-neutral-900/75 p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center border border-orange-400/50">
        <div className="flex-grow max-w-full md:max-w-[50%] pl-0 md:pl-8">
          <h1 className="text-3xl md:text-4xl mb-4 font-bold bg-gradient-to-r from-orange-200 to-orange-400 text-transparent bg-clip-text ">
            Pour les particuliers
          </h1>
          <span className="font-semibold text-white">
            Ma Petite Entreprise est une plateforme innovante qui facilite la recherche des meilleures petites entreprises et entrepreneurs indépendants. Nous vous aidons à trouver rapidement les services dont vous avez besoin, tout en vous mettant en relation avec des professionnels de confiance autour de chez vous.
          </span>
        </div>

        <div className="w-full md:w-1/2 lg:mt-4 lg:mb-0 -mt-20 -mb-28">
          <AnimatedBeamMultipleOutputDemo />
        </div>
      </div>

      {/* Dashboard & Data */}
      <div className="relative bg-neutral-900/75 p-6 rounded-xl shadow-lg flex flex-col border border-emerald-300/50">
        <div
          className="absolute inset-0 bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${glitchSvg})`,
            backgroundPosition: 'bottom left',
            transform: 'rotate(180deg)',
            opacity: '0.7',
          }}
        ></div>
        <h2 className="relative text-xl md:text-2xl mb-4 mt-4 font-bold bg-gradient-to-r from-emerald-200 to-emerald-400 text-transparent bg-clip-text">
          Recherche & réservation
        </h2>
        <p className="relative text-white font-semibold">Trouvez des entreprises et réservez directement en ligne si elles disposent d'un calendrier intégré.</p>
        <p className="relative text-white mb-6 font-semibold">Sinon, prenez contact pour réserver votre service directement avec l'entreprise.</p>

        <div className="relative w-full flex justify-center mt-4">
          <Calendar />
        </div>
      </div>

      {/* Inventory Management */}
      <div className="relative bg-neutral-900/75 p-6 rounded-xl shadow-lg flex flex-col border border-violet-400/50">
        <div
          className="absolute inset-0 bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${glitchSvg})`,
            backgroundPosition: 'bottom right',
            opacity: '0.7',
          }}
        ></div>
        <h2 className="relative text-xl md:text-2xl mb-4 mt-4 font-bold bg-gradient-to-r from-violet-200 to-violet-400 text-transparent bg-clip-text">
          Nos avantages
        </h2>
        <p className="relative text-white font-semibold">Chez MPE plusieurs avantages s'offrent à vous.</p>
        <p className="relative text-white mb-6 font-semibold">Que ce soit pour la recherche ou mise en relation</p>
        <div className="relative text-white w-full flex justify-center mt-4">
          <Listing />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
