import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { getData } from "../services/data-fetch"; // Assure-toi que `getData` est bien exporté

const EntrepreneurRoute = () => {
  const [isEntrepreneur, setIsEntrepreneur] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const data = await getData('user/profile');
        setIsEntrepreneur(data.isEntrepreneur);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        toast.error("Erreur lors de la récupération des données de profil.");
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optionnel: Un loader peut être affiché ici
  }

  if (isEntrepreneur) {
    return <Outlet />;
  } else {
    toast.error("Vous n'êtes pas autorisé à accéder à cette page.");
    return <Navigate to="/" />;
  }
};

export default EntrepreneurRoute;
