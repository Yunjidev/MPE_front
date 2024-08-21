import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { getData } from '../../services/data-fetch';
import Switch from 'react-switch';

const Localisation = ({ setSearchResults, setAllEnterprises }) => {
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (locationEnabled && navigator.geolocation) {
      const success = async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await getData(`enterprises/nearby?lat=${latitude}&lng=${longitude}&dist=${distance}`);
          setSearchResults(response);
          console.log(` ${distance} km`);
          if (response.length === 0) {
            toast.info('Aucune entreprise trouvée dans votre périmètre.');
            const allEnterprises = await getData('enterprises/validate');
            setAllEnterprises(allEnterprises);
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des entreprises à proximité:', error);
          toast.error('Une erreur est survenue lors de la recherche des entreprises à proximité.');
          setLocationError('Une erreur est survenue lors de la recherche des entreprises à proximité.');
        }
      };

      const error = () => {
        toast.error("Impossible de récupérer votre position.");
        setLocationError("Impossible de récupérer votre position.");
      };

      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, [locationEnabled, distance, setSearchResults, setAllEnterprises]);

  return (
    <div>
      <Switch
        checked={locationEnabled}
        onChange={() => setLocationEnabled(!locationEnabled)}
      />
      <label>
        Activer la géolocalisation
      </label>
      <input
        type="range"
        min="0"
        max="1500"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
      />
      <label>
        Distance de localisation: {distance} km
      </label>
      {locationError && <div>{locationError}</div>}
      {!locationError && locationEnabled && <div>Localisation en cours...</div>}
      {!locationError && !locationEnabled && <div>Localisation désactivée</div>}
    </div>
  );
};

export default Localisation;