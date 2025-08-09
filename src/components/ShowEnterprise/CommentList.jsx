/* eslint-disable react/prop-types */
import { useState } from "react";

const CommentList = ({ offers }) => {
  const commentsPerPage = 6;
  const [visibleComments, setVisibleComments] = useState(commentsPerPage);
  const [selectedRating, setSelectedRating] = useState(null);
  const [sortOrder, setSortOrder] = useState("recent");

  const allComments = offers.flatMap((offer) => offer.ratings);
  const filteredComments = selectedRating
    ? allComments.filter((c) => parseInt(c.note) === selectedRating)
    : allComments;

  const sortedComments = [...filteredComments].sort((a, b) => {
    if (sortOrder === "best") return b.note - a.note;
    if (sortOrder === "worst") return a.note - b.note;
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const totalPages = Math.ceil(sortedComments.length / commentsPerPage);
  const currentPage = Math.ceil(visibleComments / commentsPerPage);

  return (
    <div className="bg-neutral-900/60 border border-neutral-800 rounded-3xl shadow-lg overflow-hidden p-6 space-y-6">
      {/* Filtres */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
        <select
          className="p-2 rounded-lg border border-neutral-800 bg-neutral-800/80 text-white shadow-md 
                     hover:border-orange-400 focus:border-orange-500 focus:outline-none focus:ring-2 
                     focus:ring-orange-400 transition-all cursor-pointer"
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setVisibleComments(commentsPerPage);
          }}
        >
          <option value="recent" className="bg-neutral-900">Les plus récents</option>
          <option value="best" className="bg-neutral-900">Les meilleures notes</option>
          <option value="worst" className="bg-neutral-900">Les moins bonnes notes</option>
        </select>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              className={`px-3 py-1 rounded-full border transition-all ${
                selectedRating === rating
                  ? "bg-gradient-to-r from-orange-400 to-yellow-500 text-black font-semibold border-yellow-400 shadow-lg shadow-yellow-500/30"
                  : "bg-neutral-800/60 text-white hover:bg-neutral-700 border-neutral-700"
              }`}
              onClick={() => {
                setSelectedRating(rating);
                setVisibleComments(commentsPerPage);
              }}
            >
              {rating} ⭐
            </button>
          ))}
          <button
            className={`px-3 py-1 rounded-full border transition-all ${
              selectedRating === null
                ? "bg-gradient-to-r from-orange-400 to-yellow-500 text-black font-semibold border-yellow-400 shadow-lg shadow-yellow-500/30"
                : "bg-neutral-800/60 text-white hover:bg-neutral-700 border-neutral-700"
            }`}
            onClick={() => {
              setSelectedRating(null);
              setVisibleComments(commentsPerPage);
            }}
          >
            Tous
          </button>
        </div>
      </div>

      {/* Liste des commentaires */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedComments
          .slice(visibleComments - commentsPerPage, visibleComments)
          .map((rating, i) => (
            <div
              key={i}
              className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col gap-3 shadow-md hover:shadow-lg hover:border-orange-400 transition-all"
            >
              <div className="flex items-center gap-3">
                <img
                  src={rating.user?.avatar || "https://via.placeholder.com/40"}
                  alt={rating.user?.username}
                  className="w-12 h-12 rounded-full object-cover border border-neutral-700"
                />
                <div>
                  <p className="font-semibold text-white">
                    {rating.user?.username || "Utilisateur"}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, index) => {
                        index += 1;
                        return (
                          <span
                            key={index}
                            className={`text-lg ${
                              index <= parseInt(rating.note, 10)
                                ? "text-yellow-400 drop-shadow-[0_0_2px_rgba(255,215,0,0.8)]"
                                : "text-neutral-600"
                            }`}
                          >
                            ★
                          </span>
                        );
                      })}
                    </div>
                    <span className="text-sm bg-gradient-to-r from-orange-400 to-yellow-500 text-transparent bg-clip-text font-bold">
                      {rating.note}/5
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-neutral-300 flex-1 italic">
                “{rating.comment}”
              </p>
              <span className="text-xs text-gray-500">
                Posté le {new Date(rating.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 items-center">
        {visibleComments > commentsPerPage && (
          <button
            className="px-4 py-2 bg-neutral-800/70 hover:bg-neutral-700 rounded-lg border border-neutral-700 hover:border-orange-400 transition-all"
            onClick={() =>
              setVisibleComments((prev) =>
                Math.max(prev - commentsPerPage, commentsPerPage)
              )
            }
          >
            ◀
          </button>
        )}
        <span className="text-sm text-gray-400">
          Page {currentPage} / {totalPages}
        </span>
        {visibleComments < sortedComments.length && (
          <button
            className="px-4 py-2 bg-neutral-800/70 hover:bg-neutral-700 rounded-lg border border-neutral-700 hover:border-orange-400 transition-all"
            onClick={() =>
              setVisibleComments((prev) =>
                Math.min(prev + commentsPerPage, sortedComments.length)
              )
            }
          >
            ▶
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentList;
