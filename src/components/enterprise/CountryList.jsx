// CountryList.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MdOutlineAreaChart } from "react-icons/md";
import { getData } from "../../services/data-fetch";

const CountryList = ({ selectedRegion, onSelectRegion }) => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      const data = await getData("countries");
      const sortedCountries = data.sort((a, b) => a.name.localeCompare(b.name));
      setCountries(sortedCountries);
      setLoading(false);
    };
    fetchCountries().catch((error) => {
      console.error("Error fetching countries:", error);
      setError("Impossible de charger les pays.");
      setLoading(false);
    });
  }, []);

  return (
    <div className="relative flex items-center">
      <MdOutlineAreaChart className="absolute left-3 text-gray-400" />
      <select
        id="region"
        value={selectedRegion}
        onChange={(e) => onSelectRegion(e.target.value)}
        className="w-full pl-10 pr-3 py-2 rounded-xl bg-neutral-800 text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        <option value="">Sélectionner une région</option>
        {countries.map((country) => (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

CountryList.propTypes = {
  selectedRegion: PropTypes.string.isRequired,
  onSelectRegion: PropTypes.func.isRequired,
};

export default CountryList;
