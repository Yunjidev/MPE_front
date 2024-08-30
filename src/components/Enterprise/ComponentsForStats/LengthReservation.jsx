import { FaCalendarCheck } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { getData } from "../../../services/data-fetch";
import { useAtom } from "jotai";
import { userAtom } from "../../../store/user";
import { enterprisesAtom } from "../../../store/enterprises";


export default function LengthReservation() {
    const [reservationsCount, setReservationsCount] = useState(null);
    const [user] = useAtom(userAtom);
    const [enterprises] = useAtom(enterprisesAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const enterpriseId = enterprises.length > 0 ? enterprises[0].id : undefined;
        console.log('Enterprise ID:', enterpriseId);

        if (!enterpriseId) {
          throw new Error('Enterprise ID is undefined');
        }

        let response = await getData(`enterprise/${enterpriseId}`);
        console.log('Données récupérées:', response); // Vérifier les données récupérées

        // Compter le nombre de ratings dans les offres
        const reservationsCount = response.offers.reduce((total, offer) => total + offer.reservations.length, 0);
        setReservationsCount(reservationsCount);
        console.log(reservationsCount)
        
      } catch (error) {
        console.error('Error fetching ratings count:', error);
      }
    };
    fetchData();
  }, [user.id, enterprises]);

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