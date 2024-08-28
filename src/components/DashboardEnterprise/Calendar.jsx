import PropTypes from "prop-types";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import {
  CustomPropGetter,
  eventStyleGetter,
} from "../Utils/Format/CalendarForm";

const localizer = momentLocalizer(moment);

export default function CalendarComponent({
  events,
  disponibilities,
  indisponibilities,
}) {
  const allEvents = [
    ...events,
    ...indisponibilities.map((indispo) => ({
      start: new Date(
        `${indispo.start_date.split("T")[0]}T${indispo.start_hour}`,
      ),
      end: new Date(`${indispo.end_date.split("T")[0]}T${indispo.end_hour}`),
      title: "Indisponibilité",
      type: "indisponibilité",
    })),
  ];
  return (
    <Calendar
      localizer={localizer}
      events={allEvents}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "75%", width: "50%" }}
      dayPropGetter={(date) => CustomPropGetter(date, disponibilities)}
      timeSlotPropGetter={(date) => CustomPropGetter(date, disponibilities)}
      eventPropGetter={eventStyleGetter}
      step={15}
      timeslots={4}
    />
  );
}

CalendarComponent.propTypes = {
  events: PropTypes.array,
  disponibilities: PropTypes.array,
  indisponibilities: PropTypes.array,
};
