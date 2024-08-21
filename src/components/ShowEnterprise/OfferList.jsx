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
    <div className="px-6 shadow-[0px_2px_20px_-5px] shadow-orange-400 bg-neutral-800 rounded-3xl">
    <div className="divide-y">
      {offers.length > 0 ? (
        offers.map((offer, index) => (
          <div 
            key={index} 
            className="flex justify-between items-center py-6 px-4 "
          >
            <img 
              src={offer.image} 
              alt={`Offer ${offer.name}`} 
              className="w-20 h-20 object-cover rounded-full"
            />
            <p className="text-lg font-semibold w-1/12">{offer.name}</p>
            <p className="w-6/12">{offer.description}</p>
            <p>{formatDuration(offer.duration)}</p>
            <p>{offer.price ? `${offer.price}€` : 'Prix non disponible'}</p>

            <button 
              className="bg-neutral-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
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
  );
};

export default OfferList;
