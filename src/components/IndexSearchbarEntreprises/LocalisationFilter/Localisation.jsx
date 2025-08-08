import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import { getData } from '../../../services/data-fetch';

import Switch from 'react-switch';
import './Localisation.css';



const Localisation = ({ setSearchResults, setAllEnterprises }) => {
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [distance, setDistance] = useState(0);
  const distanceSteps = [0, 1, 5, 10, 20, 30, 50, 100, 200];

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

      const error = (err) => {
        console.error('Erreur de géolocalisation:', err);
        switch(err.code) {
          case err.PERMISSION_DENIED:
            toast.error("L'utilisateur a refusé la demande de géolocalisation.");
            setLocationError("L'utilisateur a refusé la demande de géolocalisation.");
            break;
          case err.POSITION_UNAVAILABLE:
            toast.error("Les informations de localisation ne sont pas disponibles.");
            setLocationError("Les informations de localisation ne sont pas disponibles.");
            break;
          case err.TIMEOUT:
            toast.error("La demande de géolocalisation a expiré.");
            setLocationError("La demande de géolocalisation a expiré.");
            break;
          default:
            toast.error("Une erreur inconnue est survenue.");
            setLocationError("Une erreur inconnue est survenue.");
            break;
        }
      };

      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, [locationEnabled, distance, setSearchResults, setAllEnterprises]);

  const handleDistanceChange = (value) => {
    // Trouver le palier le plus proche de la valeur actuelle
    const closest = distanceSteps.reduce((prev, curr) => {
      return (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev);
    });
    setDistance(closest);
  };

  return (
    <div>
      <Switch
        checked={locationEnabled}
        onChange={() => setLocationEnabled(!locationEnabled)}
      />
      <label>
        Activer la géolocalisation
      </label>
      <div>
        <input
          type="range"
          min={0}
          max={distanceSteps.length - 1} // Le maximum est l'index du dernier élément
          value={distanceSteps.indexOf(distance)} // La valeur est l'index du palier actuel
          onChange={(e) => handleDistanceChange(distanceSteps[e.target.value])}
          className="range range-xs range-violet-400"
        />
        <div>
          Distance de localisation: {distance} km
        </div>
      </div>
      {locationError && <div>{locationError}</div>}
      {!locationError && locationEnabled && <div>Localisation en cours...</div>}
      {!locationError && !locationEnabled && <div>Localisation désactivée</div>}
    </div>
  );
};

export default Localisation;