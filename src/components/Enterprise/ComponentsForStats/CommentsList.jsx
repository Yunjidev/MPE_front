/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";

export default function CommentsList({ enterprise }) {
  if (!enterprise) return null;

  const commentsData = (enterprise.offers || []).flatMap((offer) =>
    (offer.ratings || []).map((rating) => ({
      username: rating?.user?.username ?? "Anonyme",
      comment: rating?.comment ?? "",
      rating: Number(rating?.note ?? 0),
      offerName: offer?.name ?? "—",
    }))
  );

  return (
    <div className="bg-neutral-900 text-white p-6 rounded-2xl border border-neutral-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-white to-emerald-300 text-transparent bg-clip-text">
          Avis et Notes
        </h2>
        <span className="text-xs text-neutral-400">{commentsData.length} avis</span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="text-left text-xs text-neutral-400">
            <tr className="border-b border-neutral-800">
              <th className="px-4 py-2">Offre</th>
              <th className="px-4 py-2">Client</th>
              <th className="px-4 py-2">Commentaire</th>
              <th className="px-4 py-2">Note</th>
            </tr>
          </thead>
          <tbody>
            {commentsData.map((c, idx) => (
              <tr key={idx} className="border-b border-neutral-900 hover:bg-neutral-900/60">
                <td className="px-4 py-3 text-sm text-neutral-200">{c.offerName}</td>
                <td className="px-4 py-3 text-sm text-neutral-300">{c.username}</td>
                <td className="px-4 py-3 text-sm text-neutral-300 max-w-[480px] break-words">
                  {c.comment || <span className="text-neutral-500">—</span>}
                </td>
                <td className="px-4 py-3 text-sm text-neutral-200">
                  <span className="inline-flex items-center gap-2">
                    <FaStar className="text-amber-300" /> {c.rating.toFixed(1)}/5
                  </span>
                </td>
              </tr>
            ))}
            {commentsData.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-neutral-400 text-sm">
                  Pas encore d'avis.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
