/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getData, putData } from "../../services/data-fetch";
import './user_agenda.css';
import { CiCalendar, CiClock2 } from "react-icons/ci";
import { FaHourglassStart, FaCheck, FaTimes, FaBan, FaCheckCircle } from "react-icons/fa"; // Ajoutez ces importations

const UserAgenda = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const data = await getData("user/profile");
        console.log(data);
        const reservations = data.reservations;
        setReservations(reservations);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservation();
  }, []);

  const cancelReservation = async (reservationId, currentStatus) => {
    if (currentStatus === "done") {
      alert("Vous ne pouvez pas annuler une réservation déjà terminée.");
      return;
    }
  
    try {
      await putData(`https://votre-backend.com/api/reservations/${reservationId}`, { status: "cancelled" });
      
      setReservations(prevReservations =>
        prevReservations.map(reservation =>
          reservation.id === reservationId
            ? { ...reservation, status: "cancelled" }
            : reservation
        )
      );
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      alert("Une erreur s'est produite lors de l'annulation de la réservation. Veuillez réessayer.");
    }
  };

  return (
    <div className="lg:px-6 px-3 py-1 divide-y divide-neutral-700 shadow-[0px_0px_15px_-5px] shadow-violet-400 bg-neutral-800 rounded-3xl">
      <h2 className="text-center">Mes réservations</h2>
      {reservations.length > 0 ? (
        <div className="flex divide-y divide-neutral-700 flex-col lg:justify-between items-center py-3 px-2 lg:py-4 lg:px-2">
          {reservations.map(reservation => (
            <ReservationItem
              key={reservation.id}
              reservation={reservation}
              onCancel={cancelReservation}
            />
          ))}
        </div>
      ) : (
        <p>Aucune réservation trouvée</p>
      )}
    </div>
  );
};

const ReservationItem = ({ reservation, onCancel }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const translateStatus = (status) => {
    switch (status) {
      case "pending":
        return "En attente";
      case "accepted":
        return "Acceptée";
      case "cancelled":
        return "Annulée";
      case "rejected":
        return "Rejetée";
      case "done":
        return "Terminée";
      default:
        return status;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FaHourglassStart className="text-yellow-500" />;
      case "accepted":
        return <FaCheck className="text-green-500" />;
      case "cancelled":
        return <FaTimes className="text-red-500" />;
      case "rejected":
        return <FaBan className="text-gray-500" />;
      case "done":
        return <FaCheckCircle className="text-blue-500" />;
      default:
        return null;
    }
  };

  const formatDuration = minutes => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours > 0 ? `${hours}h ` : ""}${remainingMinutes > 0 ? `${remainingMinutes}m` : ""}`;
  };

  const formatTimeWithoutSeconds = timeString => {
    if (!timeString) return "";
    return timeString.substring(0, 5);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncatedDescription = reservation.offer.description.length > 40
    ? `${reservation.offer.description.substring(0, 40)}...`
    : reservation.offer.description;

  const handleCancelClick = () => {
    if (window.confirm("Êtes-vous sûr de vouloir annuler cette réservation ?")) {
      onCancel(reservation.id);
    }
  };

  return (
    <div className="flex w-full flex-col lg:flex-row py-5 justify-between items-center">
      <div className="flex flex-row justify-start w-full lg:w-4/12 items-center">
        <p className="mr-1"><CiCalendar /></p>
        <p className="mr-4"> {new Date(reservation.date).toLocaleDateString()}</p>
        <p className="mr-1"><CiClock2 /></p>
        <p className="mr-12">{formatTimeWithoutSeconds(reservation.start_time)}</p>
        <p className="w-3/12 font-bold">{reservation.offer.enterprise.name}</p>
        <h3 className="w-3/12 font-bold">{reservation.offer.name}</h3>
      </div>
  
      <p className="lg:w-4/12 lg:mt-0 mt-4 w-full">
        {showFullDescription ? reservation.offer.description : truncatedDescription}
        {reservation.offer.description.length > 40 && (
          <button onClick={toggleDescription} className="text-blue-500 ml-2">
            {showFullDescription ? "Voir moins" : "Voir plus"}
          </button>
        )}
      </p>
      
      <p className="flex items-center">{getStatusIcon(reservation.status)} <span className="ml-2">{translateStatus(reservation.status)}</span></p>
  
      <div className="flex flex-row justify-center items-center w-full lg:w-1/12">
        <p className="mr-5">{formatDuration(reservation.offer.duration)}</p>
        <p className="mr-5">●</p>
        <p>{reservation.offer.price} €</p>
      </div>
  
      <div className="w-16 flex-shrink-0 flex justify-end">
        {reservation.status !== "done" && reservation.status !== "cancelled" && reservation.status !== "rejected" && (
          <button onClick={() => cancelReservation(reservation.id, reservation.status)} className="bin-button">
            {/* SVG du bouton */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 39 7"
              className="bin-top"
            >
              <line strokeWidth="4" stroke="white" y2="5" x2="39" y1="5"></line>
              <line
                strokeWidth="3"
                stroke="white"
                y2="1.5"
                x2="26.0357"
                y1="1.5"
                x1="12"
              ></line>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 33 39"
              className="bin-bottom"
            >
              <mask fill="white" id="path-1-inside-1_8_19">
                <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
              </mask>
              <path
                mask="url(#path-1-inside-1_8_19)"
                fill="white"
                d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
              ></path>
              <path strokeWidth="4" stroke="white" d="M12 6L12 29"></path>
              <path strokeWidth="4" stroke="white" d="M21 6V29"></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 89 80"
              className="garbage"
            >
              <path
                fill="white"
                d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
              ></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default UserAgenda;
