import PropTypes from "prop-types";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Input from "../../Utils/Inputs/Input";

export default function DisponibilityForm({ onSubmit }) {
  const [days, setDays] = useState([]);
  const [start_hour, setStartHour] = useState("");
  const [end_hour, setEndHour] = useState("");
  const weekDays = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  const handleCheckboxChange = (day) => {
    const newDays = [...days];
    if (newDays.includes(day)) {
      newDays.splice(newDays.indexOf(day), 1);
    } else {
      newDays.push(day);
    }
    setDays(newDays);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      day: days,
      start_hour: moment(start_hour).format("HH:mm"),
      end_hour: moment(end_hour).format("HH:mm"),
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="day">Jour</label>
      {weekDays.map((day, index) => (
        <Input.Checkbox
          key={index}
          id={day}
          name="day"
          label={day}
          value={day}
          checked={days.includes(day)}
          onChange={(e) => handleCheckboxChange(e.target.value)}
        />
      ))}
      <label htmlFor="startHour">Heure de début</label>
      <DatePicker
        selected={start_hour}
        onChange={(date) => setStartHour(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeFormat="HH:mm"
      />
      <label htmlFor="endHour">Heure de fin</label>
      <DatePicker
        selected={end_hour}
        onChange={(date) => setEndHour(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        dateFormat="HH:mm"
      />
      <button type="submit" className="mt-5">
        Ajouter
      </button>
    </form>
  );
}

DisponibilityForm.propTypes = {
  onSubmit: PropTypes.func,
};
