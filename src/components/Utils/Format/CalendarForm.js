export const CustomPropGetter = (date, disponibilities) => {
  const daysOfWeek = [
    "Dimanche",
    "Lundi ",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  console.log("date", date);
  console.log("disponibilities", disponibilities);
  const dayOfWeek = daysOfWeek[date.getDay()];
  const minutesOfDay = date.getHours() * 60 + date.getMinutes();
  const dayDisponibilities = disponibilities.filter(
    (dispo) => dispo.day === dayOfWeek,
  );

  const unavailableRanges = [];
  let previousEndTime = 0;

  dayDisponibilities.forEach((dispo) => {
    const startTime = dispo.start_hour
      .split(":")
      .reduce((acc, time) => 60 * acc + +time, 0);
    const endTime = dispo.end_hour
      .split(":")
      .reduce((acc, time) => 60 * acc + +time, 0);

    if (previousEndTime < startTime) {
      unavailableRanges.push({
        start: previousEndTime,
        end: startTime,
      });
    }

    previousEndTime = endTime;
  });

  if (previousEndTime < 1440) {
    unavailableRanges.push({
      start: previousEndTime,
      end: 1440,
    });
  }

  const isInUnavailableRange = unavailableRanges.some((range) => {
    return minutesOfDay >= range.start && minutesOfDay < range.end;
  });

  if (isInUnavailableRange) {
    return {
      className: "rbc-off-range-bg",
      style: {
        backgroundColor: "red",
        opacity: "0.7",
        pointerEvents: "none",
      },
    };
  }

  return {};
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
    case "réservation":
      style.backgroundColor = "#9ecae1";
      break;
    case "indisponibilité":
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
