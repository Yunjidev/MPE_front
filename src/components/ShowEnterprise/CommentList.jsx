import React, { useRef, useState, useEffect } from 'react';
import StarRating from './StarRatings';
import './commentlist.css';

const CommentList = ({ offers }) => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Function to scroll left or right
  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Adjust scroll amount as needed
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Function to check scroll position and update arrow visibility
  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      // Check if there is space to scroll to the right
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  // Use effect to attach the scroll listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition(); // Initial check on mount

      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, [offers]); // Re-run effect when offers change

  // Ensure arrows are correctly displayed on component mount and when offers change
  useEffect(() => {
    checkScrollPosition();
  }, [offers]);

  return (
    <div className="relative">
      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          className="absolute rotate-180 left-0 top-1/2 transform -translate-y-1/2 bg-orange-400 p-2 rounded-full"
          onClick={() => handleScroll('left')}
        >
          ➤
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-scroll scrollbar-hide px-12 space-x-6"
      >
        {offers.flatMap((offer) =>
          offer.ratings.map((rating, index) => (
            <div key={index} className="bg-gray-700 p-4 w-56 h-auto rounded-lg">
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
                          'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'; // Default image
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
                  <span className="text-sm text-gray-400">{offer.name}</span>
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
          ))
        )}
        {offers.every((offer) => offer.ratings.length === 0) && (
          <p className="text-center text-gray-400">
            Aucun commentaire pour le moment
          </p>
        )}
      </div>

      {/* Right Arrow */}
      {showRightArrow && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-orange-400 p-2 rounded-full"
          onClick={() => handleScroll('right')}
        >
          ➤
        </button>
      )}
    </div>
  );
};

export default CommentList;
