import { HiSearch } from "react-icons/hi";


const IndexSearchbarEntreprises = () => {

return (
<div className="join pt-8 pb-10 rounded-full flex items-center justify-center">
  
  <select className="select select-bordered join-item w-48 rounded-full">
    <option disabled selected>Catégories</option>
    <option>Aéronautique - Espace - Spatial</option>
    <option>Agriculture - Agroalimentaire - Pêche</option>
    <option>Artisanat</option>
    <option>Audiovisuel - Cinéma - Animation</option>
    <option>Audit - Comptabilité - Conseil - Gestion</option>
    <option>Automobile</option>
    <option>Banque - Assurance - Finance</option>
    <option>Bâtiment - Travaux publics - Architecture - Construction</option>
    <option>Biologie - Chimie - Pharmacie</option>
    <option>Commerce - Distribution - Vente - e-commerce</option>
    <option>Communication - Relations publiques - Lobbying</option>
    <option>Création - Métiers d'art - Art - Design</option>
    <option>Culture - Patrimoine</option>
    <option>Cybersécurité</option>
    <option>Défense - Sécurité - Armée</option>
    <option>Documentation - Bibliothèque - Gestion de l'info - Gestion de BDD</option>
    <option>Droit - Juridique - Justice - Notariat - Avocat</option>
    <option>Édition - Livre - Librairie</option>
    <option>Enseignement - Éducation</option>
    <option>Environnement - Climat - Écologie</option>
    <option>Événementiel - Foire- Salons - Congrès</option>
    <option>Ferroviaire</option>
    <option>Fonction publique - Secteur public - Administration - Diplomatie</option>
    <option>Hôtellerie - Restauration</option>
    <option>Humanitaire - Economie sociale et solidaire - ONG</option>
    <option>Immobilier</option>
    <option>Industrie - Energie - Production - Robotique</option>
    <option>Informatique - Digital - Télécoms - Web - Numérique - Réseaux</option>
    <option>Jeux vidéo</option>
    <option>Journalisme - Information - Audiovisuel</option>
    <option>Langues</option>
    <option>Luxe</option>
    <option>Marketing - Publicité</option>
    <option>Médical - Santé - Hôpital - Soins</option>
    <option>Mode - Textile - Habillement - Couture</option>
    <option>Paramédical - Soins</option>
    <option>Propreté et services associés - Eau - Assainissement - Gestion déchets</option>
    <option>Psychologie</option>
    <option>Ressources humaines - RH</option>
    <option>Sciences humaines et sociales – SHS</option>
    <option>Secrétariat - Assistanat</option>
    <option>Social - Services à la personne - Aide à domicile</option>
    <option>Spectacle - Métiers de la scène</option>
    <option>Sport - Loisirs - Sport professionnel - Management du sport</option>
    <option>Tourisme - Hôtellerie de plein air</option>
    <option>Transport-Logistique - Mobilité - Navigation</option>
  </select>
  <select className="select select-bordered join-item w-48">
    <option disabled selected>Région</option>
    <option>Auvergne-Rhône-Alpes</option>
    <option>Bourgogne-Franche-Comté</option>
    <option>Bretagne</option>
    <option>Centre-Val de Loire</option>
    <option>Corse</option>
    <option>Grand Est</option>
    <option>Hauts-de-France</option>
    <option>Île-de-France</option>
    <option>Normandie</option>
    <option>Nouvelle-Aquitaine</option>
    <option>Occitanie</option>
    <option>Pays de la Loire</option>
    <option>Provence-Alpes-Côte d'Azur</option>
    {/* <!-- Régions d'outre-mer --> */}
    <option>Guadeloupe</option>
    <option>Martinique</option>
    <option>Guyane</option>
    <option>La Réunion</option>
    <option>Mayotte</option>
</select>
  <select className="select select-bordered join-item w-48">
    <option disabled selected>Ville</option>
    
  </select>
  <select className="select select-bordered join-item">
    <option disabled selected>Premium</option>    
  </select>
  <select className="select select-bordered join-item">
    <option disabled selected>Prix</option>
    <option>Moins cher</option>
    <option>Plus cher</option>
    
  </select>
  <div className="indicator">
    
    <button className="btn join-item"><HiSearch /></button>
  </div>
</div>
);
};

export default IndexSearchbarEntreprises;