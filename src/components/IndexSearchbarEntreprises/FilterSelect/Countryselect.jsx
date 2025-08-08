/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { selectClassNames } from "./selectTw";

const fetchRegions = async (q) => {
  const url = q && q.trim()
    ? `https://geo.api.gouv.fr/regions?nom=${encodeURIComponent(q)}`
    : `https://geo.api.gouv.fr/regions`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`geo.api.gouv.fr regions ${res.status}`);
  return res.json();
};

export default function CountrySelect({
  selectedCountries,
  setSelectedCountries,
}) {
  const [defaults, setDefaults] = useState([]);

  useEffect(() => {
    fetchRegions("")
      .then((data) =>
        setDefaults((data || []).map((r) => ({ label: r.nom, value: r.code })))
      )
      .catch(() => setDefaults([]));
  }, []);

  const loadOptions = async (inputValue) => {
    const data = await fetchRegions(inputValue || "");
    return (data || []).map((r) => ({ label: r.nom, value: r.code }));
  };

  return (
    <AsyncSelect
      isMulti
      cacheOptions
      defaultOptions={defaults}
      loadOptions={loadOptions}
      placeholder="Région"
      value={selectedCountries}
      onChange={(vals) => setSelectedCountries(vals || [])}
      noOptionsMessage={() => "Aucune région"}
      classNames={selectClassNames}
      unstyled
    />
  );
}
