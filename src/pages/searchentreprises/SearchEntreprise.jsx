import React, { useEffect, useState } from "react";
import IndexSearchbarEntreprises from "../../components/IndexSearchbarEntreprises/IndexSearchbarEntreprises";
import IndexCardsEntreprises from "../../components/CardsEntreprises/IndexCardsEntreprises";
import { getData } from "../../services/data-fetch";


const SearchEntreprise = () => {
    const [entreprises, setEntreprises] = useState([]);
    const [disponibilities, setDisponibilites] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [noResultsMessage, setNoResultsMessage] = useState(null);
    const [searchCriteria, setSearchCriteria] = useState({
        job: '',
        country: '',
        city: '',
        subscription: false,
        
    });

    useEffect(() => {
        const fetchEntreprises = async () => {
            try {
                const response = await getData("enterprises");
                // console.log(response);
                setEntreprises(response);

            } catch (error) {
                console.error('Error fetching entreprises:', error);
            }
        };

        const fetchDisponibilites = async () => {
            try {
                const disponibilitesResponse = await getData("disponibilities");
                // console.log(disponibilitesResponse);
                const sortedDisponibilites = disponibilitesResponse.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                const futureDisponibilites = sortedDisponibilites.filter(d => new Date(d.createdAt) > new Date());
                setDisponibilites(futureDisponibilites);

            } catch (error) {
                console.error('Error fetching disponibilites:', error);
            }
        };

        fetchEntreprises();
        fetchDisponibilites();

    }, []);

    const handleSearch = () => {
        const filteredEnterprises = entreprises.filter(entreprise => {
            return (
                (searchCriteria.job ? entreprise.Job_id === searchCriteria.job : true) &&
                (searchCriteria.country ? entreprise.Country_id === searchCriteria.country : true) &&
                (searchCriteria.city ? entreprise.city === searchCriteria.city : true) &&
                (searchCriteria.subscription ? entreprise.isSubscription : true) // Supposons que vous avez un champ isPremium dans vos données d'entreprise
                // Ajoutez d'autres conditions de recherche si nécessaire
            );
        });
        if (filteredEnterprises.length === 0) {
            setNoResultsMessage(
            <div className="alert alert-info mb-4">
                <span>Le critère ne correspond à aucune entreprise pour le moment</span>
              </div>
            );
      setSearchResults([]); // Utilisez un tableau vide pour indiquer qu'aucun résultat n'a été trouvé
    } else {
      setNoResultsMessage('');
      setSearchResults(filteredEnterprises);
    }
  };

    // Mettez à jour les critères de recherche en fonction des sélections de l'utilisateur
    const updateSearchCriteria = (criteria, value) => {
        setSearchCriteria({ ...searchCriteria, [criteria]: value });
    };

    // Rendu des résultats de recherche ou de toutes les entreprises si aucune recherche n'a été effectuée
    const displayEnterprises = searchResults.length > 0 ? searchResults : entreprises;

    return (
        <div className="font-sans flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-center text-2xl sm:text-3xl font-bold mb-4 dark:text-white">Recherchez vos entreprises</h1>
            <IndexSearchbarEntreprises updateSearchCriteria={updateSearchCriteria} handleSearch={handleSearch} />
            {noResultsMessage}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 md:gap-12 lg:gap-6">
                {displayEnterprises.map((entreprise) => {
                    const entrepriseDisponibilites = disponibilities.filter(d => d.Enterprise_id === entreprise.id);
                    return (
                        <IndexCardsEntreprises key={entreprise.id} entreprise={entreprise} disponibilites={entrepriseDisponibilites} />
                    );
                })}
            </div>
        </div>
    );
};

export default SearchEntreprise;