import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

export function transformDisponibilityDates(disponibilities) {
  if (!disponibilities) return [];
  return disponibilities.map((date) => ({
    title: `Disponible de ${date.startHour} à ${date.endHour}`,
    start: moment(date.date + " " + date.startHour, "DD/MM HH:mm").toDate(),
    end: moment(date.date + " " + date.endHour, "DD/MM HH:mm").toDate(),
    type: "disponibility",
    color: "blue",
  }));
}

export function transformAvailabilityDates(availability) {
  if (!availability) return [];
  return availability.map((date) => ({
    title: `Disponible de ${date.startHour} à ${date.endHour}`,
    start: moment(date.date + " " + date.startHour, "DD/MM HH:mm").toDate(),
    end: moment(date.date + " " + date.endHour, "DD/MM HH:mm").toDate(),
    type: "availability",
    color: "green",
  }));
}

export function transformIndisponibilityDates(indisponibility) {
  if (!indisponibility) return [];
  return indisponibility.map((date) => ({
    title: `Indisponible de ${date.start_date} à ${date.end_date}`,
    start: moment(date.start_date, "DD/MM/YYYY").toDate(),
    end: moment(date.end_date, "DD/MM/YYYY").toDate(),
    type: "indisponibility",
    color: "red",
  }));
}

export const formatDisponibility = (disponibilities) => {
  if (!disponibilities) return [];
  const daysOfWeek = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];
  return disponibilities.map((date) => ({
    dayOfWeek: daysOfWeek[date.day],
    startHour: date.startHour,
    endHour: date.endHour,
  }));
};
