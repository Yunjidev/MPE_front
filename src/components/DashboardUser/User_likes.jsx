import React, { useState, useEffect } from "react";
import { getData } from "../../services/data-fetch";

const LikesManagement = () => {
  const [favorites, setFavorites] = useState([]);
  const [enterprises, setEnterprises] = useState({});

  useEffect(() => {
    const fetchFavorites = async () => {
      const likes = await getData("likes");
      setFavorites(likes);

      // Récupérer les détails des entreprises pour chaque Like
      const enterpriseIds = likes.map((like) => like.Enterprise_id);
      const uniqueEnterpriseIds = [...new Set(enterpriseIds)]; // Supprime les doublons

      const enterprisesData = await Promise.all(
        uniqueEnterpriseIds.map((id) => getData(`enterprise/${id}`))
      );

      const enterprisesMap = enterprisesData.reduce((map, enterprise) => {
        map[enterprise.id] = enterprise;
        return map;
      }, {});

      setEnterprises(enterprisesMap);
    };

    fetchFavorites();
  }, []);

  return (
    <div className="flex flex-col h-full space-around bg-neutral-800 p-6 rounded-lg">
      <h3 className="text-lg font-medium mb-4">Mes entreprises favorites</h3>
      <hr className="w-full"></hr>
      <ul>
        {favorites.length > 0 ? (
          favorites.map((favorite) => (
            <li
              key={favorite.id}
              className="flex justify-between items-center bg-neutral-800 p-2 rounded-lg"
            >
              <span>❤️ {enterprises[favorite.Enterprise_id]?.name}</span>
              <button className="bg-white text-black px-3 rounded-lg hover:bg-gray-300">
                Voir fiche
              </button>
            </li>
          ))
        ) : (
          <li className="text-white">Vous n'avez pas encore de favoris.</li>
        )}
      </ul>
    </div>
  );
};

export default LikesManagement;
