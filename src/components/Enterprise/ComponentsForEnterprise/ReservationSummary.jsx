/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { FaEdit, FaEye, FaRegListAlt } from "react-icons/fa";

export default function ReservationSummary({ enterprise, onEdit, onView, onOffersList }) {
  const getTodayReservations = () => {
    if (!enterprise || !enterprise.offers) return [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayReservations = [];

    enterprise.offers.forEach(offer => {
      offer.reservations.forEach(reservation => {
        const reservationDate = new Date(reservation.date);
        if (reservationDate >= today && reservationDate < tomorrow) {
          todayReservations.push({ ...reservation, offerName: offer.name });
        }
      });
    });

    todayReservations.sort((a, b) => new Date(`${a.date}T${a.start_time}`) - new Date(`${b.date}T${b.start_time}`));

    return todayReservations;
  };

  const nowDate = new Date();
  const currentDate = nowDate.toLocaleDateString();
  const todayReservations = getTodayReservations();

  return (
    <div className="bg-neutral-800 p-4 rounded-lg mb-4 text-neutral-300">
      <p className="text-xl">Gestion de mon entreprise</p>
      <hr className="w-full mb-4" />
      <div className="flex flex-row justify-between">
        <div className="flex items-center mb-4">
          <button onClick={onEdit} className="flex h-24 mx-1 items-center w-44 flex-row bg-neutral-700 p-2 rounded-lg">
            <FaEdit className="text-[#67FFCC] cursor-pointer text-xl ml-2" title="Modifier mon entreprise" />
            Modification entreprise
          </button>
          <button onClick={onView} className="flex h-24 mx-1 items-center w-44 flex-row bg-neutral-700 p-2 rounded-lg">
            <FaEye className="text-[#67FFCC] cursor-pointer text-2xl ml-2" title="Voir ma page entreprise" />Voir ma page entreprise
          </button>
          <button onClick={onOffersList} className="flex h-24 mx-1 items-center w-44 flex-row bg-neutral-700 p-2 rounded-lg">
            <FaRegListAlt className="text-[#67FFCC] cursor-pointer text-2xl ml-2" title="Services de l'entreprise" />Services de l'entreprise
          </button>
        </div>

        <div className="bg-neutral-700 rounded-lg p-4 w-1/2 h-28 overflow-y-auto">
          <p className="text-lg font-semibold mb-2">Réservations du jour : {currentDate}</p>
          <hr className="w-full mb-1" />
          {todayReservations.length > 0 ? (
            <div className="divide-y">
              {todayReservations.map((reservation, index) => (
                <div key={index} className=" flex flex-row justify-between">
                  <p> {reservation.offerName}</p>
                  <p><strong>Début :</strong> {reservation.start_time}</p>
                  <p><strong>Fin :</strong> {reservation.end_time}</p>
                  <p><strong>Status :</strong> {reservation.status}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Aucune réservation aujourd'hui</p>
          )}
        </div>
      </div>
    </div>
  );
}
