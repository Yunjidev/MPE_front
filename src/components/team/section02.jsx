/* eslint-disable react/no-unescaped-entities */
export default function Section02() {
  return (
    <section className="flex flex-col md:flex-row justify-between max-w-[85vw] mx-auto mt-12 bg-neutral-950/60 border border-neutral-800 rounded-2xl shadow-xl shadow-black/30 backdrop-blur overflow-hidden">
      
      {/* Image */}
      <div className="w-full md:w-2/5 p-4 flex items-center justify-center order-1 md:order-1">
        <img
          src="https://images.unsplash.com/photo-1609921212029-bb5a28e60960?q=80&w=2052&auto=format&fit=crop"
          alt="Équipe en réunion"
          className="w-full h-auto rounded-xl object-cover border border-neutral-800"
        />
      </div>

      {/* Texte */}
      <div className="flex flex-col w-full md:w-3/5 items-center justify-center gap-8 p-8 order-2">
        <div className="max-w-[900px]">
          <h3 className="text-3xl md:text-4xl font-semibold mb-8 bg-gradient-to-r from-orange-300 to-orange-500 text-transparent bg-clip-text">
            Nos Développeurs
          </h3>
          <p className="tracking-wide text-base lg:text-lg pb-4 text-gray-300">
            Notre équipe se compose de développeurs passionnés et qualifiés, chacun apportant une expertise unique sur plusieurs langages de programmation.
          </p>
          <p className="tracking-wide text-base lg:text-lg pb-4 text-gray-300">
            Formés notamment par <a href="https://www.thehackingproject.org/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">The Hacking Project</a>, nous avons acquis des compétences solides en développement web et sommes prêts à relever des défis techniques complexes.
          </p>
          <p className="tracking-wide text-base lg:text-lg pb-4 text-gray-300">
            Cette diversité nous permet de créer des solutions complètes et adaptées à chaque projet. La collaboration et le partage de connaissances sont essentiels pour garantir des produits numériques innovants et de haute qualité.
          </p>
        </div>
      </div>
    </section>
  );
}
