/* eslint-disable react/no-unescaped-entities */
import { AnimatedBeamMultipleOutputDemo } from "./animatedbeamdemo";
import OrigamiAnim from "../../components/OrigamiAnim/OrigamiAnim";

const PresentationEnterprise = () => {
  return (
    <>
      <div className="flex items-center lg:flex-row flex-col">
        <AnimatedBeamMultipleOutputDemo className="lg:w-2/3 w-full lg:mr-16" />
        <div className="lg:w-1/2 lg:mr-16 dark:text-neutral-300">
          <h2 className="dark:bg-gradient-to-r dark:from-green-200 dark:to-green-400 bg-gradient-to-r from-green-400 to-green-800 text-transparent bg-clip-text text-black text-3xl font-bold sm:text-4xl text-center mb-9">
            Le Concept
          </h2>
          <p className="text-center font-semibold">
            Ma Petite Entreprise est une plateforme innovante dédiée aux petites entreprises et aux entrepreneurs indépendants. En simplifiant la recherche et la mise en relation, nous aidons les entrepreneurs à accroître leur visibilité et à développer leur clientèle. Que vous soyez un particulier à la recherche d'un service spécifique ou un entrepreneur souhaitant élargir votre portée, MPE est l'outil idéal pour vous.
          </p>
        </div>
      </div>

      <div className="flex items-center lg:flex-row flex-col-reverse">
        <div className="lg:w-1/2 lg:mr-16 dark:text-neutral-300 flex flex-col justify-center">
          <h2 className="text-black text-3xl font-bold sm:text-4xl text-center mb-9 bg-gradient-to-r from-violet-400 to-violet-800 dark:bg-gradient-to-r dark:from-violet-200 dark:to-violet-400 text-transparent bg-clip-text">
            Notre Mission
          </h2>
          <p className="text-center font-semibold">
            Notre mission est de connecter les professionnels locaux avec les particuliers à la recherche de services de qualité près de chez eux. Chaque entreprise a sa propre page dédiée où les utilisateurs peuvent découvrir les services offerts, les tarifs, et des photos de leurs réalisations. Cette approche personnalisée aide les clients potentiels à faire un choix éclairé en trouvant le professionnel qui correspond le mieux à leurs besoins.
          </p>
        </div>
        <div className="lg:w-2/3 w-full lg:ml-16 flex justify-center items-center">
          <OrigamiAnim />
        </div>
      </div>
    </>
  );
};

export default PresentationEnterprise;
