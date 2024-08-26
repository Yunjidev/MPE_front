import React, { useState, useEffect } from "react";
import { getData } from "../../services/data-fetch";

const UserAgenda = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const data = await getData("user/profile");
        const reservations = data.reservations;
        setReservations(reservations); // Mettre à jour l'état avec les réservations récupérées
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservation();
  }, []);

  return (
    <div className="lg:px-6 px-3 py-1 shadow-[0px_0px_15px_-5px] shadow-violet-400 bg-neutral-800 rounded-3xl">

      <h2>User Reservations</h2>
      {reservations.length > 0 ? (
        <div className="flex divide-y divide-neutral-700 flex-col lg:justify-between items-center py-3 px-2 lg:py-4 lg:px-2">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="flex w-full justify-between items-center">
              <h3>{reservation.offer.name}</h3> {/* Affichage du nom de l'offre */}
              <p>Date: {new Date(reservation.date).toLocaleDateString()}</p> {/* Date de la réservation */}
              <p>Start Time: {reservation.start_time}</p> {/* Start time */}
              <p>Duration: {reservation.offer.duration} minutes</p> {/* Durée de l'offre */}
              <p>Price: {reservation.offer.price} €</p> {/* Prix */}
            </div>
          ))}
        </div>
      ) : (
        <p>No reservations found</p>
      )}

    </div>
  );
};

export default UserAgenda;


