import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/fr";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  formatDisponibility,
  formatIndisponibility,
  formatReservations,
} from "../Utils/Format/Time";
import {
  slotStyleGetter,
  eventStyleGetter,
} from "../Utils/Format/CalendarForm";

// Setup the localizer for proper date formatting
moment.locale("fr");
const localizer = momentLocalizer(moment);

const CustomCalendar = ({
  disponibilities,
  indisponibilities,
  reservations,
}) => {
  const [events, setEvents] = useState([]);
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
        draggableAccessor={() => true}
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
