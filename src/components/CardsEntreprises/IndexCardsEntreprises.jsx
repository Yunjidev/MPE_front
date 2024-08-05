import React from 'react';
import indexcards from '../../../public/assets/img/indexcards.jpg';
import { FaCalendarDay, FaWrench, FaMapMarkerAlt } from 'react-icons/fa';



const IndexCardsEntreprises = () => {

const prochainRendezVous = "20 Septembre 2024";
const villeEtAdresse = "123 Rue de Lyon, 69000 Lyon";
const servicePropose = "Petits bricolages et travaux de rénovation";


return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl relative bg-[#262626] text-white">
      <div className="rating gap-1 absolute top-0 right-0 p-4">
        <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" />
      </div>
      <figure>
        <img src={indexcards} alt="indexcards" className="rounded-3xl"/>
      </figure>
      <div className="card-body">
        <h2 className="card-title">Multi-Travaux Services</h2>
        
        <div className="flex justify-between gap-4">
          <div className="flex flex-col items-start">
            <div className="flex items-center mb-2">
              <FaCalendarDay className="text-lg mr-2" />
              <span className="text-sm">Prochaine Disponibilité :</span>
            
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