/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { getData } from "../../services/data-fetch";
import { FaStar } from "react-icons/fa";

const CommentsOfUser = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommentsAndOffers = async () => {
      try {
        const userProfile = await getData("user/profile");
        const ratings = userProfile?.ratings || [];
        const enriched = ratings.map((rating) => ({
          ...rating,
          offer:
            userProfile?.reservations?.find(
              (r) => Number(r.Offer_id) === Number(rating.Offer_id)
            )?.offer || {},
        }));
        setReservations(enriched);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCommentsAndOffers();
  }, []);

  if (loading) {
    return (
      <div className="text-neutral-400 text-sm">Chargement des commentaires…</div>
    );
  }

  if (!reservations.length) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="text-4xl mb-2">📝</div>
          <p className="text-neutral-400">Vous n'avez pas encore laissé d'avis.</p>
        </div>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {reservations.map((r) => (
        <li
          key={r.id}
          className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 hover:border-neutral-700 transition"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div>
              <div className="text-sm text-neutral-400">
                Offre •{" "}
                <span className="text-white font-medium">
                  {r.offer?.enterprise?.name ?? "Entreprise inconnue"}
                </span>
              </div>
              <h3 className="text-lg font-semibold">
                {r.offer?.name ?? "Offre inconnue"}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-neutral-800 text-amber-300 text-sm">
                <FaStar className="inline-block" />
                {Number(r.note ?? 0).toFixed(1)}
              </span>
            </div>
          </div>

          {r.comment ? (
            <p className="mt-3 text-neutral-300 leading-relaxed">{r.comment}</p>
          ) : (
            <p className="mt-3 text-neutral-500 italic">
              Aucun commentaire renseigné.
            </p>
          )}
        </li>
      ))}
    </ul>
  );
};

export default CommentsOfUser;
