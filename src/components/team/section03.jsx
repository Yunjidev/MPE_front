/* eslint-disable react/no-unescaped-entities */
// Section00.jsx

export default function Section03() {
  return (
    <section className="flex flex-col md:flex-row justify-between max-w-[85vw] mx-auto mb-[5%] mt-16" id="sectionZero">
      <div className="flex-1 flex flex-col items-center justify-center gap-8 p-4">
        <div className="flex flex-col justify-center max-w-[1000px]">
          <h3 className="text-3xl md:text-4xl lg:text-5xl mb-8 relative w-fit">
            <span className="text-orange-500 font-semibold">Ma petite entreprise</span>
            <br />
            MPE
            <span className="block h-1 bg-orange-500 transform scale-x-0 origin-bottom-right transition-transform duration-150 ease-out hover:scale-x-100 origin-bottom-left absolute bottom-0 left-0"></span>
          </h3>
          <p className="tracking-wide text-sm md:text-base font-semibold lg:text-lg pb-4 dark:text-gray-300 text-gray-700">
            Ma Petite Entreprise est une plateforme innovante conçue pour offrir une visibilité accrue aux petites entreprises et aux auto-entrepreneurs dans divers secteurs. En mettant en avant des professions spécialisées qui souvent dépendent de canaux informels pour trouver des clients, nous visons à fournir une solution de référencement efficace et professionnelle.
          </p>
          <p className="tracking-wide text-sm md:text-base font-semibold lg:text-lg pb-4 dark:text-gray-300 text-gray-700">
            L'équipe derrière Ma Petite Entreprise est composée de développeurs passionnés et expérimentés. Nous avons conçu et développé cette plateforme avec une attention particulière aux détails et aux besoins spécifiques des utilisateurs. Chaque membre de notre équipe a contribué avec ses compétences uniques pour garantir un produit final de haute qualité.
          </p>
          <p className="tracking-wide text-sm md:text-base font-semibold lg:text-lg pb-4 mb-8 dark:text-gray-300 text-gray-700">
            Nous tenons à exprimer notre sincère gratitude à tous ceux qui utilisent Ma Petite Entreprise pour découvrir et soutenir les petites entreprises locales. Nous espérons que vous trouverez la plateforme facile à utiliser et que vous bénéficierez pleinement de ses fonctionnalités pour trouver des services adaptés à vos besoins.
          </p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <img
          src="https://images.unsplash.com/photo-1578402027014-8adededc0fac?q=80&w=2026&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Description"
          className="max-w-[1000px] w-full rounded-xl"
        />
      </div>
    </section>
  );
}
