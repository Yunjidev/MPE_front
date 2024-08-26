import { useState } from 'react';

export const useSelectedState = () => {
  const [error, setError] = useState(null);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const resetAll = () => {
    setError(null);
    setSelectedJobs([]);
    setSelectedCountries([]);
    setSelectedCities([]);
    setSelectedRatings([]);
  };

  return {
    error,
    selectedJobs,
    setSelectedJobs,
    selectedCountries,
    setSelectedCountries,
    selectedCities,
    setSelectedCities,
    selectedRatings,
    setSelectedRatings,
    resetAll
  };
};