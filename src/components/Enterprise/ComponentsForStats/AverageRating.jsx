import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { getData } from "../../../services/data-fetch";
import { useAtom } from "jotai";
import { userAtom } from "../../../store/user";

export default function AverageRating() {
  const [entreprise, setEntreprise] = useState(null);
  const [user] = useAtom(userAtom);
  const userId = user.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await getData("enterprises/validate");
        console.log('Données récupérées:', response); // Vérifier les données récupérées

        // Filtrer pour trouver l'entreprise correspondant à l'utilisateur connecté
        const userEntreprise = response.find(ent => ent.entrepreneur.id === userId);
        setEntreprise(userEntreprise);
      } catch (error) {
        console.error('Error fetching entreprises:', error);
      }
    };
    fetchData();
  }, [userId]);


  const averageRating = entreprise.averageRating;

  return (
    <div className="bg-orange-100 bg-opacity-30 dark:bg-black text-black dark:text-white shadow-md rounded-lg p-6 flex items-center space-x-4 w-64">
      <FaStar className="text-5xl" />
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-800 dark:bg-gradient-to-r dark:from-orange-200 dark:to-orange-400 text-transparent bg-clip-text">
          Note Globale
        </h2>
        <p className="text-xl bg-gradient-to-r from-orange-400 to-orange-800 dark:bg-gradient-to-r dark:from-orange-200 dark:to-orange-400 text-transparent bg-clip-text">
          {averageRating}
        </p>
      </div>
    </div>
  );
}