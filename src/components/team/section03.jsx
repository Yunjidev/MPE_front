/* eslint-disable react/no-unescaped-entities */
export default function Section03() {
  return (
    <section className="flex flex-col md:flex-row justify-between max-w-[85vw] mx-auto mt-12 bg-neutral-950/60 border border-neutral-800 rounded-2xl shadow-xl shadow-black/30 backdrop-blur overflow-hidden">
      
      {/* Texte */}
      <div className="flex flex-col w-full md:w-3/5 items-center justify-center gap-8 p-8">
        <div className="max-w-[900px]">
          <h3 className="text-3xl md:text-4xl font-semibold mb-8 bg-gradient-to-r from-orange-300 to-orange-500 text-transparent bg-clip-text">
            Ma Petite Entreprise
          </h3>
          <p className="tracking-wide text-base lg:text-lg pb-4 text-gray-300">
            Ma Petite Entreprise est une plateforme innovante dédiée à améliorer la visibilité des petites entreprises et auto-entrepreneurs dans divers secteurs.
          </p>
          <p className="tracking-wide text-base lg:text-lg pb-4 text-gray-300">
            Notre équipe de développeurs passionnés a conçu cette plateforme avec soin, en tenant compte des besoins des utilisateurs. Chaque membre a contribué à garantir un produit final de haute qualité.
          </p>
          <p className="tracking-wide text-base lg:text-lg pb-4 text-gray-300">
            Nous remercions sincèrement ceux qui utilisent Ma Petite Entreprise pour soutenir les entreprises locales et espérons que la plateforme répondra à vos attentes.
          </p>
        </div>
      </div>

      {/* Image */}
      <div className="w-full md:w-2/5 p-4 flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1578402027014-8adededc0fac?q=80&w=2026&auto=format&fit=crop"
          alt="Présentation entreprise"
          className="w-full h-auto rounded-xl object-cover border border-neutral-800"
        />
      </div>
    </section>
  );
}
