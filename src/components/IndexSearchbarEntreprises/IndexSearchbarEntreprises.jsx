import React, { useState, useEffect } from 'react';
import { HiSearch } from "react-icons/hi";
import { getData } from '../../services/data-fetch';
import AsyncSelect from 'react-select/async';


const IndexSearchbarEntreprises = ({ setSearchResults }) => {
  const [error, setError] = useState(null);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  

  // Fonctions de chargement des options pour les AsyncSelect
  const loadOptions = async (inputValue, category) => {
    console.log(`Chargement des options pour ${category} avec la valeur saisie:`, inputValue);
    try {
      const response = await getData(`enterprises/validate`);
      console.log(`Réponse de l'API pour ${category}:`, response);
      let options;
      switch (category) {
        case 'job':
          options = response
            .filter(item => item.job && item.job.name && item.job.name.toLowerCase().includes(inputValue.toLowerCase()))
            .map(item => ({ label: item.job.name, value: item.job.id }));
          break;
        case 'country':
          options = response
            .filter(item => item.country && item.country.name && item.country.name.toLowerCase().includes(inputValue.toLowerCase()))
            .map(item => ({ label: item.country.name, value: item.id }));
          break;
        case 'city':
          options = response
            .filter(item => item.city && item.city.toLowerCase().includes(inputValue.toLowerCase()))
            .map(item => ({ label: item.city, value: item.id }));
          break;
        // Ajoutez d'autres cas au besoin
        default:
          options = [];
      }
      console.log(`Options filtrées pour ${category}:`, options);
      return options;
    } catch (error) {
      console.error(`Erreur lors du chargement des options pour ${category}:`, error);
      setError(`Une erreur est survenue lors du chargement des options pour ${category}.`);
      return [];
    }
  };
  // Fonction de recherche
  const performSearch = async () => {
    try {
      // Supposons que cette fonction récupère toutes les entreprises sans filtrage
      const response = await getData('enterprises/validate');

      // Affichage des sélections actuelles pour le débogage
      console.log('Sélections actuelles:', {
        jobs: selectedJobs,
        countries: selectedCountries,
        cities: selectedCities,
        ratings: selectedRatings
      });

       // Assurez-vous que les ID correspondent aux valeurs attendues
    console.log('Exemple de données reçues pour les jobs:', response.map(item => item.job));
    console.log('Exemple de données reçues pour les pays:', response.map(item => item.country));
    console.log('Exemple de données reçues pour les villes:', response.map(item => item.city));
    console.log('Exemple de données reçues pour les notes:', response.map(item => item.averageRating));

      // Filtrage des résultats en fonction des sélections de l'utilisateur
      const filteredResponse = response.filter(entreprise => {
        const jobMatch = selectedJobs.length === 0 || selectedJobs.some(job => entreprise.job && entreprise.job.name === job.label);
        const countryMatch = selectedCountries.length === 0 || selectedCountries.some(country => entreprise.country && entreprise.country.name === country.label);
        const cityMatch = selectedCities.length === 0 || selectedCities.some(city => entreprise.city === city.label);
        const ratingMatch = selectedRatings.length === 0 || selectedRatings.some(rating => entreprise.averageRating && entreprise.averageRating.toString() === rating.label);
        
        // Affichage des résultats de la correspondance pour le débogage
        console.log(`Résultats de la correspondance pour l'entreprise ${entreprise.name}:`, {
          jobMatch,
          countryMatch,
          cityMatch,
          ratingMatch
        });
        return jobMatch && countryMatch && cityMatch && ratingMatch;
      }).map(entreprise => ({
        ...entreprise,
        logo: JSON.parse(entreprise.logo || '[]') // Parsez le logo ici
      }));
      
      console.log('Filtrés:', filteredResponse);
      // Mise à jour des résultats de recherche
      setSearchResults(filteredResponse);
      console.log('Recherche effectuée avec les paramètres:', filteredResponse);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      setError('Une erreur est survenue lors de la recherche.');
    }
  };



  // Fonction pour annuler la dernière recherche
  const removeLastSearch = () => {
    // Réinitialisez l'état local des sélections
    setSelectedJobs([]);
    setSelectedCountries([]);
    setSelectedCities([]);
    setSelectedRatings([]);
    setSearchResults([]);
  };

  return (

    <div className="join pt-8 pb-10 rounded-full flex items-center justify-center">

      <AsyncSelect
        isMulti
        cacheOptions
        loadOptions={(inputValue) => loadOptions(inputValue, 'job')}
        onChange={(selectedOptions) => setSelectedJobs(selectedOptions.map(option => ({ label: option.label })))}
        defaultOptions
        value={selectedJobs}
        className="select-bordered join-item w-48 rounded-full"
        placeholder="Métiers"
        noOptionsMessage={() => "Aucun métier trouvé"}
        loadingMessage={() => "Chargement ..."}
      />

      <AsyncSelect
        cacheOptions
        isMulti
        loadOptions={(inputValue) => loadOptions(inputValue, 'country')}
        onChange={setSelectedCountries}
        defaultOptions
        value={selectedCountries}
        className="select-bordered join-item w-48"
        placeholder="Région"
        noOptionsMessage={() => "Aucune région trouvée"}
        loadingMessage={() => "Chargement ..."}
      />


      <AsyncSelect
        cacheOptions
        isMulti
        loadOptions={(inputValue) => loadOptions(inputValue, 'city')}
        onChange={setSelectedCities}
        value={selectedCities}
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

      <AsyncSelect
        cacheOptions
        isMulti
        loadOptions={(inputValue) => loadOptions(inputValue, 'averageRating')}
        onChange={setSelectedRatings}
        value={selectedRatings}
        defaultOptions
        className="select-bordered join-item w-24"
        placeholder="Notes"
        noOptionsMessage={() => "Pas de notes disponibles"}
        loadingMessage={() => "Chargement ..."}
      />

      <div className="indicator ">

        {error && <div className="alert alert-error">{error}</div>}

        <button onClick={removeLastSearch} className="btn join-item">Supprimer les critères de recherche</button>
        <button onClick={performSearch} className="btn join-item"><HiSearch /></button>
      </div>

    </div>



  );
};
export default IndexSearchbarEntreprises;