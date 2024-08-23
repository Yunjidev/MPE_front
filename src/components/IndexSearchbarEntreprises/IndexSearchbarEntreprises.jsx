import React, { useState } from 'react';
import { getData } from '../../services/data-fetch';
import './indexsearchbarentreprises.css';
import { toast } from "react-toastify";
import Rating from 'react-rating-stars-component';
import { TfiTarget } from "react-icons/tfi";
import CitySelect from './FilterSelect/CitySelect';
import CountrySelect from './FilterSelect/Countryselect';
import JobSelect from './FilterSelect/Jobselect';
import PremiumCheckbox from './FilterSelect/PremiumCheckbox';
import RatingSelect from './FilterSelect/RatingSelect';
import Localisation from './LocalisationFilter/Localisation';
import SearchFilter from './SearchFilter';


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
      <button className="custom-localisation-btn flex items-center justify-center" onClick={() => document.getElementById('my_modal_1').showModal()}>
        <TfiTarget className="ml-4"/>
        <span>Au tour de moi</span>
      </button>
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
        <SearchFilter setSearchResults={setSearchResults} resetSearch={resetSearch} />
      </div>
    </div>
  );
};

export default IndexSearchbarEntreprises;
