/* eslint-disable react/prop-types */
import AsyncSelect from "react-select/async";
import { selectClassNames } from "./selectTw";

const fetchCitiesByName = async (q) => {
  if (!q || q.trim().length < 2) return [];
  const url = `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(
    q.trim()
  )}&fields=nom,codesPostaux,code,codeRegion&boost=population&limit=15`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`geo.api.gouv.fr communes ${res.status}`);
  return res.json();
};

export default function CitySelect({ selectedCities, setSelectedCities }) {
  const loadOptions = async (inputValue) => {
    const data = await fetchCitiesByName(inputValue);
    const seen = new Set();
    const out = [];
    for (const c of data || []) {
      const name = (c.nom || "").trim();
      if (!name) continue;
      const k = name.toLowerCase();
      if (seen.has(k)) continue;
      seen.add(k);
      out.push({ label: name, value: name });
    }
    return out;
  };

  return (
    <AsyncSelect
      isMulti
      cacheOptions
      defaultOptions={false} // rien au départ
      loadOptions={loadOptions}
      placeholder="Ville (tapez 2+ caractères)"
      value={selectedCities}
      onChange={(vals) => setSelectedCities(vals || [])}
      noOptionsMessage={() => "Tapez au moins 2 caractères"}
      classNames={selectClassNames}
      unstyled
    />
  );
}
