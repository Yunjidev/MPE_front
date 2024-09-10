/* eslint-disable react/prop-types */
import { useState } from "react";
import StarRating from "./StarRatings";
import "./commentlist.css";

const CommentList = ({ offers }) => {
  const commentsPerPage = 6;
  const [visibleComments, setVisibleComments] = useState(commentsPerPage);
  const [selectedRating, setSelectedRating] = useState(null);
  const [sortOrder, setSortOrder] = useState('recent');

  const allComments = offers.flatMap(offer => offer.ratings);

  const filteredComments = selectedRating
    ? allComments.filter((comment) => parseInt(comment.note) === selectedRating)
    : allComments;

  const sortedComments = [...filteredComments].sort((a, b) => {
    if (sortOrder === 'best') {
      return b.note - a.note;
    } else if (sortOrder === 'worst') {
      return a.note - b.note;

    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const totalPages = Math.ceil(sortedComments.length / commentsPerPage);
  const currentPage = Math.ceil(visibleComments / commentsPerPage);

  const handleRightArrowClick = () => {
    if (visibleComments < sortedComments.length) {
      setVisibleComments((prev) =>
        Math.min(prev + commentsPerPage, sortedComments.length),
      );
    }
  };

  const handleLeftArrowClick = () => {
    if (visibleComments > commentsPerPage) {
      setVisibleComments((prev) =>
        Math.max(prev - commentsPerPage, commentsPerPage),
      );
    }
  };

  const handleFilterChange = (rating) => {
    setSelectedRating(rating);
    setVisibleComments(commentsPerPage);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setVisibleComments(commentsPerPage);
  };

  return (
    <div className="container mx-auto px-4">
      <div className='flex flex-col lg:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-4'>
        {/* Sort Dropdown */}
        <div className="flex justify-center">
          <select
            className="p-2 rounded-lg border-neutral-800 bg-neutral-600 text-white"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="recent">Les plus récents</option>
            <option value="best">Les meilleures évaluations</option>
            <option value="worst">Les moins bonnes évaluations</option>
          </select>
        </div>

        {/* Rating Filter Buttons */}
        <div className="flex justify-center space-x-2 text-white">
          {[1, 2, 3, 4, 5].map((rating) => (  
            <button
              key={rating}
              className={`p-2 rounded-full ${selectedRating === rating ? 'bg-orange-400/75' : 'bg-neutral-500/25'}`}
              onClick={() => handleFilterChange(rating)}
            >
              {rating} ⭐
            </button>
          ))}
          <button
            className={`p-2 rounded-full ${selectedRating === null ? 'bg-orange-400/75' : 'bg-neutral-500/25'}`}
            onClick={() => handleFilterChange(null)}
          >
            Tous
          </button>
        </div>
      </div>

      {/* Comments and Navigation Arrows */}
      <div className="flex flex-col lg:flex-row lg:justify-between items-center">
        {/* Left Arrow */}
        {visibleComments > commentsPerPage && (
          <button
            className="transform hide-on-small lg:self-center rotate-180 bg-neutral-500/25 p-2 rounded-full"
            onClick={handleLeftArrowClick}
          >
            ➤
          </button>
        )}

        {/* Comments Container */}
        <div className="flex flex-wrap justify-center items-stretch gap-4">
          {sortedComments.slice(visibleComments - commentsPerPage, visibleComments).map((rating, index) => (
            <div
              key={index}
              className="bg-neutral-700 p-4 rounded-lg w-full sm:w-[250px] flex flex-col"
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
                          'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp';
                      }}
                    />
                  ) : (
                    <span className="text-white">
                      {rating.user?.firstname?.charAt(0) || 'U'}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-semibold">
                    {rating.user?.username || 'Utilisateur'}
                  </p>
                  <span className="text-sm text-gray-400">{rating.offerName || 'Produit'}</span>
                  <div className="flex items-center">
                    <StarRating rating={parseInt(rating.note, 10)} />
                    <span className="ml-2 text-sm text-gray-400">
                      {rating.note}/5
                    </span>
                  </div>

                </div>
              </div>
              <div className="flex-grow">
                <p className="text-sm">{rating.comment}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Posté le {new Date(rating.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        <div className="flex lg:hidden justify-center mt-4 text-gray-500">
          Page {currentPage} / {totalPages}
        </div>

        {visibleComments > commentsPerPage && (
          <button
            className="transform lg:hidden lg:self-center rotate-180 bg-neutral-500/25 p-2 rounded-full"
            onClick={handleLeftArrowClick}
          >
            ➤
          </button>
        )}


        {/* Right Arrow */}
        {visibleComments < sortedComments.length && (
          <button
            className=" lg:self-center transform bg-neutral-500/25 p-2 rounded-full"
            onClick={handleRightArrowClick}
          >
            ➤
          </button>
        )}
      </div>

      {/* Pagination */}
      <div className="hide-on-small lg:flex justify-center mt-4 text-gray-500">
        Page {currentPage} / {totalPages}
      </div>
    </div>
  );
};

export default CommentList;
