import React, { useEffect, useState } from "react";
import IndexSearchbarEntreprises from "../../components/IndexSearchbarEntreprises/IndexSearchbarEntreprises";
import IndexCardsEntreprises from "../../components/CardsEntreprises/IndexCardsEntreprises";
import { getData } from "../../services/data-fetch";
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";


const SearchEntreprise = () => {
  const [entreprises, setEntreprises] = useState([]);
  const [user] = useAtom(userAtom);
  const userId = user.id;

  const fetchEntreprises = async () => {
    try {
      let response = await getData("enterprises/validate");
      
      setEntreprises(response);
    } catch (error) {
      console.error('Error fetching entreprises:', error);
    }
  };

  useEffect(() => {
    fetchEntreprises();
  }, []);

  const resetSearchResults = () => {
    fetchEntreprises(); // Cette fonction appelle fetchEntreprises pour réinitialiser les résultats
  };

  return (
    <section className='py-14'>
      <div className="font-sans flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl sm:text-4xl md:text-5xl dark:bg-gradient-to-r dark:from-orange-200 dark:to-orange-400 bg-gradient-to-r from-orange-400 to-orange-800 text-transparent bg-clip-text">
          Recherchez vos entreprises
        </h1>
        <IndexSearchbarEntreprises setSearchResults={setEntreprises} resetSearch={resetSearchResults} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {entreprises.map((entreprise) => (
            <IndexCardsEntreprises key={entreprise.id} entreprise={entreprise} userId={userId} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchEntreprise;