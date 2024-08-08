import React, { useState, useEffect } from 'react';
import { HiSearch } from "react-icons/hi";
import { getData } from '../../services/data-fetch';
import AsyncSelect from 'react-select/async';


const IndexSearchbarEntreprises = ({ updateSearchCriteria, handleSearch }) => {
  const [error, setError] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState({
    job: '',
    country: '',
    city: '',
    subscription: false,
  });


  const loadJobOptions = async (inputValue) => {
    try {
      const jobsData = await getData('jobs');
      return jobsData.filter(job => job.name.toLowerCase().includes(inputValue.toLowerCase()))
        .map(job => ({ label: job.name, value: job.id }));
    } catch (error) {
      setError('Une erreur est survenue lors du chargement des données.');
      console.error('Erreur lors de la récupération des jobs:', error);
      return [];
    }
  };

  const loadCountryOptions = async (inputValue) => {
    try {
      const countriesData = await getData('countries');
      return countriesData.filter(country => country.name.toLowerCase().includes(inputValue.toLowerCase()))
        .map(country => ({ label: country.name, value: country.id }));
    } catch (error) {
      setError('Une erreur est survenue lors du chargement des données.');
      console.error('Erreur lors de la récupération des jobs:', error);
      return [];
    }
  };

  const loadCityOptions = async (inputValue) => {
    try {
      const enterprisesData = await getData('enterprises');
      const citiesData = enterprisesData.map(enterprise => enterprise.city);
      const uniqueCities = Array.from(new Set(citiesData)); // Supprime les doublons
      return uniqueCities.filter(city => city.toLowerCase().includes(inputValue.toLowerCase()))
        .map(city => ({ label: city, value: city }));
    } catch (error) {
      setError('Une erreur est survenue lors du chargement des données.');
      console.error('Erreur lors de la récupération des jobs:', error);
      return [];
    }
  };

  const resetSearch = () => {
    setSearchCriteria({
      job: '',
      country: '',
      city: '',
      subscription: false,
    });
  };

  return (

    <div className="join pt-8 pb-10 rounded-full flex items-center justify-center">



      <AsyncSelect
        cacheOptions
        loadOptions={loadJobOptions}
        defaultOptions
        onChange={(selectedOption) => updateSearchCriteria('job', selectedOption.value)}
        className="select-bordered join-item w-48 rounded-full"
        placeholder="Métiers"
        noOptionsMessage={() => "Aucun métier trouvé"}
        loadingMessage={() => "Chargement ..."}
      />


      <AsyncSelect
        cacheOptions
        loadOptions={loadCountryOptions}
        defaultOptions
        onChange={(selectedOption) => updateSearchCriteria('country', selectedOption.value)}
        className="select-bordered join-item w-48"
        placeholder="Région"
        noOptionsMessage={() => "Aucune région trouvée"}
        loadingMessage={() => "Chargement ..."}
      />


      <AsyncSelect
        cacheOptions
        loadOptions={loadCityOptions}
        defaultOptions
        onChange={(selectedOption) => updateSearchCriteria('city', selectedOption.value)}
        className="select-bordered join-item w-48"
        placeholder="Ville"
        noOptionsMessage={() => "Aucune ville trouvée"}
        loadingMessage={() => "Chargement ..."}
      />



      <div className=" select-bordered join-item w-48 rounded-full appearance-none">
        <label className="cursor-pointer label flex items-center">
          <span className="label-text mr-2">Premium</span>
          <input type="checkbox" defaultChecked className="checkbox checkbox-accent" />
        </label>
      </div>

      <select className="select-bordered join-item">
        <option disabled selected>Prix ou  Rating ?</option>
        <option>Moins cher</option>
        <option>Plus cher</option>

      </select>
      <div className="indicator">
        <button onClick={resetSearch} className="btn">Réinitialiser</button>
        <button onClick={handleSearch} className="btn join-item"><HiSearch /></button>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
    </div>

  );
};



export default IndexSearchbarEntreprises;