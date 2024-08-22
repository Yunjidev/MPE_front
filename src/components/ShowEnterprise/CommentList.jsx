import React, { useState } from "react";
import StarRating from "./StarRatings";
import "./commentlist.css";

const CommentList = ({ offers }) => {
  const commentsPerPage = 4; // Number of comments to show per page
  const [visibleComments, setVisibleComments] = useState(commentsPerPage); // Initial number of comments to display
  const [selectedRating, setSelectedRating] = useState(null); // State for the selected rating filter
  const [sortOrder, setSortOrder] = useState("recent"); // Sort order: 'recent', 'best', or 'worst'

  const allComments = offers.flatMap((offer) => offer.ratings); // Flatten all ratings

  // Filter comments based on selected rating
  const filteredComments = selectedRating
    ? allComments.filter((comment) => parseInt(comment.note) === selectedRating)
    : allComments;

  // Sort comments based on the selected sort order
  const sortedComments = [...filteredComments].sort((a, b) => {
    if (sortOrder === "best") {
      return b.note - a.note; // Sort by best ratings
    } else if (sortOrder === "worst") {
      return a.note - b.note; // Sort by worst ratings
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt); // Sort by most recent
    }
  });

  const totalPages = Math.ceil(sortedComments.length / commentsPerPage); // Calculate the total number of pages
  const currentPage = Math.ceil(visibleComments / commentsPerPage); // Determine the current page

  // Function to load more comments
  const handleRightArrowClick = () => {
    if (visibleComments < sortedComments.length) {
      setVisibleComments((prev) =>
        Math.min(prev + commentsPerPage, sortedComments.length),
      );
    }
  };

  // Function to load previous comments
  const handleLeftArrowClick = () => {
    if (visibleComments > commentsPerPage) {
      setVisibleComments((prev) =>
        Math.max(prev - commentsPerPage, commentsPerPage),
      );
    }
  };

  // Handle filter change
  const handleFilterChange = (rating) => {
    setSelectedRating(rating);
    setVisibleComments(commentsPerPage); // Reset visible comments to the first page after changing the filter
  };

  // Handle sort order change
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setVisibleComments(commentsPerPage); // Reset visible comments to the first page after changing the sort order
  };

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-row justify-center space-x-6">
        {/* Sort Dropdown */}
        <div className="flex justify-center mb-4">
          <select
            className="p-2 rounded-lg border-neutral-800 bg-neutral-600"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="recent">Les plus récents</option>
            <option value="best">Les meilleures évaluations</option>
            <option value="worst">Les moins bonnes évaluations</option>
          </select>
        </div>

        <div className="flex justify-center space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              className={`p-2 rounded-full ${selectedRating === rating ? "bg-orange-400" : "bg-neutral-500"}`}
              onClick={() => handleFilterChange(rating)}
            >
              {rating} ⭐
            </button>
          ))}
          <button
            className={`p-2 rounded-full ${selectedRating === null ? "bg-orange-400" : "bg-neutral-500"}`}
            onClick={() => handleFilterChange(null)} // Reset filter to show all comments
          >
            Tous
          </button>
        </div>
      </div>
      <div className="relative flex items-center">
        {/* Left Arrow */}
        {visibleComments > commentsPerPage && (
          <button
            className="absolute left-0 transform rotate-180 bg-neutral-500 p-2 rounded-full z-10 -ml-10"
            onClick={handleLeftArrowClick}
          >
            ➤
          </button>
        )}

        {/* Comments Container */}
        <div className="flex w-full justify-center px-12 space-x-6">
          {sortedComments
            .slice(visibleComments - commentsPerPage, visibleComments)
            .map((rating, index) => (
              <div
                key={index}
                className="bg-neutral-700 p-4 w-56 h-auto rounded-lg"
              >
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-gray-500 rounded-full mr-3 flex items-center justify-center">
                    {rating.user?.avatar ? (
                      <img
                        src={rating.user.avatar}
                        alt={`${rating.user.username}`}
                        className="w-10 h-10 object-cover rounded-full"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"; // Default image
                        }}
                      />
                    ) : (
                      <span className="text-white">
                        {rating.user?.firstname?.charAt(0) || "U"}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">
                      {rating.user?.username || "Utilisateur"}
                    </p>
                    <span className="text-sm text-gray-400">
                      {rating.offerName || "Produit"}
                    </span>
                    <div className="flex items-center">
                      <StarRating rating={parseInt(rating.note, 10)} />
                      <span className="ml-2 text-sm text-gray-400">
                        {rating.note}/5
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm w-48 mt-2">{rating.comment}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Posté le {new Date(rating.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
        </div>

        {/* Right Arrow */}
        {visibleComments < sortedComments.length && (
          <button
            className="absolute right-0 transform bg-neutral-500 p-2 rounded-full z-10 -mr-10"
            onClick={handleRightArrowClick}
          >
            ➤
          </button>
        )}
      </div>

      {/* Pagination Display */}
      <div className="flex justify-center mt-4 text-gray-500">
        Page {currentPage} / {totalPages}
      </div>
    </div>
  );
};

export default CommentList;
