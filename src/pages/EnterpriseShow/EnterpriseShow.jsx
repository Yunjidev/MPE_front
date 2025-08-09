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

  if (!enterprise) return <div>Loading...</div>;

  return (
    <div className="text-white mt-12">
      
      <div className="p-6 flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        <PhotoGallery photos={enterprise.photos} openPopup={openPopup} />
        <EnterpriseDetails enterprise={enterprise} />
      </div>

      <section className="max-w-7xl mx-auto p-6">
        <div className="bg-gray-800 p-6 rounded-lg mb-12 text-center text-gray-400">
          Calendrier à insérer ici
        </div>

        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-white to-violet-400 text-transparent bg-clip-text mb-8">
          Prestations
        </h2>
        <OfferList offers={enterprise.offers} />

        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-white to-orange-400 text-transparent bg-clip-text mt-16 mb-8">
          Commentaires
        </h2>
        <CommentList offers={enterprise.offers} />
      </section>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={closePopup}>
          <div className="relative max-w-screen-lg max-h-screen-lg flex justify-center items-center" onClick={(e) => e.stopPropagation()}>
            <img src={selectedPhoto} alt="Selected" className="object-contain max-w-full max-h-[80vh] rounded-lg" />
            <button className="absolute top-4 right-4 text-white text-3xl" onClick={closePopup}>
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnterpriseShow;
