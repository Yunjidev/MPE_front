import React from 'react';
import indexcards from '../../../public/assets/img/indexcards.jpg';
import { FaCalendarDay, FaWrench, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import LikeButton from './LikesForCards/LikeButton';
import './IndexCardsEntreprises.css';

const IndexCardsEntreprises = ({ entreprise, userId }) => {
  // console.log('Entreprise object:', entreprise); // Pour déboguer
  const navigate = useNavigate();
  const { id, name, city, zip_code, job, nextAvailableDate, logo } = entreprise;

  // Affichez la prochaine disponibilité si elle est définie
  const nextDateDisplay = nextAvailableDate
    ? `${nextAvailableDate.date} de ${nextAvailableDate.startHour} à ${nextAvailableDate.endHour}`
    : 'Non disponible';
  
    const jobName = entreprise.job ? entreprise.job.name : 'Métier non spécifié';
  
  const redirectToEnterprisePage = () => {
    navigate(`/enterprise/${entreprise.id}`);
  };

  return (
    <div className="card card-compact w-auto shadow-xl relative dark:bg-[#262626] dark:text-white light:bg-[#FDE8E8] card-hover-zoom" onClick={redirectToEnterprisePage}>
      <div className="rating gap-1 absolute top-0 right-0 p-4">
        <LikeButton userId={userId} enterpriseId={entreprise.id} />
      </div>
      <figure>
        {/* Utilisez la photo de l'entreprise si disponible */}
        <img
          src={logo || indexcards}
          alt={name}
          className="rounded-3xl"
          onError={(e) => e.target.src = indexcards}
        />
      </figure>
      <div className="card-body border-t-4 border-gray-100 border-opacity-20 mt-4">
        <h2 className="card-title">{`${name}`}</h2>

        <div className="flex justify-between gap-4">
          <div className="flex flex-col items-start">
            <div className="flex items-center mb-2">
              <FaCalendarDay className="text-lg mr-2" />
              <span className="text-sm">
                Prochaine Disponibilité: {nextDateDisplay}
              </span>

            </div>

            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="text-lg mr-2" />
              <span className="text-sm">{`${city}, ${zip_code}`}</span>
            </div>

            <div className="flex items-center mb-2">
              <FaWrench className="text-lg mr-2" />
              <span className="text-sm">{jobName}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexCardsEntreprises;