import React, { useState, useEffect, useMemo } from "react";
import { getData, putData } from "../../services/data-fetch";
import { FaCheck, FaTimes } from "react-icons/fa";
import {
  IoCalendarOutline,
  IoTimeOutline,
  IoPersonOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoEllipseOutline,
} from "react-icons/io5";
import { useParams } from "react-router-dom";
import Button from "../Button/button";

const ReservationsList = () => {
  const { id } = useParams();
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);

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

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = reservations
      .filter((reservation) => {
        const offerName = reservation.offer?.name
          ? reservation.offer.name.toLowerCase()
          : "";
        const userName = reservation.user?.firstName
          ? reservation.user.firstName.toLowerCase()
          : "";

        return offerName.includes(lowercasedQuery) || userName.includes(lowercasedQuery);
      })
      .filter((reservation) => selectedStatus === "" || reservation.status === selectedStatus);

    setFilteredReservations(filtered);
    setPageIndex(0); // Réinitialiser la page à 0 lors du filtrage
  }, [searchQuery, reservations, selectedStatus]);

  const updateReservationStatus = async (reservationId, status) => {
    try {
      await putData(`reservation/${reservationId}`, { status: status.toLowerCase() });
      fetchReservations(); // Rafraîchir les données après la mise à jour
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour du statut de la réservation:",
        error
      );
      alert(`Une erreur est survenue lors de la mise à jour du statut: ${error.message || 'Erreur inconnue'}`);
    }
  };

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

  const getStatusDetails = (status) => {
    switch (status) {
      case "pending":
        return { icon: <IoEllipseOutline className="text-yellow-500" />, text: "En attente" };
      case "accepted":
        return { icon: <IoCheckmarkCircleOutline className="text-green-600" />, text: "Acceptée" };
      case "rejected":
        return { icon: <IoCloseCircleOutline className="text-red-600" />, text: "Rejetée" };
      case "cancelled":
        return { icon: <IoCloseCircleOutline className="text-gray-600" />, text: "Annulée" };
      case "done":
        return { icon: <IoCheckmarkCircleOutline className="text-blue-600" />, text: "Terminée" };
      default:
        return { icon: <IoEllipseOutline className="text-gray-500" />, text: status };
    }
  };

  return (
    <div className="relative bg-neutral-600 bg-neutral-800 border border-neutral-700 p-4 rounded-lg flex flex-col h-full">
      {/* Deuxième ligne : Barre de recherche et Filtres */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0 md:space-x-4">
        {/* Barre de recherche */}
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 rounded-lg bg-neutral-800 bg-gray-300 text-white focus:outline-none focus:ring-[#67FFCC] focus:border-[#67FFCC]"
        />
        {/* Filtres par statut */}
        <div className="flex flex-wrap items-center space-x-2">
          <button
            onClick={() => setSelectedStatus("pending")}
            className={`px-4 py-2 rounded-lg ${selectedStatus === "pending" ? "bg-[#67FFCC] text-white" : "bg-gray-200 bg-neutral-700 text-white"} border hover:border-[#67FFCC] transition duration-300 ease-in-out`}
          >
            En attente
          </button>
          <button
            onClick={() => setSelectedStatus("accepted")}
            className={`px-4 py-2 rounded-lg ${selectedStatus === "accepted" ? "bg-[#67FFCC] text-white" : "bg-gray-200 bg-neutral-700 text-white"} border hover:border-[#67FFCC] transition duration-300 ease-in-out`}
          >
            Acceptée
          </button>
          <button
            onClick={() => setSelectedStatus("rejected")}
            className={`px-4 py-2 rounded-lg ${selectedStatus === "rejected" ? "bg-[#67FFCC] text-white" : "bg-gray-200 bg-neutral-700 text-white"} border hover:border-[#67FFCC] transition duration-300 ease-in-out`}
          >
            Rejetée
          </button>
          <button
            onClick={() => setSelectedStatus("cancelled")}
            className={`px-4 py-2 rounded-lg ${selectedStatus === "cancelled" ? "bg-[#67FFCC] text-white" : "bg-gray-200 bg-neutral-700 text-white"} border hover:border-[#67FFCC] transition duration-300 ease-in-out`}
          >
            Annulée
          </button>
          <button
            onClick={() => setSelectedStatus("done")}
            className={`px-4 py-2 rounded-lg ${selectedStatus === "done" ? "bg-[#67FFCC] text-white" : "bg-gray-200 bg-neutral-700 text-white"} border hover:border-[#67FFCC] transition duration-300 ease-in-out`}
          >
            Terminée
          </button>
          <button
            onClick={() => setSelectedStatus("")}
            className={`px-4 py-2 rounded-lg ${selectedStatus === "" ? "bg-[#67FFCC] text-white" : "bg-gray-200 bg-neutral-700 dark:text-white"} border hover:border-[#67FFCC] transition duration-300 ease-in-out`}
          >
            Tous
          </button>
        </div>
      </div>

      {/* Liste des réservations */}
      <div className="flex-grow">
        <ul className="space-y-4">
          {paginatedReservations.map((reservation) => {
            const { icon, text } = getStatusDetails(reservation.status);
            return (
              <li
                key={reservation.id}
                className="p-4 bg-gray-100 rounded-lg flex flex-col md:flex-row justify-between items-center"
              >
                {/* Détails de la réservation sur une seule ligne */}
                <div className="flex flex-wrap items-center space-x-6">
                  <h3 className="text-lg font-bold text-gray-900">
                    {reservation.offer?.name || "Offre non disponible"}
                  </h3>
                  <p className="flex items-center space-x-2 text-sm text-gray-700 text-gray-400">
                    <IoPersonOutline className="text-xl" />
                    <span>
                      {reservation.user?.firstName || "Inconnu"}{" "}
                      {reservation.user?.lastName || ""}
                    </span>
                  </p>
                  <p className="flex items-center space-x-2 text-sm text-gray-700 text-gray-400">
                    <IoCalendarOutline className="text-xl" />
                    <span>{reservation.date}</span>
                  </p>
                  <p className="flex items-center space-x-2 text-sm text-gray-700 text-gray-400">
                    <IoTimeOutline className="text-xl" />
                    <span>
                      De {reservation.start_time} à {reservation.end_time}
                    </span>
                  </p>
                </div>

                {/* Statut et boutons d'action */}
                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mt-2 md:mt-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700 text-gray-400">{text}</span>
                    {icon}
                  </div>
                  <div className="flex space-x-2 mt-2 md:mt-0">
                    {reservation.status !== "accepted" && reservation.status !== "rejected" && (
                      <>
                        <Button
                          onClick={() =>
                            updateReservationStatus(reservation.id, "accepted")
                          }
                          className="text-green-600 text-green-500 hover:underline"
                          title="Accepter la réservation"
                        >
                          <FaCheck />
                        </Button>
                        <Button
                          onClick={() =>
                            updateReservationStatus(reservation.id, "rejected")
                          }
                          className="text-red-600 text-red-500 hover:underline"
                          title="Refuser la réservation"
                        >
                          <FaTimes />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Première ligne : Pagination et Sélecteur de taille de page */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-auto space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <button
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={pageIndex === 0}
            className="w-full md:w-auto px-4 py-2 bg-gray-200 rounded-lg bg-neutral-700 text-white border hover:border-[#67FFCC] transition duration-300 ease-in-out"
          >
            &laquo; Précédente
          </button>
          <span className="text-white text-black font-bold">
            Page {pageIndex + 1} sur {Math.ceil(filteredReservations.length / pageSize)}
          </span>
          <button
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={pageIndex >= Math.ceil(filteredReservations.length / pageSize) - 1}
            className="w-full md:w-auto px-4 py-2 bg-gray-200 rounded-lg bg-neutral-700 text-white border hover:border-[#67FFCC] transition duration-300 ease-in-out"
          >
            Suivante &raquo;
          </button>
        </div>
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          className="w-full md:w-auto border rounded-lg bg-neutral-700 text-white p-2"
        >
          {[10, 20, 30, 40].map((size) => (
            <option key={size} value={size}>
              {size} réservations par page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ReservationsList;
