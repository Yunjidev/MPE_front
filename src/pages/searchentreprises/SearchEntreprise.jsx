import React from "react";
import IndexSearchbarEntreprises from "../../components/IndexSearchbarEntreprises/IndexSearchbarEntreprises";
import IndexCardsEntreprises from "../../components/CardsEntreprises/IndexCardsEntreprises";

const SearchEntreprise = () => {
  return (
    <div className="font-sans">
      <main className="p-4 pt-14">
        <h1 className="text-center text-3xl font-bold mb-4 dark:text-white">Recherchez vos entreprises</h1>
        <IndexSearchbarEntreprises />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <IndexCardsEntreprises />
          <IndexCardsEntreprises />
          <IndexCardsEntreprises />
          <IndexCardsEntreprises />
          <IndexCardsEntreprises />
        </div>
      </main>
    </div> 
    
   );
};

export default SearchEntreprise;