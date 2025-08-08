import React, { useEffect, useState, useCallback } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";
import { getData } from "../../services/data-fetch";
import IndexCardsEntreprises from "../../components/CardsEntreprises/IndexCardsEntreprises";

// ⬇️ importe la sidebar que je t’ai fournie
import FiltersSidebar from "../../components/IndexSearchbarEntreprises/FiltersSidebar";

const SearchEntreprise = () => {
  const [entreprises, setEntreprises] = useState([]);
  const [user] = useAtom(userAtom);
  const userId = user.id;

  // états des filtres (la sidebar les contrôle)
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]); // régions
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  const fetchEntreprises = useCallback(async () => {
    try {
      const response = await getData("enterprises/validate");
      setEntreprises(response);
    } catch (error) {
      console.error("Error fetching entreprises:", error);
    }
  }, []);

  useEffect(() => {
    fetchEntreprises();
  }, [fetchEntreprises]);

  // Recherche côté front (on filtre ce que renvoie l’API validate)
  const performSearch = useCallback(async () => {
    try {
      const response = await getData("enterprises/validate");

      const filtered = response.filter((e) => {
        const jobMatch =
          selectedJobs.length === 0 ||
          selectedJobs.some((j) => e.job && e.job.name === j.label);

        const countryMatch =
          selectedCountries.length === 0 ||
          selectedCountries.some((r) => e.country && e.country.name === r.label);

        const cityMatch =
          selectedCities.length === 0 ||
          selectedCities.some((c) => e.city === c.label);

        const ratingMatch =
          selectedRatings.length === 0 ||
          selectedRatings.some(
            (r) =>
              e.averageRating &&
              parseFloat(e.averageRating.toFixed(2)) === parseFloat(r.label)
          );

        return jobMatch && countryMatch && cityMatch && ratingMatch;
      });

      setEntreprises(filtered);
    } catch (err) {
      console.error("Erreur lors de la recherche:", err);
    }
  }, [selectedJobs, selectedCountries, selectedCities, selectedRatings]);

  const resetAll = useCallback(() => {
    setSelectedJobs([]);
    setSelectedCountries([]);
    setSelectedCities([]);
    setSelectedRatings([]);
    fetchEntreprises(); // réinitialise les résultats
  }, [fetchEntreprises]);

  return (
    <section className="py-2">
      <div className="font-sans mx-auto max-w-7xl mt-10 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl dark:bg-gradient-to-r dark:from-orange-200 dark:to-orange-400 bg-gradient-to-r from-orange-400 to-orange-800 text-transparent bg-clip-text text-center mb-8">
          Recherchez vos entreprises
        </h1>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3">
            <FiltersSidebar
              selectedJobs={selectedJobs}
              setSelectedJobs={setSelectedJobs}
              selectedCountries={selectedCountries}
              setSelectedCountries={setSelectedCountries}
              selectedCities={selectedCities}
              setSelectedCities={setSelectedCities}
              selectedRatings={selectedRatings}
              setSelectedRatings={setSelectedRatings}
              performSearch={performSearch}
              resetAll={resetAll}
            />
          </div>

          {/* Résultats */}
          <div className="col-span-12 md:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {entreprises.map((entreprise) => (
                <IndexCardsEntreprises
                  key={entreprise.id}
                  entreprise={entreprise}
                  userId={userId}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchEntreprise;
