import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../../services/data-fetch';
import PhotoGallery from '../../components/ShowEnterprise/PhotoGallery';
import EnterpriseDetails from '../../components/ShowEnterprise/EnterpriseDetails';
import OfferList from '../../components/ShowEnterprise/OfferList';
import CommentList from '../../components/ShowEnterprise/CommentList';

const EnterpriseShow = () => {
  const { id } = useParams();
  const [enterprise, setEnterprise] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

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

  const openPopup = (photo) => {
    setSelectedPhoto(photo);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedPhoto(null);
  };

  if (!enterprise) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 mt-12 text-white">
      <div className="flex flex-col md:flex-row">
        <PhotoGallery photos={enterprise.photos} openPopup={openPopup} />

        <div className="md:w-2/3 flex flex-col ">
          <EnterpriseDetails enterprise={enterprise} />

          {/* Affichage de la description avec dangerouslySetInnerHTML */}
          <p
            className="text-sm bg-neutral-700 p-4 rounded-xl"
            dangerouslySetInnerHTML={{ __html: enterprise.description }}
          />
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-center text-gray-400">Calendrier à insérer ici</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-4xl text-center font-bold bg-gradient-to-r from-white to-violet-400 text-transparent bg-clip-text mb-12">
          Prestations
        </h2>
        <OfferList offers={enterprise.offers} />
      </div>

      <div className="mt-8">
        <h2 className="text-4xl text-center font-bold bg-gradient-to-r from-white to-orange-400 text-transparent bg-clip-text mb-12">
          Commentaires
        </h2>
        <CommentList offers={enterprise.offers} />
      </div>

      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closePopup}
        >
          <div
            className="relative p-4 rounded max-w-screen-lg max-h-screen-lg flex justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto}
              alt="Selected"
              className="object-contain max-w-full max-h-[80vh] rounded-lg"
            />
            <button
              className="absolute top-0 right-0 mt-4 mr-6 text-white text-3xl"
              onClick={closePopup}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnterpriseShow;
