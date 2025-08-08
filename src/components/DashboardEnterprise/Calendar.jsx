import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Calendar } from "react-big-calendar";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  formatDisponibility,
  formatIndisponibility,
  formatReservations,
} from "../Utils/Format/Time";
import {
  slotStyleGetter,
  eventStyleGetter,
  translateMessage,
} from "../Utils/Format/CalendarForm";
import "./calendar.css";

// Setup the localizer for proper date formatting
dayjs.locale("fr");
const localizer = dayjsLocalizer(dayjs);

const CustomCalendar = ({
  disponibilities,
  indisponibilities,
  reservations,
}) => {
  const [events, setEvents] = useState([]);
  const messages = translateMessage;
  const slotStyle = (date) =>
    slotStyleGetter(date, formatDisponibility(disponibilities));

  useEffect(() => {
    const formattedIndisponibilities = Array.isArray(
      formatIndisponibility(indisponibilities),
    )
      ? formatIndisponibility(indisponibilities)
      : [];
    const formattedReservations = Array.isArray(
      formatReservations(reservations),
    )
      ? formatReservations(reservations)
      : [];

    const allEvents = [...formattedReservations, ...formattedIndisponibilities];
    setEvents(allEvents);
  }, [disponibilities, indisponibilities, reservations]);

  const handleEventDrop = ({ event, start, end }) => {
    const updatedEvents = events.map((e) =>
      e.id === event.id ? { ...e, start, end } : e,
    );
    console.log(updatedEvents);
    setEvents(updatedEvents);
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "75vh" }}
        eventPropGetter={eventStyleGetter}
        slotPropGetter={slotStyle}
        onEventDrop={handleEventDrop}
        messages={messages}
        draggableAccessor={() => true}
        timeslots={1}
        step={60}
      />
    </div>
  );
};

export default CustomCalendar;

CustomCalendar.propTypes = {
  disponibilities: PropTypes.arrayOf(PropTypes.object),
  indisponibilities: PropTypes.arrayOf(PropTypes.object),
  reservations: PropTypes.arrayOf(PropTypes.object),
};
