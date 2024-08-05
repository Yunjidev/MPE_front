import React, { useEffect, useState } from "react";
import IndexSearchbarEntreprises from "../../components/IndexSearchbarEntreprises/IndexSearchbarEntreprises";
import IndexCardsEntreprises from "../../components/CardsEntreprises/IndexCardsEntreprises";
import { getData } from "../../services/data-fetch";


const SearchEntreprise = () => {
    const [entreprises, setEntreprises] = useState([]);

    useEffect(() => {
        const fetchEntreprises = async () => {
            try {
                const response = await getData("api/entreprises");
                setEntreprises(response);
            } catch (error) {
                console.error('Error fetching entreprises:', error);
            }
        };
    
        fetchEntreprises();
    },[]);

  return (
    <div className="font-sans">
      <main className="p-4 pt-14">
        <h1 className="text-center text-3xl font-bold mb-4 dark:text-white">Recherchez vos entreprises</h1>
        <IndexSearchbarEntreprises />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {entreprises.map((entreprise) => (
            <IndexCardsEntreprises key={entreprise.id} enterprise={entreprise} />
          ))}
        </div>
      </main>
    </div> 
  );
};

export default SearchEntreprise;