/* eslint-disable react/no-unescaped-entities */
// Section00.jsx

export default function Section02() {
  return (
    <section className="flex flex-col md:flex-row justify-between mx-auto mb-2 mt-12" id="sectionZero">
      <div className="flex w-3/5 flex-col items-center justify-center gap-8 p-4 md:flex-row md:order-2">
        <div className="flex flex-col justify-center max-w-[1000px]">
          <h3 className="text-3xl md:text-4xl lg:text-4xl mb-8 relative w-fit">
            <span className="text-orange-400 font-semibold">Nos Développeurs</span>
          </h3>
          <p className="tracking-wide text-sm md:text-base lg:text-lg pb-4 text-gray-300">
            
Notre équipe se compose de développeurs passionnés et qualifiés, chacun apportant une expertise unique sur plusieurs langages de programmation.
          </p>
          <p className="tracking-wide text-sm md:text-base lg:text-lg pb-4 text-gray-300">
          Formés notamment par  <a href="https://www.thehackingproject.org/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">The Hacking Project</a>, une formation intensive axée sur des projets concrets, nous avons acquis des compétences solides en développement web et sommes prêts à relever des défis techniques complexes.
          </p>
          <p className="tracking-wide text-sm md:text-base lg:text-lg pb-4 text-gray-300">
            Cette diversité nous permet de créer des solutions complètes et adaptées à chaque projet. La collaboration et le partage de connaissances sont essentiels pour garantir des produits numériques innovants et de haute qualité.
          </p>
        </div>
      </div>
      <div className="flex w-2/5 items-center justify-center p-4 md:flex-col md:items-center md:order-1">
        <img
          src="https://images.unsplash.com/photo-1609921212029-bb5a28e60960?q=80&w=2052&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Équipe de développeurs en réunion"
          className="max-w-[1000px] w-full rounded-xl"
        />
      </div>
    </section>
  );
}
