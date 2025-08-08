import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { FaPhone, FaMapMarkerAlt, FaCity, FaBarcode } from "react-icons/fa";
import { MdOutlineAlternateEmail, MdOutlineAreaChart } from "react-icons/md";
import Input from "../../Utils/Inputs/Input";

const fetchCitiesByPostalCode = async (postalCode) => {
  try {
    const res = await fetch(
      `https://geo.api.gouv.fr/communes?codePostal=${postalCode}&fields=nom,codePostal,region&format=json`
    );
    return await res.json();
  } catch (e) {
    console.error("Erreur API villes:", e);
    return [];
  }
};

export default function ContactEnterprise({ formData, countryOptions, onChange }) {
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [hasChosenCity, setHasChosenCity] = useState(false);

  const wrapperRef = useRef(null);
  const panelRef = useRef(null);

  // util: trouver l'id de région seed à partir du nom
  const findCountryIdByRegionName = (name) => {
    if (!name) return "";
    const match = (countryOptions || []).find(
      (c) => (c.name || c.label || "").toLowerCase() === name.toLowerCase()
    );
    return match?.id || match?.value || ""; // selon ton shape d’option
  };

  useEffect(() => {
    const onOutside = (evt) => {
      if (!wrapperRef.current?.contains(evt.target) && !panelRef.current?.contains(evt.target)) {
        setShowCitySuggestions(false);
      }
    };
    if (showCitySuggestions) {
      document.addEventListener("pointerdown", onOutside, true);
      return () => document.removeEventListener("pointerdown", onOutside, true);
    }
  }, [showCitySuggestions]);

  useEffect(() => {
    const run = async () => {
      const cp = (formData.zip_code || "").trim();
      if (cp.length !== 5) {
        setShowCitySuggestions(false);
        setCitySuggestions([]);
        setHasChosenCity(false);
        onChange({ target: { id: "city", value: "" } });
        onChange({ target: { id: "region", value: "" } });
        onChange({ target: { id: "Country_id", value: "" } });
        return;
      }

      setIsLoadingCities(true);
      try {
        const cities = await fetchCitiesByPostalCode(cp);
        setCitySuggestions(cities || []);

        if (cities?.length === 1) {
          const c = cities[0];
          const regionName = c.region?.nom || "";
          onChange({ target: { id: "city", value: c.nom } });
          onChange({ target: { id: "region", value: regionName } });

          // map vers Country_id (seed) → backend content
          const regionId = findCountryIdByRegionName(regionName);
          onChange({ target: { id: "Country_id", value: regionId } });

          setHasChosenCity(true);
          setShowCitySuggestions(false);
        } else if (cities?.length > 1) {
          setShowCitySuggestions(!hasChosenCity);
        } else {
          setShowCitySuggestions(false);
          setHasChosenCity(false);
          onChange({ target: { id: "city", value: "" } });
          onChange({ target: { id: "region", value: "" } });
          onChange({ target: { id: "Country_id", value: "" } });
        }
      } finally {
        setIsLoadingCities(false);
      }
    };

    const t = setTimeout(run, 300);
    return () => clearTimeout(t);
  }, [formData.zip_code, hasChosenCity, countryOptions, onChange]);

  const handleCitySelect = (city) => {
    const regionName = city.region?.nom || "";
    onChange({ target: { id: "city", value: city.nom } });
    onChange({ target: { id: "region", value: regionName } });
    onChange({ target: { id: "Country_id", value: findCountryIdByRegionName(regionName) } });
    setHasChosenCity(true);
    setShowCitySuggestions(false);
  };

  const handleZipCodeChange = (e) => {
    onChange(e);
    setHasChosenCity(false);
    if (showCitySuggestions) setShowCitySuggestions(false);
  };

  return (
    <>
      <Input.Text
        id="phone"
        value={formData.phone}
        onChange={onChange}
        placeholder="Contact"
        icon={<FaPhone />}
      />
      <Input.Text
        id="mail"
        value={formData.mail}
        placeholder="E-mail"
        onChange={onChange}
        icon={<MdOutlineAlternateEmail />}
      />
      <Input.Text
        id="adress"
        value={formData.adress}
        onChange={onChange}
        placeholder="Adresse"
        icon={<FaMapMarkerAlt />}
      />

      {/* Code Postal + dropdown */}
      <div ref={wrapperRef} className="relative">
        <Input.Text
          id="zip_code"
          value={formData.zip_code}
          onChange={handleZipCodeChange}
          placeholder="Code Postal"
          icon={<FaBarcode />}
        />
        {isLoadingCities && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500" />
          </div>
        )}
        {showCitySuggestions && citySuggestions.length > 1 && (
          <div
            ref={panelRef}
            onMouseDown={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-50"
          >
            <div className="p-2 text-sm text-gray-600 border-b bg-gray-50 sticky top-0">
              Sélectionnez votre ville
              <button
                type="button"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setShowCitySuggestions(false);
                }}
                className="float-right text-gray-400 hover:text-gray-600 text-lg font-bold leading-none"
              >
                ×
              </button>
            </div>
            <div className="max-h-56 overflow-auto">
              {citySuggestions.map((city, idx) => (
                <div
                  key={`${city.codePostal}-${city.nom}-${idx}`}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    handleCitySelect(city);
                  }}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <div className="font-medium text-gray-900">{city.nom}</div>
                  <div className="text-sm text-gray-500">
                    {city.codePostal} · {city.region?.nom}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>


      {/* Ville */}
      <Input.Text
        id="city"
        value={formData.city}
        onChange={onChange}
        placeholder="Ville"
        icon={<FaCity />}
        disabled
      />

      {/* Région (seed) */}
      <Input.Select
        id="Country_id"
        value={formData.Country_id}
        onChange={onChange}
        placeholder="Région"
        options={countryOptions}
        icon={<MdOutlineAreaChart />}
        // className="hidden" // décommente pour cacher
      />
    </>
  );
}

ContactEnterprise.propTypes = {
  formData: PropTypes.object.isRequired,
  countryOptions: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};
