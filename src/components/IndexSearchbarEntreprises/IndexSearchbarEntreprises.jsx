import React, { useState } from 'react';
import { HiSearch } from "react-icons/hi";
import { getData } from '../../services/data-fetch';
import AsyncSelect from 'react-select/async';
import './indexsearchbarentreprises.css';
import { toast } from "react-toastify";



const IndexSearchbarEntreprises = ({ setSearchResults, resetSearch }) => {
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
      toast.error(`Une erreur est survenue lors du chargement des options pour ${category}.`);
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
      toast.error('Une erreur est survenue lors de la recherche.');
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
    resetSearch();
  };

  return (

    <div className="join pt-8 pb-10  flex items-center justify-center">

      <AsyncSelect
        isMulti
        cacheOptions
        loadOptions={(inputValue) => loadOptions(inputValue, 'job')}
        onChange={(selectedOptions) => setSelectedJobs(selectedOptions.map(option => ({ label: option.label })))}
        defaultOptions
        value={selectedJobs}
        classNamePrefix="react-select-container"
        className="react-select-container first-select"
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
        classNamePrefix="react-select-container"
        className="react-select-container"
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
        classNamePrefix="react-select-container"
        className="react-select-container"
        placeholder="Ville"
        noOptionsMessage={() => "Aucune ville trouvée"}
        loadingMessage={() => "Chargement ..."}
      />



<div className="checkbox-container">
  <label className="checkbox-label">
    Premium
    <input type="checkbox" defaultChecked className="checkbox" />
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
        classNamePrefix="react-select-container"
        className="react-select-container"
        placeholder="Notes"
        noOptionsMessage={() => "Pas de notes disponibles"}
        loadingMessage={() => "Chargement ..."}
      />

      <div className="indicator flex gap-2">
        
        <button onClick={removeLastSearch} className="custom-btn">Supprimer les critères de recherche</button>
        <button onClick={performSearch} className="custom-btn perform-search"><HiSearch /></button>
      </div>

      

    </div>



  );
};
export default IndexSearchbarEntreprises;