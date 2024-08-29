import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

moment.locale("fr");

export const daysOfWeek = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];

export const formatDisponibility = (disponibilities) => {
  const daysOfWeek = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const formattedDisponibilities = {};

  daysOfWeek.forEach((day) => {
    formattedDisponibilities[day] = [];
  });

  disponibilities.forEach((dispo) => {
    formattedDisponibilities[dispo.day].push({
      start: moment(dispo.start_hour, "HH:mm"),
      end: moment(dispo.end_hour, "HH:mm"),
    });
  });

  return formattedDisponibilities;
};

export function formatReservations(reservations) {
  if (!reservations) return [];
  return reservations.map((reservation) => {
    const startDateTime = moment(reservation.date).set({
      hour: parseInt(reservation.start_time.split(":")[0]),
      minute: parseInt(reservation.start_time.split(":")[1]),
    });
    const endDateTime = moment(reservation.date).set({
      hour: parseInt(reservation.end_time.split(":")[0]),
      minute: parseInt(reservation.end_time.split(":")[1]),
    });

    return {
      title: `${reservation.offer.name} - ${startDateTime.format("HH:mm")} � ${endDateTime.format("HH:mm")}`,
      start: startDateTime.toDate(),
      end: endDateTime.toDate(),
      type: "reservation",
      status: reservation.status,
    };
  });
}

export function formatIndisponibility(indisponibility) {
  if (!indisponibility) return [];
  return indisponibility.map((date) => {
    const startDateTime = moment(date.start_date).set({
      hour: parseInt(date.start_hour.split(":")[0]),
      minute: parseInt(date.start_hour.split(":")[1]),
    });
    const endDateTime = moment(date.end_date).set({
      hour: parseInt(date.end_hour.split(":")[0]),
      minute: parseInt(date.end_hour.split(":")[1]),
    });

    return {
      title: `Indisponible du ${startDateTime.format("DD/MM/YYYY HH:mm")} au ${endDateTime.format("DD/MM/YYYY HH:mm")}`,
      start: startDateTime.toDate(),
      end: endDateTime.toDate(),
      type: "indisponibility",
    };
  });
}
