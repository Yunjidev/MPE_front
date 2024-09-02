import { FaCalendarCheck } from "react-icons/fa";
import { useEnterpriseData } from "./useEnterpriseData";

export default function LengthReservation() {
  const data = useEnterpriseData();

  if (!data) {
    return <div>Chargement...</div>;
  }

  // Compter le nombre de ratings dans les offres
  const reservationsCount = data.offers.reduce((total, offer) => total + offer.reservations.length, 0);
 
  if (reservationsCount === null) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="bg-orange-100 bg-opacity-30 dark:bg-black text-black dark:text-white shadow-md rounded-lg p-6 flex items-center space-x-4 w-64">
      <FaCalendarCheck className="text-5xl" />
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-800 dark:bg-gradient-to-r dark:from-orange-200 dark:to-orange-400 text-transparent bg-clip-text">
          Rendez-vous
        </h2>
        <p className="text-xl bg-gradient-to-r from-orange-400 to-orange-800 dark:bg-gradient-to-r dark:from-orange-200 dark:to-orange-400 text-transparent bg-clip-text">
          {reservationsCount}
        </p>
      </div>
    </div>
  );
}