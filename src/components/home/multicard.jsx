/* eslint-disable react/no-unescaped-entities */
import { AnimatedBeamMultipleOutputDemo } from "./animatedbeammultipleoutputdemo";
import Graph from "./graph";
import Listing from "./listing";
const Dashboard = () => {
  return (
    <div className="grid grid-cols-2 gap-6 p-6 text-white rounded-xl">
      <div className="col-span-2 bg-neutral-900 p-6 rounded-xl shadow-lg flex items-center">
        <div className="flex-grow max-w-[50%] pl-8">
          <h1 className="text-4xl mb-4 font-bold dark:bg-gradient-to-r dark:from-orange-200 dark:to-orange-400 bg-gradient-to-r from-orange-400 to-orange-800 text-transparent bg-clip-text">Pour les entreprises</h1>
          <span className="font-semibold">Ma Petite Entreprise est une plateforme innovante dédiée aux petites entreprises et aux entrepreneurs indépendants. En simplifiant la recherche et la mise en relation, nous aidons les entrepreneurs à accroître leur visibilité et à développer leur clientèle.</span>
        </div>

        <div className="w-1/2">
          <AnimatedBeamMultipleOutputDemo />
        </div>
      </div>
      <div className="bg-neutral-900 p-6 rounded-xl shadow-lg flex flex-col  justify-center pl-12">
        <h2 className="text-2xl mb-4 mt-4 font-bold dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] bg-gradient-to-r from-[#67FFCC] to-black text-transparent bg-clip-text">Dashboard & Data</h2>
        <p className="font-semibold">Dashboard complet avec toutes vos datas.</p>
        <p className="mb-6 font-semibold">Une gestion complète de votre entreprise.</p>
        <div className="w-full flex justify-center">
          <Graph />
        </div>
      </div>

      {/* Inventory Management */}
      <div className="bg-neutral-900 p-6 rounded-xl shadow-lg pl-12">
        <h2 className="text-2xl mb-4 mt-4 font-bold bg-gradient-to-r from-violet-400 to-violet-800 dark:bg-gradient-to-r dark:from-violet-200 dark:to-violet-400 text-transparent bg-clip-text">Nos avantages</h2>
        <p className="font-semibold">Chez MPE plusieurs avantages s'offrent à vous.</p>
        <p className="mb-6 font-semibold">Que ce soit pour la gestion ou l'évolution. </p>
        <div className="w-full flex justify-center">
          <Listing />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
