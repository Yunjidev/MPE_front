import moment from "moment";

export const slotStyleGetter = (date, formattedDisponibilites) => {
  const style = {
    backgroundColor: "",
  };

  const dayOfWeekTranslation = {
    Sunday: "Dimanche",
    Monday: "Lundi",
    Tuesday: "Mardi",
    Wednesday: "Mercredi",
    Thursday: "Jeudi",
    Friday: "Vendredi",
    Saturday: "Samedi",
  };

  const dayOfWeekInEnglish = moment(date).format("dddd");
  const dayOfWeek = dayOfWeekTranslation[dayOfWeekInEnglish];
  const currentTime = moment(date);

  const isAvailable = formattedDisponibilites[dayOfWeek]?.some((range) => {
    const start = moment(currentTime).set({
      hour: range.start.hour(),
      minute: range.start.minute(),
    });
    const end = moment(currentTime).set({
      hour: range.end.hour(),
      minute: range.end.minute(),
    });
    return currentTime.isBetween(start, end, null, "[]");
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
