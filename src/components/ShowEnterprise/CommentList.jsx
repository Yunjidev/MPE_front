/* eslint-disable react/prop-types */
// src/components/CommentList.js
import StarRating from './StarRatings';

const CommentList = ({ offers }) => {
  return (
    <div className="p-6 rounded-lg space-y-4">
      {offers.flatMap((offer) =>
        offer.ratings.map((rating, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-gray-500 rounded-full mr-3 flex items-center justify-center">
                {rating.user?.avatar ? (
                  <img
                    src={rating.user.avatar}
                    alt={`${rating.user.username}`}
                    className="w-10 h-10 object-cover rounded-full"
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'; // Default image
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
                <div className="flex items-center">
                  <StarRating rating={parseInt(rating.note, 10)} />
                  <span className="ml-2 text-sm text-gray-400">{offer.name}</span>
                </div>
              </div>
            </div>
            <p className="text-sm mt-2">{rating.comment}</p>
            <p className="text-xs text-gray-500 mt-1">Posté le {new Date(rating.createdAt).toLocaleDateString()}</p>
          </div>
        ))
      )}
      {offers.every((offer) => offer.ratings.length === 0) && (
        <p className="text-center text-gray-400">Aucun commentaire pour le moment</p>
      )}
    </div>
  );
};

export default CommentList;
