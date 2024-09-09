/* eslint-disable react/no-unescaped-entities */
const ContactInfo = () => {
  return (
    <div className="p-4">
      <h2 className="bg-gradient-to-r from-green-200 to-green-400 from-violet-400 to-violet-600 text-transparent bg-clip-text text-4xl font-bold">
        Nous contacter
      </h2>
      <p className="mt-2 text-gray-100 text-xl">
        Une question ? Notre équipe de service client est à votre écoute !
        Veuillez dans un premier temps vous assurer que nous n'y avons pas déjà
        répondu dans notre F.A.Q., vous pourrez peut-être obtenir une réponse
        immédiate. Nous vous invitons à remplir le formulaire ci-dessous pour
        toute demande d'information supplémentaire, ou tout problème rencontré
        lors de votre utilisation de notre site. Nous vous répondrons au plus
        vite, généralement sous 24h (hors dimanche et jours fériés).
      </p>
    </div>
  );
};

export default ContactInfo;
