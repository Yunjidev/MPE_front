// CountryList.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MdOutlineAreaChart } from "react-icons/md";

const CountryList = ({ selectedRegion, onSelectRegion }) => {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/countries");
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        const data = await response.json();

        // Sort countries alphabetically by name
        const sortedCountries = data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setCountries(sortedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError("Impossible de charger les pays.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="relative flex items-center">
      <MdOutlineAreaChart className="absolute left-3 text-gray-400" />
      <select
        id="region"
        value={selectedRegion} // Use selectedRegion prop here
        onChange={(e) => onSelectRegion(e.target.value)} // Use onSelectRegion prop here
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
