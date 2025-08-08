/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { getData } from '../../services/data-fetch';
import './indexsearchbarentreprises.css';
import { toast } from "react-toastify";
import CitySelect from './FilterSelect/CitySelect';
import CountrySelect from './FilterSelect/Countryselect';
import JobSelect from './FilterSelect/Jobselect';
import PremiumCheckbox from './FilterSelect/PremiumCheckbox';
import RatingSelect, { renderRatingStars } from './FilterSelect/RatingSelect';
import { HiSearch } from "react-icons/hi";

const IndexSearchbarEntreprises = ({ setSearchResults, resetSearch }) => {
  const [error, setError] = useState(null);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]); // régions
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  // Helpers API publiques (sans auth)
  const fetchCitiesByName = async (q) => {
    const url = `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(q)}&fields=nom,codesPostaux,code,codeRegion&boost=population&limit=15`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`geo.api.gouv.fr communes ${res.status}`);
    return res.json();
  };

  const fetchRegionsByName = async (q) => {
    // l’API régions ne gère pas la pagination, on peut filtrer côté client si besoin
    const url = q && q.trim()
      ? `https://geo.api.gouv.fr/regions?nom=${encodeURIComponent(q)}`
      : `https://geo.api.gouv.fr/regions`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`geo.api.gouv.fr regions ${res.status}`);
    return res.json();
  };

  // AsyncSelect: fournit des options selon la catégorie
  const loadOptions = async (inputValue, category) => {
    try {
      switch (category) {
        case 'city': {
          if (!inputValue || inputValue.trim().length < 2) return [];
          const data = await fetchCitiesByName(inputValue.trim());
          // garder des noms uniques (pas de doublons par commune)
          const seen = new Set();
          const options = [];
          for (const c of data) {
            const name = c.nom?.trim();
            if (!name || seen.has(name.toLowerCase())) continue;
            seen.add(name.toLowerCase());
            // IMPORTANT: label === nom de ville (ton filtre compare entreprise.city === label)
            options.push({ label: name, value: name });
          }
          return options;
        }

        case 'country': { // ici = régions
          const data = await fetchRegionsByName(inputValue || "");
          // label = nom de région (ton filtre compare entreprise.country.name === label)
          return (data || []).map(r => ({
            label: r.nom,
            value: r.code, // code INSEE de région
          }));
        }

        case 'job': {
          // plutôt que scanner toutes les entreprises validées, utilisons l’endpoint jobs
          const jobs = await getData('jobs');
          const q = (inputValue || "").toLowerCase();
          return (jobs || [])
            .filter(j => j.name && j.name.toLowerCase().includes(q))
            .map(j => ({ label: j.name, value: j.id }));
        }

        case 'averageRating': {
          const response = await getData('enterprises/validate');
          const q = (inputValue || "").toString();
          return response
            .filter(item => item.averageRating && item.averageRating.toString().startsWith(q))
            .map(item => ({ label: item.averageRating, value: item.averageRating }))
            .sort((a, b) => b.value - a.value);
        }

        default:
          return [];
      }
    } catch (err) {
      console.error(`Erreur loadOptions(${category}) :`, err);
      toast.error(`Erreur lors du chargement des options pour ${category}.`);
      return [];
    }
  };

  const performSearch = async () => {
    try {
      const response = await getData('enterprises/validate');

      const filteredResponse = response.filter(entreprise => {
        const jobMatch =
          selectedJobs.length === 0 ||
          selectedJobs.some(job => entreprise.job && entreprise.job.name === job.label);

        // ICI: les "countries" sont des **régions** : on compare le nom de région
        const countryMatch =
          selectedCountries.length === 0 ||
          selectedCountries.some(country => entreprise.country && entreprise.country.name === country.label);

        const cityMatch =
          selectedCities.length === 0 ||
          selectedCities.some(city => entreprise.city === city.label);

        const ratingMatch =
          selectedRatings.length === 0 ||
          selectedRatings.some(rating =>
            entreprise.averageRating &&
            parseFloat(entreprise.averageRating.toFixed(2)) === parseFloat(rating.label)
          );

        return jobMatch && countryMatch && cityMatch && ratingMatch;
      }).map(entreprise => ({
        ...entreprise,
        logo: entreprise.logo
      }));

      setSearchResults(filteredResponse);
      if (filteredResponse.length === 0) {
        toast.info('Aucun résultat ne correspond à votre recherche.');
      }
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      toast.error('Une erreur est survenue lors de la recherche.');
      setError('Une erreur est survenue lors de la recherche.');
    }
  };

  const removeLastSearch = () => {
    setSelectedJobs([]);
    setSelectedCountries([]);
    setSelectedCities([]);
    setSelectedRatings([]);
    resetSearch();
  };

  return (
    <div className="join pt-8 pb-10 flex flex-wrap items-center justify-center">
      <JobSelect
        selectedJobs={selectedJobs}
        setSelectedJobs={setSelectedJobs}
        loadOptions={loadOptions}
      />
      <CountrySelect
        selectedCountries={selectedCountries}
        setSelectedCountries={setSelectedCountries}
        loadOptions={loadOptions}  // ← maintenant alimente depuis geo.api.gouv.fr/regions
      />
      <CitySelect
        selectedCities={selectedCities}
        setSelectedCities={setSelectedCities}
        loadOptions={loadOptions}   // ← maintenant alimente depuis geo.api.gouv.fr/communes
      />
      <RatingSelect
        selectedRatings={selectedRatings}
        setSelectedRatings={setSelectedRatings}
        loadOptions={loadOptions}
        renderRatingStars={renderRatingStars}
      />
      <PremiumCheckbox />
      <div className="indicator flex gap-2">
        <button onClick={removeLastSearch} className="custom-btn">Supprimer les critères de recherche</button>
        <button onClick={performSearch} className="custom-btn perform-search"><HiSearch /></button>
      </div>
    </div>
  );
};

export default IndexSearchbarEntreprises;
