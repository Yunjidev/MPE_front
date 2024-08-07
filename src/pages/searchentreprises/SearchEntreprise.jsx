import React, { useEffect, useState } from "react";
import IndexSearchbarEntreprises from "../../components/IndexSearchbarEntreprises/IndexSearchbarEntreprises";
import IndexCardsEntreprises from "../../components/CardsEntreprises/IndexCardsEntreprises";
import { getData } from "../../services/data-fetch";


const SearchEntreprise = () => {
    const [entreprises, setEntreprises] = useState([]);
    const [disponibilities, setDisponibilites] = useState([]);

    useEffect(() => {
        const fetchEntreprises = async () => {
            try {
                const response = await getData("enterprises");
                console.log(response);
                setEntreprises(response);
                
            } catch (error) {
                console.error('Error fetching entreprises:', error);
            }
        };

        const fetchDisponibilites = async () => {
            try {
                const disponibilitesResponse = await getData("disponibilities");
                console.log(disponibilitesResponse);
                const sortedDisponibilites = disponibilitesResponse.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                const futureDisponibilites = sortedDisponibilites.filter(d => new Date(d.createdAt) > new Date());
                setDisponibilites(futureDisponibilites);
                
            } catch (error) {
                console.error('Error fetching disponibilites:', error);
            }
        };
    
        fetchEntreprises();
        fetchDisponibilites();
        
    },[]);

    return (
        <div className="font-sans flex flex-col items-center justify-center min-h-screen">
          
            <h1 className="text-center text-2xl sm:text-3xl font-bold mb-4 dark:text-white">Recherchez vos entreprises</h1>
            <IndexSearchbarEntreprises />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 md:gap-12 lg:gap-6">
              {entreprises.map((entreprise) => {
                // Trouver les disponibilités pour cette entreprise
                const entrepriseDisponibilites = disponibilities.filter(d => d.Enterprise_id === entreprise.id);
                console.log(entrepriseDisponibilites);
                return (
                  <IndexCardsEntreprises key={entreprise.id} entreprise={entreprise} disponibilites={entrepriseDisponibilites} />
                );
              })}
            </div>
          
        </div> 
      );
      };

export default SearchEntreprise;