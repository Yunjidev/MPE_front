/* eslint-disable react/no-unescaped-entities */
import { AnimatedBeamMultipleOutputDemo } from "./animatedbeammultipleoutputdemo";

const PresentationEnterprise = () => {
  return (
    <>
      <div className="flex items-center lg:flex-row flex-col">
        <AnimatedBeamMultipleOutputDemo className="lg:w-2/3 w-full lg:mr-16" />
        <div className="lg:w-1/2 lg:mr-16 dark:text-neutral-300">
          <h2 className="dark:bg-gradient-to-r dark:from-green-200 dark:to-[#67FFCC] bg-gradient-to-r from-green-400 to-green-800 text-transparent bg-clip-text text-black text-3xl font-bold sm:text-4xl text-center mb-9">
            Le Concept
          </h2>
          <p className="font-semibold">
            Ma Petite Entreprise est une plateforme innovante dédiée aux petites entreprises et aux entrepreneurs indépendants. En simplifiant la recherche et la mise en relation, nous aidons les entrepreneurs à accroître leur visibilité et à développer leur clientèle. Que vous soyez un particulier à la recherche d'un service spécifique ou un entrepreneur souhaitant élargir votre portée, MPE est l'outil idéal pour vous.
          </p>
        </div>
      </div>
    </>
  );
};

export default PresentationEnterprise;
