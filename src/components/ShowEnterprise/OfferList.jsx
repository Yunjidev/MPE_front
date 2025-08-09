/* eslint-disable react/prop-types */
const OfferList = ({ offers }) => {
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours > 0 ? `${hours}h ` : ""}${remainingMinutes > 0 ? `${remainingMinutes}m` : ""}`;
  };

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const createMarkup = (html) => ({ __html: decodeHtml(html) });

  return (
    <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl shadow-lg overflow-hidden">
      {offers?.length > 0 ? (
        <div className="divide-y divide-neutral-800">
          {offers.map((offer, index) => (
            <div key={index} className="p-4 flex flex-col lg:flex-row lg:items-center gap-4 hover:bg-neutral-800/50 transition">
              {/* Image + nom */}
              <div className="flex items-center gap-4 lg:w-4/12">
                <img
                  src={offer.image}
                  alt={offer.name}
                  className="w-20 h-20 rounded-full object-cover border border-neutral-700"
                />
                <p className="text-lg font-semibold">{offer.name}</p>
              </div>

              {/* Description */}
              <div
                className="flex-1 text-sm text-neutral-300 leading-relaxed"
                dangerouslySetInnerHTML={createMarkup(offer.description)}
              />

              {/* Prix + action */}
              <div className="flex items-center gap-4 lg:w-3/12 justify-between">
                <span className="text-sm">{formatDuration(offer.duration)}</span>
                <span className="text-orange-400 font-semibold">{offer.price ? `${offer.price}€` : "Prix non dispo"}</span>
                <button className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg transition">
                  Réserver
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="p-6 text-center text-gray-400">Aucune prestation disponible</p>
      )}
    </div>
  );
};

export default OfferList;
