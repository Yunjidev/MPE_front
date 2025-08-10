/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { getData } from "../../services/data-fetch";
import { useNavigate } from "react-router-dom";
import LikeButton from "../CardsEntreprises/LikesForCards/LikeButton";

const LikesManagement = () => {
  const [favorites, setFavorites] = useState([]);
  const [enterprises, setEnterprises] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const likes = await getData("likes");
        setFavorites(likes);

        const enterpriseIds = likes.map((like) => Number(like.Enterprise_id));
        const uniqueEnterpriseIds = [...new Set(enterpriseIds)].filter(Boolean);

        const enterprisesData = await Promise.all(
          uniqueEnterpriseIds.map((id) => getData(`enterprise/${id}`))
        );

        const enterprisesMap = enterprisesData.reduce((map, enterprise) => {
          if (enterprise?.id) map[Number(enterprise.id)] = enterprise;
          return map;
        }, {});
        setEnterprises(enterprisesMap);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const removeFavorite = (enterpriseId) => {
    const eid = Number(enterpriseId);
    setFavorites((prev) => prev.filter((fav) => Number(fav.Enterprise_id) !== eid));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium text-neutral-200">Mes entreprises favorites</h3>
        <span className="text-xs text-neutral-500">{favorites.length} au total</span>
      </div>
      <hr className="border-neutral-800" />

      {loading ? (
        <div className="text-neutral-400 text-sm">Chargement…</div>
      ) : favorites.length > 0 ? (
        <ul className="space-y-2">
          {favorites.map((favorite) => {
            const eid = Number(favorite.Enterprise_id);
            const uid = Number(favorite.User_id);
            const ent = enterprises[eid];

            return (
              <li
                key={favorite.id}
                className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-900/50 px-3 py-2 hover:border-neutral-700 transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <LikeButton userId={uid} enterpriseId={eid} onUnlike={removeFavorite} />
                  <div className="min-w-0">
                    <div className="font-medium truncate">
                      {ent?.name ?? "(entreprise indisponible)"}
                    </div>
                    <div className="text-xs text-neutral-500 truncate">
                      {ent?.city ? `${ent.city}` : ""}
                    </div>
                  </div>
                </div>

                <button
                  className="text-sm bg-white/95 text-black px-3 py-1.5 rounded-lg hover:bg-white transition"
                  onClick={() => navigate(`/enterprise/${eid}`)}
                >
                  Voir fiche
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="rounded-lg border border-neutral-800 bg-neutral-900/40 p-4 text-center">
          <div className="text-2xl mb-2">💔</div>
          <p className="text-neutral-400 text-sm">
            Vous n'avez pas encore de favoris. Ajoutez-en depuis les fiches entreprises.
          </p>
        </div>
      )}
    </div>
  );
};

export default LikesManagement;
