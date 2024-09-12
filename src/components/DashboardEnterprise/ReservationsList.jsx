import { useState, useEffect, useMemo } from "react";
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
    setPageIndex(0); // Reset page index when filtering
  }, [searchQuery, reservations, selectedStatus]);

  const updateReservationStatus = async (reservationId, status) => {
    try {
      await putData(`reservation/${reservationId}`, { status: status.toLowerCase() });
      fetchReservations(); // Refresh data after updating
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
    setPageIndex(0); // Reset page index when changing page size
  };

  const getStatusDetails = (status) => {
    switch (status) {
      case "pending":
        return { icon: <IoEllipseOutline className="text-yellow-500" />, text: "En attente" };
      case "accepted":
        return { icon: <IoCheckmarkCircleOutline className="text-green-500" />, text: "Acceptée" };
      case "rejected":
        return { icon: <IoCloseCircleOutline className="text-red-500" />, text: "Rejetée" };
      case "cancelled":
        return { icon: <IoCloseCircleOutline className="text-gray-500" />, text: "Annulée" };
      case "done":
        return { icon: <IoCheckmarkCircleOutline className="text-blue-500" />, text: "Terminée" };
      default:
        return { icon: <IoEllipseOutline className="text-gray-500" />, text: status };
    }
  };

  return (
    <div className="relative bg-neutral-800 border border-neutral-700 p-4 rounded-lg flex flex-col h-full">
      {/* Search Bar and Status Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0 md:space-x-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 rounded-lg bg-neutral-700 text-white focus:outline-none focus:ring-[#67FFCC] focus:border-[#67FFCC]"
        />
        {/* Status Filters */}
        <div className="flex flex-wrap items-center space-x-2">
          {["pending", "accepted", "rejected", "cancelled", "done", ""].map((status, index) => {
            const statusText = status === "" ? "Tous" : getStatusDetails(status).text;
            const isActive = selectedStatus === status;
            return (
              <button
                key={index}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-lg ${isActive ? "bg-[#67FFCC] text-white" : "bg-neutral-700 text-white"} border hover:border-[#67FFCC] transition duration-300 ease-in-out`}
              >
                {statusText}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reservations List */}
      <div className="flex-grow">
        <ul className="space-y-4">
          {paginatedReservations.map((reservation) => {
            const { icon, text } = getStatusDetails(reservation.status);
            return (
              <li
                key={reservation.id}
                className="p-4 bg-neutral-700 rounded-lg flex flex-col md:flex-row justify-between items-center"
              >
                {/* Reservation Details */}
                <div className="flex flex-wrap items-center space-x-6">
                  <h3 className="text-lg font-bold text-white">
                    {reservation.offer?.name || "Offre non disponible"}
                  </h3>
                  <p className="flex items-center space-x-2 text-sm text-gray-400">
                    <IoPersonOutline className="text-xl" />
                    <span>
                      {reservation.user?.firstName || "Inconnu"}{" "}
                      {reservation.user?.lastName || ""}
                    </span>
                  </p>
                  <p className="flex items-center space-x-2 text-sm text-gray-400">
                    <IoCalendarOutline className="text-xl" />
                    <span>{reservation.date}</span>
                  </p>
                  <p className="flex items-center space-x-2 text-sm text-gray-400">
                    <IoTimeOutline className="text-xl" />
                    <span>
                      De {reservation.start_time} à {reservation.end_time}
                    </span>
                  </p>
                </div>

                {/* Status and Action Buttons */}
                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mt-2 md:mt-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-white">{text}</span>
                    {icon}
                  </div>
                  <div className="flex space-x-2 mt-2 md:mt-0">
                    {reservation.status !== "accepted" && reservation.status !== "rejected" && (
                      <>
                        <Button
                          onClick={() =>
                            updateReservationStatus(reservation.id, "accepted")
                          }
                          className="text-green-500 hover:underline"
                          title="Accepter la réservation"
                        >
                          <FaCheck />
                        </Button>
                        <Button
                          onClick={() =>
                            updateReservationStatus(reservation.id, "rejected")
                          }
                          className="text-red-500 hover:underline"
                          title="Refuser la réservation"
                        >
                          <FaTimes />
                        </Button>
                      </>
                    )}
                    {reservation.status === "accepted" && (
                      <Button
                        onClick={() => updateReservationStatus(reservation.id, "done")}
                        className="text-blue-500 hover:underline"
                        title="Marquer comme terminée"
                      >
                        <FaCheck /> Terminée
                      </Button>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Pagination and Page Size Selector */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-auto space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <button
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={pageIndex === 0}
            className="w-full md:w-auto px-4 py-2 bg-neutral-700 text-white border hover:border-[#67FFCC] transition duration-300 ease-in-out"
          >
            Précédent
          </button>
          <button
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={paginatedReservations.length < pageSize}
            className="w-full md:w-auto px-4 py-2 bg-neutral-700 text-white border hover:border-[#67FFCC] transition duration-300 ease-in-out"
          >
            Suivant
          </button>
        </div>
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          className="px-4 py-2 bg-neutral-700 text-white border border-neutral-600 rounded-lg"
        >
          {[10, 20, 30, 40].map((size) => (
            <option key={size} value={size}>
              {size} éléments par page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ReservationsList;
