/* eslint-disable react/no-unescaped-entities */
import { MdEmail } from 'react-icons/md';
import TeamImg from '../../assets/team.jpg';

export default function Section01() {
  return (
    <section className="flex flex-col md:flex-row justify-between max-w-[85vw] mx-auto mt-12 bg-neutral-950/60 border border-neutral-800 rounded-2xl shadow-xl shadow-black/30 backdrop-blur overflow-hidden">
      
      {/* Texte */}
      <div className="flex flex-col w-full md:w-3/5 items-center justify-center gap-8 p-8">
        <div className="max-w-[900px]">
          <h3 className="text-3xl md:text-4xl font-semibold mb-8 bg-gradient-to-r from-orange-300 to-orange-500 text-transparent bg-clip-text">
            Qui sommes-nous ?
          </h3>
          <p className="tracking-wide text-base lg:text-lg pb-4 text-gray-300">     
            Nous sommes une entreprise spécialisée dans le développement d'applications et de sites web sur mesure. Nous avons réalisé divers projets, allant des boutiques e-commerce aux sites pour particuliers et entreprises, ainsi que dans le Web3.
          </p>
          <p className="tracking-wide text-base lg:text-lg pb-4 text-gray-300">
            Notre priorité est de fournir un code de qualité, évolutif et facile à maintenir, tout en répondant aux attentes de nos clients. Nous optimisons nos projets en termes de performance, sécurité, accessibilité, et expérience utilisateur.
          </p>
          <p className="tracking-wide text-base lg:text-lg pb-4 text-gray-300">
            Passionnés par notre métier, nous accompagnons nos clients à chaque étape. Pour toute demande de site web, application ou refonte, contactez-nous pour concrétiser vos idées.
          </p>
          <a 
            href="mailto:contactblfdev@gmail.com" 
            className="inline-flex items-center gap-2 text-white font-semibold py-2 px-4 rounded-xl border border-gray-600 bg-neutral-900 hover:bg-orange-600 transition-all shadow-md hover:scale-105"
          >
            <MdEmail className="text-lg" />
            Contactez-nous par email
          </a>
        </div>
      </div>

      {/* Image */}
      <div className="w-full md:w-2/5 p-4 flex items-center justify-center">
        <img
          src={TeamImg}
          alt="Notre équipe"
          className="w-full h-auto rounded-xl object-cover border border-neutral-800"
        />
      </div>
    </section>
  );
}
