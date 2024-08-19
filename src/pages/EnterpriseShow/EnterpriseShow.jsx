/* eslint-disable no-unused-vars */
// src/pages/EnterpriseShow.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../../services/data-fetch';
import StarRating from '../../components/ShowEnterprise/StarRatings';
import PhotoGallery from '../../components/ShowEnterprise/PhotoGallery';
import EnterpriseDetails from '../../components/ShowEnterprise/EnterpriseDetails';
import OfferList from '../../components/ShowEnterprise/OfferList';
import CommentList from '../../components/ShowEnterprise/CommentList';

const EnterpriseShow = () => {
  const { id } = useParams();
  const [enterprise, setEnterprise] = useState(null);

  const openPopup = (photoUrl) => {
    // Logic to open a popup with the photo
    console.log("Open photo popup:", photoUrl);
  };

  useEffect(() => {
    const fetchEnterprise = async () => {
      try {
        const data = await getData(`enterprise/${id}`);
        console.log(data);
        setEnterprise(data);
      } catch (error) {
        console.error("Error fetching enterprise:", error);
      }
    };

    fetchEnterprise();
  }, [id]);

  if (!enterprise) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 text-white">
      <div className="flex flex-col md:flex-row">
        <PhotoGallery photos={enterprise.photos} openPopup={openPopup} />
        
        <div className="md:w-2/3 flex flex-col justify-between p-6 rounded-lg">
          <EnterpriseDetails enterprise={enterprise} />
          
          <p className="mt-6 text-sm bg-neutral-700 p-4 rounded-lg max-w-72">
            {enterprise.description}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-center text-gray-400">Calendrier à insérer ici</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold dark:bg-gradient-to-r dark:from-orange-200 dark:to-orange-400 bg-gradient-to-r from-orange-400 to-orange-800 text-transparent bg-clip-text mb-4">
          Prestations
        </h2>
        <OfferList offers={enterprise.offers} />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-violet-800 dark:bg-gradient-to-r dark:from-violet-200 dark:to-violet-400 text-transparent bg-clip-text mb-4">
          Commentaires
        </h2>
        <CommentList offers={enterprise.offers} />
      </div>
    </div>
  );
};

export default EnterpriseShow;