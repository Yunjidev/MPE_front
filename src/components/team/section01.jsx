/* eslint-disable react/no-unescaped-entities */
import { MdEmail } from 'react-icons/md';
import Team from '../../assets/team.jpg';

export default function Section01() {
  return (
    <section className="flex flex-col md:flex-row justify-between max-w-[85vw] mx-auto mb-2 mt-12" id="sectionZero">
      <div className=" flex flex-col w-3/5 items-center justify-center gap-8 p-4">
        <div className="flex flex-col justify-center max-w-[1000px]">
          <h3 className="text-3xl flex flex-col md:text-4xl lg:text-4xl font-semibold mb-8 relative w-fit">
            <span className="text-orange-400">Qui sommes-nous ?</span>
          </h3>
          <p className="tracking-wide text-sm md:text-base lg:text-lg pb-4 text-gray-300">     
          Nous sommes une entreprise spécialisée dans le développement d'applications et de sites web sur mesure. Nous avons réalisé divers projets, allant des boutiques e-commerce aux sites pour particuliers et entreprises, ainsi que dans le Web3.
          </p>
          <p className="tracking-wide text-sm md:text-base lg:text-lg pb-4 text-gray-300">
          Notre priorité est de fournir un code de qualité, évolutif et facile à maintenir, tout en répondant aux attentes de nos clients. Nous optimisons nos projets en termes de performance, sécurité, accessibilité, et expérience utilisateur.
          </p>
          <p className="tracking-wide text-sm md:text-base lg:text-lg pb-4 text-gray-300">
          Passionnés par notre métier, nous accompagnons nos clients à chaque étape. Pour toute demande de site web, application ou refonte, contactez-nous pour concrétiser vos idées.
          </p>
          <a 
            href="mailto:contactblfdev@gmail.com" 
            className="text-white font-semibold py-2 px-4 rounded-xl text-center border-2 transition duration-300 ease-in-out bg-[#232323] border-gray-600 hover hover:bg-orange-600 shadow-md shadow-none hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center gap-2"
          >
            <MdEmail className="text-lg" />
            Contactez-nous par email
          </a>
        </div>
      </div>
      <div className=" flex w-2/5 items-center justify-center p-4">
        <img
          src={Team}
          alt="Description"
          className="w-full rounded-xl"
        />
      </div>
    </section>
  );
}
