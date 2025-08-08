/* eslint-disable react-refresh/only-export-components */
import DropdownMenu from './DropdownMenu';

const FAQ = () => {
  const questions = [
    {
      category: "Création de profil et inscription",
      items: [
        {
          question: "Comment puis-je créer un compte sur Ma petite entreprise ?",
          answer: "Pour créer un compte, cliquez sur 'S'inscrire' en haut à droite de la page d'accueil. Remplissez les informations nécessaires et confirmez votre adresse e-mail. Vous pourrez ensuite accéder à tous les services de la plateforme."
        },
        {
          question: "Comment puis-je publier une annonce ?",
          answer: "Après avoir créé votre compte, connectez-vous et cliquez sur 'Publier une annonce'. Suivez les instructions pour décrire le service ou l'accessoire que vous souhaitez proposer. Ajoutez des photos et des détails pour attirer les autres membres de la communauté."
        }
      ]
    },
    {
      category: "Gestion des projets",
      items: [
        {
          question: "Comment puis-je modifier ou supprimer mon annonce ?",
          answer: "Pour modifier ou supprimer votre annonce, connectez-vous à votre compte et allez dans la section 'Mes annonces'. Vous pourrez y apporter les modifications nécessaires ou supprimer l'annonce si vous le souhaitez."
        }
      ]
    },
    {
      category: "Recherche et sélection",
      items: [
        {
          question: "Quels types de services puis-je trouver sur Ma petite entreprise ?",
          answer: "Sur Ma petite entreprise, vous pouvez trouver une variété de services pour vos projets, tels que le développement web, le marketing, la comptabilité, et bien plus encore. Vous pouvez également acheter, vendre ou donner des accessoires et des équipements pour entreprises."
        }
      ]
    },
    {
      category: "Paiements et facturation",
      items: [
        {
          question: "Comment fonctionne le système de paiement ?",
          answer: "Le paiement des services et des articles se fait directement entre les utilisateurs via notre plateforme sécurisée en utilisant Stripe. Nous vous recommandons fortement d'effectuer toutes les transactions par l'intermédiaire de notre service de paiement intégré pour garantir la sécurité. Assurez-vous également de vérifier les évaluations des autres utilisateurs avant de finaliser une transaction."
        }
      ]
    },
    {
      category: "Évaluation et retours d'expérience",
      items: [
        {
          question: "Puis-je laisser des avis sur les services et les articles ?",
          answer: "Oui, après avoir utilisé un service ou acheté un article, vous pouvez laisser un avis sur le profil du prestataire ou du vendeur. Les avis aident à maintenir la qualité des offres sur Ma petite entreprise et à créer une communauté de confiance."
        }
      ]
    },
    {
      category: "Support et assistance",
      items: [
        {
          question: "Comment puis-je contacter le service client de Ma petite entreprise ?",
          answer: "Vous pouvez contacter notre service client en utilisant le formulaire de contact disponible sur notre site ou en envoyant un e-mail à support@mapetiteentreprise.fr. Notre équipe vous répondra dans les plus brefs délais."
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col items-center py-12 px-4 bg-black-900">
      <p className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-violet-800 text-transparent bg-clip-text mb-8 bg-gradient-to-r from-white to-violet-400">
        Des Questions ?
      </p>
      <p className="lg:text-2xl text-xl text-center font-semibold text-white mb-8">
        La FAQ est là pour ça. Si tu ne trouves pas ta réponse, contacte nous !
      </p>
      <div className="w-full max-w-4xl space-y-6">
        {questions.map((section, index) => (
          <DropdownMenu key={index} category={section.category} items={section.items} />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
