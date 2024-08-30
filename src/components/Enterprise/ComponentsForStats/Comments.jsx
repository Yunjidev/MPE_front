import React from "react";
import { LiaComment } from "react-icons/lia";
import { useEnterpriseData } from "./useEnterpriseData";

export default function Comments() {
  const data = useEnterpriseData();

  if (!data) {
    return <div>Chargement...</div>;
  }

  // Compter le nombre de ratings dans les offres
  const ratingsCount = data.offers.reduce((total, offer) => total + offer.ratings.length, 0);

  return (
    <div className="bg-orange-100 bg-opacity-30 dark:bg-black text-black dark:text-white shadow-md rounded-lg p-6 flex items-center space-x-4 w-64">
      <LiaComment className="text-5xl" />
      <div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-[#67FFCC] dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] text-transparent bg-clip-text">
          Commentaires
        </h2>
        <p className="text-xl bg-gradient-to-r from-white to-[#67FFCC] dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] text-transparent bg-clip-text">
          {ratingsCount}
        </p>
      </div>
    </div>
  );
}