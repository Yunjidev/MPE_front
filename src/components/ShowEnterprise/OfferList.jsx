/* eslint-disable react/prop-types */

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

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const createMarkup = (html) => {
    return { __html: decodeHtml(html) };
  };

  return (
    <div className="lg:px-6 px-3 py-1 dark:shadow-[0px_0px_15px_-5px] dark:shadow-violet-400 border dark:border-none border-orange-300 dark:bg-neutral-800 bg-white/25 rounded-3xl">
      <div className="divide-y dark:divide-neutral-700 divide-neutral-400">
        {offers.length > 0 ? (
          offers.map((offer, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row lg:justify-between items-center py-3 px-2 lg:py-4 lg:px-2"
            >
              <div className="flex flex-row w-full lg:w-4/12 items-center">
                <img
                  src={offer.image}
                  alt={`Offer ${offer.name}`}
                  className="w-20 h-20 object-cover rounded-full justify-self-start"
                />
                <p className="text-lg w-auto ml-6 text-center lg:text-start font-semibold">{offer.name}</p>
              </div>
              <p
                className="my-3 lg:w-8/12 text-sm"
                dangerouslySetInnerHTML={createMarkup(offer.description)}
              />
              <div className="flex flex-row items-center justify-between lg:justify-between w-9/12 lg:w-3/12">
                <p>{formatDuration(offer.duration)}</p>
                <p>●</p>
                <p>{offer.price ? `${offer.price}€` : 'Prix non disponible'}</p>
                <button
                  className="bg-neutral-700 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                  onClick={() => handleReservation(offer)}
                >
                  Réserver
                </button>
              </div>
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
