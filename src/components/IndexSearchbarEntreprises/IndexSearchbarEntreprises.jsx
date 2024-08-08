import React, { useState, useEffect } from 'react';
import { HiSearch } from "react-icons/hi";
import { getData } from '../../services/data-fetch';
import AsyncSelect from 'react-select/async';


const IndexSearchbarEntreprises = ({ updateSearchCriteria, handleSearch }) => {
  const [jobs, setJobs] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsData = await getData('jobs');
        const countriesData = await getData('countries');
        const enterprisesData = await getData('enterprises');
        const citiesData = enterprisesData.map(enterprise => enterprise.city);
        const uniqueCities = Array.from(new Set(citiesData)); // Supprime les doublons
        setCities(uniqueCities);

        setJobs(jobsData);
        setCountries(countriesData);

      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <span className="loading loading-bars loading-lg"></span>;
  }

  const handleJobChange = (event) => {
    updateSearchCriteria('job', event.target.value);
  };

  const handleCountryChange = (event) => {
    updateSearchCriteria('country', event.target.value);
  };

  const handleCityChange = (event) => {
    updateSearchCriteria('city', event.target.value);
  };


  return (
    <div className="join pt-8 pb-10 rounded-full flex items-center justify-center">

      <select onChange={handleJobChange} className="select select-bordered join-item w-48 rounded-full">
        <option disabled selected>Métiers</option>
        {jobs.map(job => (
          <option key={job.id} value={job.name}>{job.name}</option>
        ))}
      </select>
      <select onChange={handleCountryChange} className="select select-bordered join-item w-48">
        <option disabled selected>Région</option>
        {countries.map(country => (
          <option key={country.id} value={country.name}>{country.name}</option>
        ))}
      </select>
      <select onChange={handleCityChange} className="select select-bordered join-item w-48">
        <option disabled selected>Ville</option>

        {cities.map((city, index) => (
          <option key={index} value={city}>{city}</option>

        ))}
      </select>


      <div className="select select-bordered join-item w-48 rounded-full appearance-none">
        <label className="cursor-pointer label flex items-center">
          <span className="label-text mr-2">Premium</span>
          <input type="checkbox" defaultChecked className="checkbox checkbox-accent" />
        </label>
      </div>

      <select className="select select-bordered join-item">
        <option disabled selected>Prix ou  Rating ?</option>
        <option>Moins cher</option>
        <option>Plus cher</option>

      </select>
      <div className="indicator">

        <button onClick={handleSearch} className="btn join-item"><HiSearch /></button>
      </div>
    </div>
  );
};



export default IndexSearchbarEntreprises;