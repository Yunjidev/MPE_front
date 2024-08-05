/* eslint-disable react/no-unescaped-entities */
// Section00.jsx

export default function Section02() {
  return (
    <section className="flex flex-col md:flex-row justify-between max-w-[85vw] mx-auto mb-[5%] mt-16" id="sectionZero">
      <div className="flex-1 flex flex-col items-center justify-center gap-8 p-4 md:flex-row md:order-2">
        <div className="flex flex-col justify-center max-w-[1000px]">
          <h3 className="text-3xl md:text-4xl lg:text-5xl mb-8 relative w-fit">
            <span className="text-orange-500 font-semibold">Nos Développeurs</span>
            <br />
            Formation & équipe
            <span className="block h-1 bg-orange-500 transform scale-x-0 origin-bottom-right transition-transform duration-150 ease-out hover:scale-x-100 origin-bottom-left absolute bottom-0 left-0"></span>
          </h3>
          <p className="tracking-wide text-sm md:text-base font-semibold lg:text-lg pb-4 dark:text-gray-300 text-gray-700">
            Notre équipe est composée de plusieurs développeurs passionnés et hautement qualifiés. Chaque membre de notre équipe apporte une expertise unique dans des domaines variés et sur plusieurs langages de programmation.
          </p>
          <p className="tracking-wide text-sm md:text-base font-semibold lg:text-lg pb-4 dark:text-gray-300 text-gray-700">
            Nos développeurs ont bénéficié de formations rigoureuses et reconnues, notamment <a href="https://www.thehackingproject.org/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">The Hacking Project</a>. Cette formation intensive et collaborative nous a permis d'acquérir des compétences pointues en développement web, tout en nous plongeant dans des projets concrets et réalistes. Grâce à cette formation, nous sommes parfaitement outillés pour relever les défis techniques les plus exigeants.
          </p>
          <p className="tracking-wide text-sm md:text-base font-semibold lg:text-lg pb-4 mb-8 dark:text-gray-300 text-gray-700">
            Cette diversité nous permet de travailler sur une large gamme de projets, offrant des solutions complètes et adaptées aux besoins spécifiques de nos clients. La collaboration et le partage de connaissances sont au cœur de notre approche, garantissant ainsi la réalisation de produits numériques de haute qualité et innovants.
          </p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-4 md:flex-col md:items-center md:order-1">
        <img
          src="https://images.unsplash.com/photo-1609921212029-bb5a28e60960?q=80&w=2052&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Équipe de développeurs en réunion"
          className="max-w-[1000px] w-full rounded-xl"
        />
      </div>
    </section>
  );
}
