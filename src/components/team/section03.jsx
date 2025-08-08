/* eslint-disable react/no-unescaped-entities */
// Section00.jsx

export default function Section03() {
  return (
    <section className="flex flex-col md:flex-row justify-between max-w-[85vw] mx-auto mb-2 mt-12" id="sectionZero">
      <div className="flex w-3/5 flex-col items-center justify-center gap-8 p-4">
        <div className="flex flex-col justify-center max-w-[1000px]">
          <h3 className="text-3xl md:text-4xl lg:text-4xl mb-8 relative w-fit">
            <span className="text-orange-400 font-semibold">Ma petite entreprise</span>
          </h3>
          <p className="tracking-wide text-sm md:text-base lg:text-lg pb-4 text-gray-300">
          Ma Petite Entreprise est une plateforme innovante dédiée à améliorer la visibilité des petites entreprises et auto-entrepreneurs dans divers secteurs. En mettant en avant des métiers spécialisés souvent relayés par des canaux informels, nous offrons une solution de référencement professionnelle et efficace.
          </p>
          <p className="tracking-wide text-sm md:text-base lg:text-lg pb-4 text-gray-300">
          Notre équipe de développeurs passionnés a conçu cette plateforme avec soin, en tenant compte des besoins des utilisateurs. Chaque membre a contribué à garantir un produit final de haute qualité.
          </p>
          <p className="tracking-wide text-sm md:text-base lg:text-lg pb-4 text-gray-300">
          Nous remercions sincèrement ceux qui utilisent Ma Petite Entreprise pour soutenir les entreprises locales et espérons que la plateforme répondra à vos attentes.
          </p>
        </div>
      </div>
      <div className="flex w-2/5 items-center justify-center p-4">
        <img
          src="https://images.unsplash.com/photo-1578402027014-8adededc0fac?q=80&w=2026&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Description"
          className="max-w-[1000px] w-full rounded-xl"
        />
      </div>
    </section>
  );
}
