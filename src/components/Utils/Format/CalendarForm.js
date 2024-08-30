import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { daysOfWeek } from "./Time";

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

export const slotStyleGetter = (date, formattedDisponibilites) => {
  const style = {
    backgroundColor: "",
  };

  const dayOfWeek = daysOfWeek[dayjs(date).day()];
  const currentTime = dayjs(date);

  const isAvailable = formattedDisponibilites[dayOfWeek]?.some((range) => {
    const start = dayjs(currentTime)
      .hour(range.start.hour())
      .minute(range.start.minute())
      .second(0);
    const end = dayjs(currentTime)
      .hour(range.end.hour())
      .minute(range.end.minute())
      .second(0);
    const result =
      currentTime.isSameOrAfter(start) && currentTime.isSameOrBefore(end);
    return result;
  });

  if (!isAvailable) {
    style.backgroundColor = "#cccccc";
    style.opacity = "0.5";
  }

  return {
    style: style,
  };
};

export const eventStyleGetter = (event) => {
  let style = {
    backgroundColor: "",
    borderRadius: "0px",
    opacity: "0.7",
    color: "black",
    border: "0px",
    display: "block",
  };

  switch (event.type) {
    case "reservation":
      style.backgroundColor = "#9ecae1";
      break;
    case "indisponibility":
      style.backgroundColor = "#fb9a99";
      break;
    default:
      style.backgroundColor = "#cccccc";
      break;
  }
  return {
    style: style,
  };
};

export const translateMessage = {
  allDay: "Toute la journ�e",
  previous: "Pr�c�dent",
  next: "Suivant",
  today: "Aujourd'hui",
  month: "Mois",
  week: "Semaine",
  day: "Jour",
  agenda: "Agenda",
  date: "Date",
  time: "Heure",
  event: "�v�nement",
  noEventsInRange: "Aucun �v�nement dans cette p�riode.",
  showMore: (total) => `+ ${total} �v�nement(s) suppl�mentaire(s)`,
};
