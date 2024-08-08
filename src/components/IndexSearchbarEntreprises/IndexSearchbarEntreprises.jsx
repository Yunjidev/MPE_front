import React, { useState, useEffect } from 'react';
import { HiSearch } from "react-icons/hi";
import { getData } from '../../services/data-fetch';
import AsyncSelect from 'react-select/async';





const IndexSearchbarEntreprises = ({ setSearchCriteria, handleSearch }) => {
  const [error, setError] = useState(null);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

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

  // Fonction pour gérer la sélection multiple des jobs
  const handleJobChange = (selectedOptions) => {
    setSelectedJobs(selectedOptions);
    setSearchCriteria(prevState => ({ ...prevState, job: selectedOptions.map(option => option.value) }));
  };

  // Fonction pour gérer la sélection multiple des pays
  const handleCountryChange = (selectedOptions) => {
    setSelectedCountries(selectedOptions);
    setSearchCriteria(prevState => ({ ...prevState, country: selectedOptions.map(option => option.value) }));
  };

  // Fonction pour gérer la sélection multiple des villes
  const handleCityChange = (selectedOptions) => {
    setSelectedCities(selectedOptions);
    setSearchCriteria(prevState => ({ ...prevState, city: selectedOptions.map(option => option.value) }));
  };

  // Fonction pour annuler la dernière recherche
  const removeLastSearch = () => {
    // Réinitialisez l'état local des sélections
    setSelectedJobs([]);
    setSelectedCountries([]);
    setSelectedCities([]);

    // Réinitialisez l'état global de recherche
    setSearchCriteria({
      job: [],
      country: [],
      city: [],
      subscription: false,
    });
    // Déclenchez une nouvelle recherche pour afficher les résultats par défaut
    handleSearch();
  };



  return (

    <div className="join pt-8 pb-10 rounded-full flex items-center justify-center">



      <AsyncSelect
        isMulti
        cacheOptions
        loadOptions={loadJobOptions}
        defaultOptions
        value={selectedJobs}
        onChange={handleJobChange}

        className="select-bordered join-item w-48 rounded-full"
        placeholder="Métiers"
        noOptionsMessage={() => "Aucun métier trouvé"}
        loadingMessage={() => "Chargement ..."}
      />


      <AsyncSelect
        cacheOptions
        isMulti
        loadOptions={loadCountryOptions}
        defaultOptions
        value={selectedCountries}
        onChange={handleCountryChange}

        className="select-bordered join-item w-48"
        placeholder="Région"
        noOptionsMessage={() => "Aucune région trouvée"}
        loadingMessage={() => "Chargement ..."}
      />


      <AsyncSelect
        cacheOptions
        isMulti
        loadOptions={loadCityOptions}
        value={selectedCities}
        onChange={handleCityChange}
        defaultOptions

        className="select-bordered join-item w-48"
        placeholder="Ville"
        noOptionsMessage={() => "Aucune ville trouvée"}
        loadingMessage={() => "Chargement ..."}
      />



      <div className="border border-gray-300 bg-white rounded w-32 p-2" style={{ height: '39px' }}>
        <label className="flex items-center cursor-pointer">
          <span className="text-gray-500 mr-5">Premium</span>
          <input type="checkbox" defaultChecked className="checkbox checkbox-accent" />
          <span className="checkmark"></span>
        </label>
      </div>

      <select className="select-bordered join-item">
        <option disabled selected>Prix ou  Rating ?</option>
        <option>Moins cher</option>
        <option>Plus cher</option>

      </select>
      <div className="indicator">
        <button onClick={removeLastSearch} className="btn join-item">Supprimer les critères de recherche</button>
        <button onClick={handleSearch} className="btn join-item"><HiSearch /></button>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
    </div>

  );
};



export default IndexSearchbarEntreprises;