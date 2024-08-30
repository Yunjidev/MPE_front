import React from "react";
import { FaStar } from "react-icons/fa";
import { useEnterpriseData } from "./useEnterpriseData";

export default function AverageRating() {
  const data = useEnterpriseData();

  if (!data) {
    return <div>Chargement...</div>;
  }

  const averageRating = data.averageRating;

  return (
    <div className="bg-orange-100 bg-opacity-30 dark:bg-black text-black dark:text-white shadow-md rounded-lg p-6 flex items-center space-x-4 w-64">
      <FaStar className="text-5xl" />
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-800 dark:bg-gradient-to-r dark:from-orange-200 dark:to-orange-400 text-transparent bg-clip-text">
          Note Globale
        </h2>
        <p className="text-xl bg-gradient-to-r from-orange-400 to-orange-800 dark:bg-gradient-to-r dark:from-orange-200 dark:to-orange-400 text-transparent bg-clip-text">
          {averageRating}/5
        </p>
      </div>
    </div>
  );
}