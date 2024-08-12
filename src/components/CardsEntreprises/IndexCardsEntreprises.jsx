import React from 'react';
import indexcards from '../../../public/assets/img/indexcards.jpg';
import { FaCalendarDay, FaWrench, FaMapMarkerAlt } from 'react-icons/fa';

const IndexCardsEntreprises = ({ entreprise}) => {
  // Utilisez les props pour afficher les données de l'entreprise
  const { name, city, zip_code, job, nextAvailableDate, logo } = entreprise;

  

  return (
    <div className="card card-compact w-auto shadow-xl relative dark:bg-[#262626] dark:text-white light:bg-[#FDE8E8]">
      <div className="rating gap-1 absolute top-0 right-0 p-4">
        <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" />
      </div>
      <figure>
        {/* Utilisez la photo de l'entreprise si disponible */}
        <img src={logo[0] || indexcards} alt={name} className="rounded-3xl" />
      </figure>
      <div className="card-body border-t-4 border-gray-100 border-opacity-20 mt-4">
        <h2 className="card-title">{`${name}`}</h2>

        <div className="flex justify-between gap-4">
          <div className="flex flex-col items-start">
            <div className="flex items-center mb-2">
              <FaCalendarDay className="text-lg mr-2" />
              <span className="text-sm">Prochaine Disponibilité: {nextAvailableDate || 'Non disponible'}</span>  
              
            </div>

            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="text-lg mr-2" />
              <span className="text-sm">{`${city}, ${zip_code}`}</span>
            </div>

            <div className="flex items-center mb-2">
              <FaWrench className="text-lg mr-2" />
              <span className="text-sm">{job.name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexCardsEntreprises;