import React, { useEffect, useState } from "react";
import IndexSearchbarEntreprises from "../../components/IndexSearchbarEntreprises/IndexSearchbarEntreprises";
import IndexCardsEntreprises from "../../components/CardsEntreprises/IndexCardsEntreprises";
import { getData } from "../../services/data-fetch";


const SearchEntreprise = () => {
    const [entreprises, setEntreprises] = useState([]);
   

    useEffect(() => {
        const fetchEntreprises = async () => {
            try {
                let response = await getData("enterprises/validate");
                console.log(response);
                // Parsez les logos pour chaque entreprise
                response = response.map(entreprise => {
                    return {
                        ...entreprise,
                        logo: JSON.parse(entreprise.logo)
                    };
                });
                setEntreprises(response);
                console.log(entreprises);
            } catch (error) {
                console.error('Error fetching entreprises:', error);
            }
        };

        fetchEntreprises();
    }, []);

    

    return (
        <section className='py-14'>
            <div className="font-sans flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-5xl dark:bg-gradient-to-r dark:from-orange-200 dark:to-orange-400 bg-gradient-to-r from-orange-400 to-orange-800 text-transparent bg-clip-text">Recherchez vos entreprises</h1>
                <IndexSearchbarEntreprises setSearchResults={setEntreprises} />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8 md:gap-12 lg:gap-6">
                    {entreprises.map((entreprise) => (
                        <IndexCardsEntreprises key={entreprise.id} entreprise={entreprise} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SearchEntreprise;