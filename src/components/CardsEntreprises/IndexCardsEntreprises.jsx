import React from 'react';
import indexcards from '../../../public/assets/img/indexcards.jpg';
import { FaCalendarDay, FaWrench, FaMapMarkerAlt } from 'react-icons/fa';

const IndexCardsEntreprises = ({ entreprise }) => {
  // Utilisez les props pour afficher les données de l'entreprise
  const { name, prochainRendezVous, villeEtAdresse, servicePropose, photo } = entreprise;

  return (
    <div className="card card-compact bg-base-100 w-64 shadow-xl relative bg-[#262626] text-white">
      <div className="rating gap-1 absolute top-0 right-0 p-4">
        <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" />
      </div>
      <figure>
        {/* Utilisez la photo de l'entreprise si disponible */}
        <img src={photo || indexcards} alt={name} className="rounded-3xl"/>
      </figure>
      <div className="card-body border-t-4 border-gray-100 border-opacity-20 mt-4">
        <h2 className="card-title">{name}</h2>
        
        <div className="flex justify-between gap-4">
          <div className="flex flex-col items-start">
            <div className="flex items-center mb-2">
              <FaCalendarDay className="text-lg mr-2" />
              <span className="text-sm">Prochaine Disponibilité </span>
              <span className="text-sm break-words">{prochainRendezVous}</span>
            </div>

            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="text-lg mr-2" />
              <span className="text-sm">{villeEtAdresse}</span>
            </div>

            <div className="flex items-center mb-2">
              <FaWrench className="text-lg mr-2"/>
              <span className="text-sm">{servicePropose}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexCardsEntreprises;