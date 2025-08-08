import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(duration);
dayjs.extend(timezone);
dayjs.extend(utc);

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
  const formattedDisponibilities = {};

  daysOfWeek.forEach((day) => {
    formattedDisponibilities[day] = [];
  });

  disponibilities.forEach((dispo) => {
    formattedDisponibilities[dispo.day].push({
      start: dayjs(dispo.start_hour, "HH:mm"),
      end: dayjs(dispo.end_hour, "HH:mm"),
    });
  });

  return formattedDisponibilities;
};

export function formatReservations(reservations) {
  if (!reservations) return [];
  return reservations.map((reservation) => {
    const startDateTime = dayjs(reservation.date)
      .hour(parseInt(reservation.start_time.split(":")[0]))
      .minute(parseInt(reservation.start_time.split(":")[1]))
      .second(0);
    const endDateTime = dayjs(reservation.date)
      .hour(parseInt(reservation.end_time.split(":")[0]))
      .minute(parseInt(reservation.end_time.split(":")[1]))
      .second(0);

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
    const startDateTime = dayjs(date.start_date)
      .hour(parseInt(date.start_hour.split(":")[0]))
      .minute(parseInt(date.start_hour.split(":")[1]))
      .second(0);
    const endDateTime = dayjs(date.end_date)
      .hour(parseInt(date.end_hour.split(":")[0]))
      .minute(parseInt(date.end_hour.split(":")[1]))
      .second(0);

    return {
      title: `Indisponible`,
      start: startDateTime.toDate(),
      end: endDateTime.toDate(),
      type: "indisponibility",
      data: {
        user: date.user,
      },
    };
  });
}
