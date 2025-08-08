/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { getData } from "../../services/data-fetch";
import { useNavigate } from "react-router-dom";
import LikeButton from "../CardsEntreprises/LikesForCards/LikeButton";

const LikesManagement = () => {
  const [favorites, setFavorites] = useState([]);
  const [enterprises, setEnterprises] = useState({});
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchFavorites = async () => {
      const likes = await getData("likes");
      setFavorites(likes);

      // Récupérer les détails des entreprises pour chaque Like
      const enterpriseIds = likes.map((like) => like.Enterprise_id);
      const uniqueEnterpriseIds = [...new Set(enterpriseIds)];

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

  const removeFavorite = (enterpriseId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.Enterprise_id !== enterpriseId)
    );
  };

  return (
    <div className="flex flex-col h-full space-around bg-neutral-800 p-6 rounded-xl">
      <h3 className="text-lg font-medium mb-4">Mes entreprises favorites</h3>
      <hr className="w-full"></hr>
      <ul>
        {favorites.length > 0 ? (
          favorites.map((favorite) => (
            <li
              key={favorite.id}
              className="flex justify-between items-center bg-neutral-800 p-2 rounded-lg"
            >
              <span>  <LikeButton
                userId={favorite.User_id}
                enterpriseId={favorite.Enterprise_id}
                onUnlike={removeFavorite} // Passe la fonction de suppression ici
              />
                {enterprises[favorite.Enterprise_id]?.name}
              </span>
              <button
                className="bg-white text-black px-3 rounded-lg hover:bg-gray-300"
                onClick={() =>
                  navigate(`/enterprise/${favorite.Enterprise_id}`)
                } // Navigate to the enterprise detail page
              >
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
