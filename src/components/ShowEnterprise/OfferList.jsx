/* eslint-disable react/prop-types */
// src/components/OfferList.js

const OfferList = ({ offers }) => {
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours > 0 ? `${hours}h ` : ""}${remainingMinutes > 0 ? `${remainingMinutes}m` : ""}`;
  };

  const handleReservation = (offer) => {
    // Logic for handling reservation
    console.log("Reserve offer:", offer);
  };

  return (
    <div className="p-6 rounded-lg space-y-4">
      {offers.length > 0 ? (
        offers.map((offer, index) => (
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
  );
};

export default OfferList;
