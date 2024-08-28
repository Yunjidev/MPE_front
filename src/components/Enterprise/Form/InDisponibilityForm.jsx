import PropTypes from "prop-types";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export default function InDisponibilityForm({ onSubmit }) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      start_date: moment(start).format("YYYY-MM-DD"),
      start_hour: moment(start).format("HH:mm"),
      end_date: moment(end).format("YYYY-MM-DD"),
      end_hour: moment(end).format("HH:mm"),
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="day">Jour</label>
      <label htmlFor="startDay">Date de début</label>
      <DatePicker
        selected={start}
        onChange={(date) => setStart(date)}
        showTimeSelect
        timeIntervals={15}
        dateFormat="YYYY-MM-DD HH:mm"
        timeFormat="HH:mm"
      />
      <label htmlFor="endDay">Date de fin</label>
      <DatePicker
        selected={end}
        onChange={(date) => setEnd(date)}
        showTimeSelect
        timeIntervals={15}
        dateFormat="YYYY-MM-DD HH:mm"
        timeFormat="HH:mm"
      />
      <button type="submit" className="mt-5">
        Ajouter
      </button>
    </form>
  );
}

InDisponibilityForm.propTypes = {
  onSubmit: PropTypes.func,
};
