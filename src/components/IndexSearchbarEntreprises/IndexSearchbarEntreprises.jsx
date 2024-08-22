import React, { useState } from 'react';
import { HiSearch } from "react-icons/hi";
import { getData } from '../../services/data-fetch';
import './indexsearchbarentreprises.css';
import { toast } from "react-toastify";
import Rating from 'react-rating-stars-component';
import { FaMapMarkerAlt } from "react-icons/fa";
import CitySelect from './CitySelect';
import CountrySelect from './Countryselect';
import JobSelect from './Jobselect';
import PremiumCheckbox from './PremiumCheckbox';
import RatingSelect from './RatingSelect';
import Localisation from './Localisation';


const IndexSearchbarEntreprises = ({ setSearchResults, resetSearch }) => {
  const [error, setError] = useState(null);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);


  // Fonctions de chargement des options pour les AsyncSelect
  const loadOptions = async (inputValue, category) => {
    // console.log(`Chargement des options pour ${category} avec la valeur saisie:`, inputValue);
    try {
      const response = await getData(`enterprises/validate`);
      // console.log(`Réponse de l'API pour ${category}:`, response);
      if (category === 'city') {
        const uniqueCities = new Set();
        const options = response
          .filter(item => item.city && item.city.toLowerCase().includes(inputValue.toLowerCase()))
          .filter(item => {
            const cityLowerCase = item.city.toLowerCase();
            if (!uniqueCities.has(cityLowerCase)) {
              uniqueCities.add(cityLowerCase);
              return true;
            }
            return false;
          })
          .map(item => ({ label: item.city, value: item.id }));
        return options;
      }

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

        case 'averageRating':
          options = response
            .filter(item => item.averageRating && item.averageRating.toString().startsWith(inputValue))
            .map(item => ({ label: item.averageRating, value: item.averageRating }));
          break;
        default:
          options = [];
      }
      // console.log(`Options filtrées pour ${category}:`, options);
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
      // console.log('Sélections actuelles:', {
      //   jobs: selectedJobs,
      //   countries: selectedCountries,
      //   cities: selectedCities,
      //   ratings: selectedRatings
      // });

      // // Assurez-vous que les ID correspondent aux valeurs attendues
      // console.log('Exemple de données reçues pour les jobs:', response.map(item => item.job));
      // console.log('Exemple de données reçues pour les pays:', response.map(item => item.country));
      // console.log('Exemple de données reçues pour les villes:', response.map(item => item.city));
      // console.log('Exemple de données reçues pour les notes:', response.map(item => item.averageRating));

      // Filtrage des résultats en fonction des sélections de l'utilisateur
      const filteredResponse = response.filter(entreprise => {
        const jobMatch = selectedJobs.length === 0 || selectedJobs.some(job => entreprise.job && entreprise.job.name === job.label);
        const countryMatch = selectedCountries.length === 0 || selectedCountries.some(country => entreprise.country && entreprise.country.name === country.label);
        const cityMatch = selectedCities.length === 0 || selectedCities.some(city => entreprise.city === city.label);
        const ratingMatch = selectedRatings.length === 0 || selectedRatings.some(rating => entreprise.averageRating && entreprise.averageRating.toString() === rating.label);

        // Affichage des résultats de la correspondance pour le débogage
        // console.log(`Résultats de la correspondance pour l'entreprise ${entreprise.name}:`, {
        //   jobMatch,
        //   countryMatch,
        //   cityMatch,
        //   ratingMatch
        // });
        return jobMatch && countryMatch && cityMatch && ratingMatch;
      }).map(entreprise => ({
        ...entreprise,
        logo: entreprise.logo
      }));

      // console.log('Filtrés:', filteredResponse);
      // Mise à jour des résultats de recherche
      setSearchResults(filteredResponse);
      // console.log('Recherche effectuée avec les paramètres:', filteredResponse);
      // Si auncun resultat ne correspond à la recherche, afficher une erreur
      if (filteredResponse.length === 0) {
        toast.info('Aucun résultat ne correspond à votre recherche.');
      }
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

  // Fonction pour afficher les étoiles de notation
  const renderRatingStars = (ratingValue) => {
    return (
      <Rating
        count={5}
        value={ratingValue}
        size={24}
        activeColor="#ffd700"
        isHalf={true}
        edit={false}
      />
    );
  };

  return (
    <div className="join pt-8 pb-10 flex items-center justify-center">
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="custom-localisation-btn" onClick={() => document.getElementById('my_modal_1').showModal()}>Localisation<FaMapMarkerAlt /></button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          
          
          <Localisation setSearchResults={setSearchResults} />
          <div className="modal-action">
            <form method="dialog">
              
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <JobSelect selectedJobs={selectedJobs} setSelectedJobs={setSelectedJobs} loadOptions={loadOptions} />
      <CountrySelect selectedCountries={selectedCountries} setSelectedCountries={setSelectedCountries} loadOptions={loadOptions} />
      <CitySelect selectedCities={selectedCities} setSelectedCities={setSelectedCities} loadOptions={loadOptions} />
      <RatingSelect selectedRatings={selectedRatings} setSelectedRatings={setSelectedRatings} loadOptions={loadOptions} renderRatingStars={renderRatingStars} />
      <PremiumCheckbox />
      <div className="indicator flex gap-2">
        <button onClick={removeLastSearch} className="custom-btn">Supprimer les critères de recherche</button>
        <button onClick={performSearch} className="custom-btn perform-search"><HiSearch /></button>
      </div>
    </div>
  );
};

export default IndexSearchbarEntreprises;
