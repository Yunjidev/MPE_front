/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getData, putData } from "../../services/data-fetch";
import "./user_agenda.css";
import { CiCalendar, CiClock2 } from "react-icons/ci";
import { FaHourglassStart, FaCheck, FaTimes, FaBan, FaCheckCircle } from "react-icons/fa";

const pill = {
  pending: "bg-yellow-500/15 text-yellow-300 border border-yellow-500/30",
  accepted: "bg-green-500/15 text-green-300 border border-green-500/30",
  cancelled: "bg-red-500/15 text-red-300 border border-red-500/30",
  rejected: "bg-neutral-700/60 text-neutral-300 border border-neutral-600",
  done: "bg-blue-500/15 text-blue-300 border border-blue-500/30",
};

const UserAgenda = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const data = await getData("user/profile");
        setReservations(data?.reservations || []);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        setLoading(false);
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
      await putData(`https://votre-backend.com/api/reservations/${reservationId}`, {
        status: "cancelled",
      });
      setReservations((prev) =>
        prev.map((r) => (r.id === reservationId ? { ...r, status: "cancelled" } : r))
      );
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      alert("Une erreur s'est produite lors de l'annulation. Veuillez réessayer.");
    }
  };

  return (
    <div className="divide-y divide-neutral-800 bg-neutral-900/40 rounded-2xl border border-neutral-800">
      <div className="px-5 py-4">
        <h3 className="text-lg font-semibold">Mes réservations</h3>
        <p className="text-sm text-neutral-400">Vos rendez-vous à venir et passés.</p>
      </div>

      <div className="p-2 lg:p-3">
        {loading ? (
          <div className="p-6 text-neutral-400 text-sm">Chargement…</div>
        ) : reservations.length > 0 ? (
          <ul className="flex flex-col gap-3">
            {reservations.map((reservation) => (
              <ReservationItem
                key={reservation.id}
                reservation={reservation}
                onCancel={cancelReservation}
              />
            ))}
          </ul>
        ) : (
          <div className="p-6 text-neutral-400 text-sm text-center">Aucune réservation trouvée.</div>
        )}
      </div>
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
        return <FaHourglassStart />;
      case "accepted":
        return <FaCheck />;
      case "cancelled":
        return <FaTimes />;
      case "rejected":
        return <FaBan />;
      case "done":
        return <FaCheckCircle />;
      default:
        return null;
    }
  };

  const formatDuration = (minutes) => {
    const h = Math.floor((minutes ?? 0) / 60);
    const m = (minutes ?? 0) % 60;
    return `${h > 0 ? `${h}h` : ""}${h && m ? " " : ""}${m ? `${m}m` : ""}` || "—";
    };

  const formatTime = (t) => (t ? String(t).substring(0, 5) : "");

  const description = reservation?.offer?.description ?? "";
  const truncated = description.length > 80 ? `${description.slice(0, 80)}…` : description;

  const canCancel = !["done", "cancelled", "rejected"].includes(reservation.status);

  return (
    <li className="rounded-xl border border-neutral-800 bg-neutral-900/50 px-4 py-4 hover:border-neutral-700 transition">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Col 1: date & heure */}
        <div className="flex items-center gap-3 text-sm text-neutral-300">
          <span className="inline-flex items-center gap-2">
            <CiCalendar className="text-neutral-400" />
            {new Date(reservation.date).toLocaleDateString()}
          </span>
          <span className="inline-flex items-center gap-2">
            <CiClock2 className="text-neutral-400" />
            {formatTime(reservation.start_time)}
          </span>
        </div>

        {/* Col 2: Entreprise / Offre */}
        <div className="min-w-0">
          <div className="text-neutral-400 text-xs uppercase tracking-wide">
            {reservation?.offer?.enterprise?.name ?? "Entreprise"}
          </div>
          <div className="text-white font-medium truncate">
            {reservation?.offer?.name ?? "Offre inconnue"}
          </div>
        </div>

        {/* Col 3: Description */}
        <div className="flex-1 min-w-0 text-neutral-300">
          <p className="line-clamp-2 lg:line-clamp-1">
            {showFullDescription ? description : truncated}
            {description.length > 80 && (
              <button
                onClick={() => setShowFullDescription((v) => !v)}
                className="ml-2 text-xs text-blue-400 hover:text-blue-300 underline"
              >
                {showFullDescription ? "Voir moins" : "Voir plus"}
              </button>
            )}
          </p>
        </div>

        {/* Col 4: Statut */}
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${pill[reservation.status] || "bg-neutral-800 text-neutral-300 border border-neutral-700"}`}
        >
          {getStatusIcon(reservation.status)}
          <span>{translateStatus(reservation.status)}</span>
        </div>

        {/* Col 5: durée & prix */}
        <div className="flex items-center gap-3 text-sm text-neutral-300">
          <span className="whitespace-nowrap">{formatDuration(reservation?.offer?.duration)}</span>
          <span className="opacity-50">•</span>
          <span className="whitespace-nowrap">{reservation?.offer?.price} €</span>
        </div>

        {/* Col 6: action */}
        <div className="flex-shrink-0">
          {canCancel && (
            <button
              onClick={() =>
                window.confirm("Annuler cette réservation ?") &&
                onCancel(reservation.id, reservation.status)
              }
              className="bin-button"
              title="Annuler la réservation"
            >
              {/* SVGs conservés (anim CSS dans user_agenda.css) */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 39 7" className="bin-top">
                <line strokeWidth="4" stroke="white" y2="5" x2="39" y1="5"></line>
                <line strokeWidth="3" stroke="white" y2="1.5" x2="26.0357" y1="1.5" x1="12"></line>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 33 39" className="bin-bottom">
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 89 80" className="garbage">
                <path
                  fill="white"
                  d="M20.5 10.5L37.5 15.5L42.5 11.5L51.5 12.5L68.75 0L72 11.5L79.5 12.5H88.5L87 22L68.75 31.5L75.5066 25L86 26L87 35.5L77.5 48L70.5 49.5L80 50L77.5 71.5L63.5 58.5L53.5 68.5L65.5 70.5L45.5 73L35.5 79.5L28 67L16 63L12 51.5L0 48L16 25L22.5 17L20.5 10.5Z"
                ></path>
              </svg>
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default UserAgenda;
