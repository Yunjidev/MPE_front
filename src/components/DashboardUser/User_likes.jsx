import React, { useState, useEffect } from "react";

const LikesManagement = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const response = await getData("/api/likes");
      setFavorites(response);
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
              <span>❤️ {favorite.name}</span>
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
