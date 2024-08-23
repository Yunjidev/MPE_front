import React, { useState } from 'react';
import { getData } from '../../services/data-fetch';
import { toast } from "react-toastify";
import { HiSearch } from "react-icons/hi";

const SearchFilter = ({ setSearchResults, resetSearch }) => {
    const [error, setError] = useState(null);
    const [selectedJobs, setSelectedJobs] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [selectedCities, setSelectedCities] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);

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

    return (
        <>
            <button onClick={removeLastSearch} className="custom-btn">Supprimer les critères de recherche</button>
            <button onClick={performSearch} className="custom-btn perform-search"><HiSearch /></button>
        </>
    );
};

export default SearchFilter;