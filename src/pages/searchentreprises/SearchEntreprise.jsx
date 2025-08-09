import React, { useEffect, useState, useCallback } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";
import { getData } from "../../services/data-fetch";
import IndexCardsEntreprises from "../../components/CardsEntreprises/IndexCardsEntreprises";
import FiltersSidebar from "../../components/IndexSearchbarEntreprises/FiltersSidebar";

const SearchEntreprise = () => {
  const [entreprises, setEntreprises] = useState([]);
  const [user] = useAtom(userAtom);
  const userId = user.id;

  // États des filtres (pilotés par la sidebar)
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

  // Recherche front (filtre ce que renvoie /validate)
  const performSearch = useCallback(async () => {
    try {
      const response = await getData("enterprises/validate");

      const filtered = response.filter((e) => {
        const jobMatch =
          selectedJobs.length === 0 ||
          selectedJobs.some((j) => e.job && e.job.name === j.label);

        const countryMatch =
          selectedCountries.length === 0 ||
          selectedCountries.some(
            (r) => e.country && e.country.name === r.label
          );

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
    fetchEntreprises();
  }, [fetchEntreprises]);

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-center mb-8 text-3xl sm:text-4xl md:text-5xl bg-gradient-to-r from-orange-400 to-orange-800 text-transparent bg-clip-text">
          Recherchez vos entreprises
        </h1>

        {/* Layout Amazon-like */}
        <div className="grid grid-cols-12 gap-y-8 gap-x-10 xl:gap-x-14 items-start">
          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-3">
            <div className="lg:sticky lg:top-6 lg:pr-6 xl:pr-8 lg:border-r lg:border-neutral-800">
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
          </aside>

          {/* Résultats */}
          <main className="col-span-12 lg:col-span-9 lg:pl-8 xl:pl-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {entreprises.map((entreprise) => (
                <IndexCardsEntreprises
                  key={entreprise.id}
                  entreprise={entreprise}
                  userId={userId}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default SearchEntreprise;
