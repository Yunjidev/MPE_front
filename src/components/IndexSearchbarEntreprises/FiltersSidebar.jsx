/* eslint-disable react/prop-types */
import { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { IoChevronDown } from "react-icons/io5";
import JobSelect from "./FilterSelect/Jobselect";
import CountrySelect from "./FilterSelect/Countryselect";
import CitySelect from "./FilterSelect/CitySelect";
import RatingSelect from "./FilterSelect/RatingSelect";
import PremiumCheckbox from "./FilterSelect/PremiumCheckbox";

function Section({ title, open, onToggle, children }) {
  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-900/70">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-2 rounded-xl"
      >
        <span className="text-neutral-100 font-semibold">{title}</span>
        <IoChevronDown
          className={`text-neutral-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="px-3 pb-3">{children}</div>}
    </section>
  );
}

export default function FiltersSidebar({
  selectedJobs, setSelectedJobs,
  selectedCountries, setSelectedCountries,
  selectedCities, setSelectedCities,
  selectedRatings, setSelectedRatings,
  performSearch, resetAll,
}) {
  const [open, setOpen] = useState({
    job: true,
    region: true,
    city: true,
    rating: true,
    prime: true,
  });

  return (
    <aside
      className="md:w-80 w-full md:sticky md:top-6 space-y-4
                 rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4
                 shadow-xl shadow-black/30 backdrop-blur"
    >
      {/* Header */}
      <div className="rounded-xl p-3 border border-neutral-800 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-400/10">
        <p className="text-sm tracking-wide text-neutral-300">Affiner la recherche</p>
      </div>

      {/* Métiers */}
      <Section
        title="Métiers"
        open={open.job}
        onToggle={() => setOpen((o) => ({ ...o, job: !o.job }))}
      >
        <JobSelect selectedJobs={selectedJobs} setSelectedJobs={setSelectedJobs} />
      </Section>

      {/* Régions */}
      <Section
        title="Régions"
        open={open.region}
        onToggle={() => setOpen((o) => ({ ...o, region: !o.region }))}
      >
        <CountrySelect
          selectedCountries={selectedCountries}
          setSelectedCountries={setSelectedCountries}
        />
      </Section>

      {/* Villes */}
      <Section
        title="Villes"
        open={open.city}
        onToggle={() => setOpen((o) => ({ ...o, city: !o.city }))}
      >
        <CitySelect
          selectedCities={selectedCities}
          setSelectedCities={setSelectedCities}
        />
      </Section>

      {/* Notes */}
      <Section
        title="Notes"
        open={open.rating}
        onToggle={() => setOpen((o) => ({ ...o, rating: !o.rating }))}
      >
        <RatingSelect
          selectedRatings={selectedRatings}
          setSelectedRatings={setSelectedRatings}
        />
      </Section>

      {/* Premium */}
      <section className="rounded-xl border border-neutral-800 bg-neutral-900/70 px-3 py-2">
        <div className="flex items-center justify-between">
          <span className="text-neutral-100 font-semibold">Premium</span>
          <PremiumCheckbox />
        </div>
      </section>

      {/* Actions */}
      <div className="flex gap-3 pt-1">
        <button
          onClick={resetAll}
          className="flex-1 h-11 rounded-xl border border-neutral-700 text-neutral-200
                     hover:bg-neutral-900 transition-colors"
        >
          Réinitialiser
        </button>
        <button
          onClick={performSearch}
          className="h-11 px-4 rounded-xl border border-orange-500/40
                     bg-gradient-to-r from-orange-500/20 to-orange-400/10
                     text-orange-200 flex items-center gap-2
                     hover:from-orange-500/30 hover:to-orange-400/20
                     hover:border-orange-400/60 transition-all"
          title="Rechercher"
        >
          <HiSearch />
          Rechercher
        </button>
      </div>
    </aside>
  );
}
