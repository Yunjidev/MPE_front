/* eslint-disable react/prop-types */
import { useState } from "react";
import { HiSearch } from "react-icons/hi";
import JobSelect from "./FilterSelect/Jobselect";
import CountrySelect from "./FilterSelect/Countryselect";
import CitySelect from "./FilterSelect/CitySelect";
import RatingSelect from "./FilterSelect/RatingSelect";
import PremiumCheckbox from "./FilterSelect/PremiumCheckbox";

export default function FiltersSidebar({
  selectedJobs, setSelectedJobs,
  selectedCountries, setSelectedCountries,
  selectedCities, setSelectedCities,
  selectedRatings, setSelectedRatings,
  performSearch, resetAll,
}) {
  const [open, setOpen] = useState({
    categories: true,
    price: true,
    prime: true,
    region: true,
    city: true,
    job: true,
    rating: true,
  });

  return (
    <aside className="md:w-72 w-full md:sticky md:top-4 bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-6">
      {/* En-tête */}
      <div className="text-sm text-neutral-400">Affiner la recherche</div>

      {/* Métiers */}
      <section>
        <button
          type="button"
          onClick={() => setOpen((o) => ({ ...o, job: !o.job }))}
          className="w-full flex justify-between items-center text-left font-semibold text-neutral-100"
        >
          Métiers
          <span className="text-neutral-400">{open.job ? "−" : "+"}</span>
        </button>
        {open.job && (
          <div className="mt-3">
            <JobSelect
              selectedJobs={selectedJobs}
              setSelectedJobs={setSelectedJobs}
            />
          </div>
        )}
      </section>

      {/* Régions */}
      <section>
        <button
          type="button"
          onClick={() => setOpen((o) => ({ ...o, region: !o.region }))}
          className="w-full flex justify-between items-center text-left font-semibold text-neutral-100"
        >
          Régions
          <span className="text-neutral-400">{open.region ? "−" : "+"}</span>
        </button>
        {open.region && (
          <div className="mt-3">
            <CountrySelect
              selectedCountries={selectedCountries}
              setSelectedCountries={setSelectedCountries}
            />
          </div>
        )}
      </section>

      {/* Villes */}
      <section>
        <button
          type="button"
          onClick={() => setOpen((o) => ({ ...o, city: !o.city }))}
          className="w-full flex justify-between items-center text-left font-semibold text-neutral-100"
        >
          Villes
          <span className="text-neutral-400">{open.city ? "−" : "+"}</span>
        </button>
        {open.city && (
          <div className="mt-3">
            <CitySelect
              selectedCities={selectedCities}
              setSelectedCities={setSelectedCities}
            />
          </div>
        )}
      </section>

      {/* Notes */}
      <section>
        <button
          type="button"
          onClick={() => setOpen((o) => ({ ...o, rating: !o.rating }))}
          className="w-full flex justify-between items-center text-left font-semibold text-neutral-100"
        >
          Notes
          <span className="text-neutral-400">{open.rating ? "−" : "+"}</span>
        </button>
        {open.rating && (
          <div className="mt-3">
            <RatingSelect
              selectedRatings={selectedRatings}
              setSelectedRatings={setSelectedRatings}
            />
          </div>
        )}
      </section>

      {/* Prime (Premium) */}
      <section className="flex items-center gap-3">
        <PremiumCheckbox />
        <span className="text-neutral-200">Premium</span>
      </section>

      {/* Actions */}
      <div className="pt-2 flex gap-2">
        <button
          onClick={resetAll}
          className="flex-1 h-10 rounded-lg border border-neutral-700 text-neutral-200 hover:bg-neutral-800"
        >
          Réinitialiser
        </button>
        <button
          onClick={performSearch}
          className="h-10 px-4 rounded-lg bg-gradient-to-r from-white to-[#67FFCC] text-transparent bg-clip-text border border-neutral-400 flex items-center justify-center gap-2 hover:scale-[1.02] transition"
          title="Rechercher"
        >
          <HiSearch className="text-neutral-200" />
          <span className="text-neutral-200">Rechercher</span>
        </button>
      </div>
    </aside>
  );
}
