import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../services/data-fetch";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { IoLocationOutline, IoMailOutline, IoPhonePortraitOutline, IoBusinessOutline } from "react-icons/io5";

const EnterpriseShow = () => {
  const { id } = useParams();
  const [enterprise, setEnterprise] = useState(null);

  const ensureCompleteUrl = (url) => {
    if (!url) return null;

    // Supprime les protocoles existants pour uniformiser le traitement
    let cleanUrl = url.replace(/^(https?:\/\/)/, '');

    // Ajoute "www." si ce n'est pas déjà présent
    if (!cleanUrl.startsWith('www.')) {
      cleanUrl = 'www.' + cleanUrl;
    }

    // Ajoute le protocole https://
    return `https://${cleanUrl}`;
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours > 0 ? `${hours}h ` : ""}${remainingMinutes > 0 ? `${remainingMinutes}m` : ""}`;
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
        {/* Photos */}
        <div className="md:w-4/5 flex flex-col space-y-4 mr-6">
          {enterprise.photos && enterprise.photos.length > 0 ? (
            <>
              <img 
                src={enterprise.photos[0]} 
                alt="Photo principale" 
                className="w-full h-auto rounded-md cursor-pointer" 
                onClick={() => openPopup(enterprise.photos[0])}
              />
              <div className="flex gap-4">
                {enterprise.photos[1] && (
                  <img 
                    src={enterprise.photos[1]} 
                    alt="Photo secondaire 1" 
                    className="w-1/2 h-auto rounded-md cursor-pointer" 
                    onClick={() => openPopup(enterprise.photos[1])}
                  />
                )}
                {enterprise.photos[2] && (
                  <img 
                    src={enterprise.photos[2]} 
                    alt="Photo secondaire 2" 
                    className="w-1/2 h-auto rounded-md cursor-pointer" 
                    onClick={() => openPopup(enterprise.photos[2])}
                  />
                )}
              </div>
            </>
          ) : (
            <div className="h-40 bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Aucune photo disponible</span>
            </div>
          )}
        </div>

        {/* Informations sur l'entreprise */}
        <div className="md:w-2/3 flex flex-col justify-between p-6 rounded-lg">
          <div className="flex items-start">
            {/* Logo de l'entreprise et job name */}
            <div className="flex flex-col items-center mr-6">
              {enterprise.logo ? (
                <img 
                  src={enterprise.logo} 
                  alt="Logo" 
                  className="w-24 h-24 rounded-lg mb-2" 
                />
              ) : (
                <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-2">
                  <span className="text-gray-400">Logo</span>
                </div>
              )}
              <p className="font-semibold text-lg text-center">{enterprise.job.name}</p>
            </div>

            <div className="flex flex-col justify-between">
              <div className="flex flex-col mb-4">
                <p className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl font-bold dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] bg-gradient-to-r from-[#67FFCC] to-black text-transparent bg-clip-text">
                    {enterprise.name}
                  </span>
                </p>
                <p className="flex items-center space-x-2 mb-2">
                  <IoLocationOutline className="text-xl" />
                  <span>{enterprise.adress}, {enterprise.city}</span>
                </p>
                <p className="flex items-center space-x-2 mb-2">
                  <IoBusinessOutline className="text-xl" />
                  <span>{enterprise.siret_number}</span>
                </p>
                <p className="flex items-center space-x-2 mb-2">
                  <IoMailOutline className="text-xl" />
                  <span>{enterprise.mail}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <IoPhonePortraitOutline className="text-xl" />
                  <span>{enterprise.phone}</span>
                </p>
              </div>

              <div className="flex space-x-4">
                {enterprise.instagram && (
                  <a 
                    href={ensureCompleteUrl(enterprise.instagram)} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xl"
                  >
                    <FaInstagram />
                  </a>
                )}
                {enterprise.twitter && (
                  <a 
                    href={ensureCompleteUrl(enterprise.twitter)} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xl"
                  >
                    <FaTwitter />
                  </a>
                )}
                {enterprise.facebook && (
                  <a 
                    href={ensureCompleteUrl(enterprise.facebook)} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xl"
                  >
                    <FaFacebookF />
                  </a>
                )}
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm bg-neutral-700 p-4 rounded-lg max-w-72">
            {enterprise.description}
          </p>
        </div>
      </div>

      {/* Section Planning */}
      <div className="mt-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <p className="text-center text-gray-400">Calendrier à insérer ici</p>
        </div>
      </div>

      {/* Section Prestations */}
      <div className="mt-8">
  <h2 className="text-2xl font-bold dark:bg-gradient-to-r dark:from-orange-200 dark:to-orange-400 bg-gradient-to-r from-orange-400 to-orange-800 text-transparent bg-clip-text mb-4">
    Prestations
  </h2>
    <div className="p-6 rounded-lg space-y-4">
      {enterprise.offers.length > 0 ? (
        enterprise.offers.map((offer, index) => (
          <div 
            key={index} 
            className="flex justify-between items-center bg-gray-700 p-4 rounded-lg"
          >
            <img 
              src={offer.image} 
              alt={`Offer ${offer.name}`} 
              className="w-20 h-20 object-cover rounded-lg"
            />
              <p className="text-lg font-semibold">{offer.name}</p>
              <p>{offer.description}</p>
              <p>{formatDuration(offer.duration)}</p>
              <p>{offer.price ? `${offer.price}€` : 'Prix non disponible'}</p>

            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleReservation(offer)}
            >
              Réserver
            </button>
          </div>
        ))
      ) : (
        <p>Aucune prestation disponible</p>
      )}
    </div>
  </div>

      {/* Section Commentaires */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-violet-800 dark:bg-gradient-to-r dark:from-violet-200 dark:to-violet-400 text-transparent bg-clip-text mb-4">
          Commentaires
        </h2>
        <div className="p-6 rounded-lg space-y-4">
          <p className="text-center text-gray-400">Aucun commentaire pour le moment</p>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseShow;
