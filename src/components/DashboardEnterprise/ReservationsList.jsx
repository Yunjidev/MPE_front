import React, { useState, useEffect, useMemo } from "react";
import { getData, putData } from "../../services/data-fetch"; // Suppression de deleteData
import { FaCheck, FaTimes } from "react-icons/fa"; // Suppression de FaTrash
import { useParams } from "react-router-dom";
import Button from "../Button/button";

const ReservationsList = () => {
  const { id } = useParams();
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);

  // Fonction pour récupérer les réservations
  const fetchReservations = async () => {
    try {
      const data = await getData(`enterprise/${id}/reservations`);
      setReservations(data || []);
      setFilteredReservations(data || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations:", error);
      alert("Une erreur est survenue lors de la récupération des réservations.");
    }
  };

  useEffect(() => {
    if (id) {
      fetchReservations();
    }
  }, [id]);

  // Filtrage des réservations
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = reservations.filter((reservation) => {
      const offerName = reservation.offer?.name ? reservation.offer.name.toLowerCase() : "";
      const userName = reservation.user?.firstName ? reservation.user.firstName.toLowerCase() : "";

      return offerName.includes(lowercasedQuery) || userName.includes(lowercasedQuery);
    });
    setFilteredReservations(filtered);
    setPageIndex(0); // Réinitialiser la page à 0 lors du filtrage
  }, [searchQuery, reservations]);

  // Fonction pour mettre à jour le statut d'une réservation
  const updateReservationStatus = async (reservationId, status) => {
    try {
      await putData(`reservation/${reservationId}`, { status: status.toLowerCase() });
      fetchReservations(); // Rafraîchir les données après la mise à jour
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut de la réservation:", error);
      alert(`Une erreur est survenue lors de la mise à jour du statut: ${error.message || 'Erreur inconnue'}`);
    }
  };

  // Pagination
  const paginatedReservations = useMemo(() => {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    return filteredReservations.slice(start, end);
  }, [filteredReservations, pageIndex, pageSize]);

  const handlePageSizeChange = (event) => {
    const newSize = Number(event.target.value);
    setPageSize(newSize);
    setPageIndex(0); // Réinitialiser la page à 0
  };

  return (
    <div className="relative bg-neutral-600 dark:bg-neutral-800 border dark:border-neutral-700 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/3 px-4 py-2 rounded-lg dark:bg-neutral-800 bg-gray-300 text-white focus:outline-none focus:ring-[#67FFCC] focus:border-[#67FFCC]"
        />
        <div className="flex justify-center items-center space-x-4">
          <button
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={pageIndex === 0}
            className="px-4 py-2 bg-gray-200 rounded-lg dark:bg-neutral-700 dark:text-white border hover:border-[#67FFCC] transition duration-300 ease-in-out"
          >
            &laquo; Précédente
          </button>
          <span className="dark:text-white text-black font-bold">
            Page {pageIndex + 1} sur {Math.ceil(filteredReservations.length / pageSize)}
          </span>
          <button
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={pageIndex >= Math.ceil(filteredReservations.length / pageSize) - 1}
            className="px-4 py-2 bg-gray-200 rounded-lg dark:bg-neutral-700 dark:text-white border hover:border-[#67FFCC] transition duration-300 ease-in-out"
          >
            Suivante &raquo;
          </button>
        </div>
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          className="border rounded-lg dark:bg-neutral-700 dark:text-white p-2"
        >
          {[10, 20, 30, 40].map((size) => (
            <option key={size} value={size}>
              {size} réservations par page
            </option>
          ))}
        </select>
      </div>

      <ul className="space-y-4">
        {paginatedReservations.map((reservation) => (
          <li key={reservation.id} className="p-4 bg-gray-100 dark:bg-neutral-700 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {reservation.offer?.name || 'Offre non disponible'}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-400">
                Client : {reservation.user?.firstName || 'Inconnu'} {reservation.user?.lastName || ''}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-400">Date : {reservation.date}</p>
              <p className="text-sm text-gray-700 dark:text-gray-400">Heure de début : {reservation.start_time}</p>
              <p className="text-sm text-gray-700 dark:text-gray-400">Heure de fin : {reservation.end_time}</p>
              <p className="text-sm text-gray-700 dark:text-gray-400">Statut : {reservation.status}</p>
            </div>
            <div className="flex space-x-2">
              {reservation.status !== "accepted" && reservation.status !== "rejected" && (
                <>
                  <Button
                    onClick={() => updateReservationStatus(reservation.id, "accepted")}
                    className="text-green-600 dark:text-green-500 hover:underline"
                    title="Accepter la réservation"
                  >
                    <FaCheck />
                  </Button>
                  <Button
                    onClick={() => updateReservationStatus(reservation.id, "rejected")}
                    className="text-red-600 dark:text-red-500 hover:underline"
                    title="Refuser la réservation"
                  >
                    <FaTimes />
                  </Button>
                </>
              )}
              {reservation.status === "accepted" && (
                <span className="text-green-600 font-bold">Acceptée</span>
              )}
              {reservation.status === "rejected" && (
                <span className="text-red-600 font-bold">Refusée</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationsList;
