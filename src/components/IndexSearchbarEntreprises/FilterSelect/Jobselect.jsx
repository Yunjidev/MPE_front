/* eslint-disable react/prop-types */
import AsyncSelect from "react-select/async";
import { selectClassNames } from "./selectTw";
import { getData } from "../../../services/data-fetch";

const JobSelect = ({ selectedJobs, setSelectedJobs }) => {
  const loadOptions = async (inputValue) => {
    const jobs = await getData("jobs");
    const q = (inputValue || "").toLowerCase();
    return (jobs || [])
      .filter((j) => j.name && j.name.toLowerCase().includes(q))
      .map((j) => ({ label: j.name, value: j.id }));
  };

  const handleChange = (selectedOptions) => {
    const transformed = (selectedOptions || []).map((opt) => ({
      label: opt.label,
      value: opt.value || opt.label,
    }));
    setSelectedJobs(transformed);
  };

  return (
    <AsyncSelect
      isMulti
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      value={selectedJobs}
      onChange={handleChange}
      placeholder="Métiers"
      noOptionsMessage={() => "Aucun métier trouvé"}
      loadingMessage={() => "Chargement ..."}
      classNames={selectClassNames}
      unstyled
    />
  );
};

export default JobSelect;
