/* eslint-disable react/prop-types */
// src/components/StarRating.js

const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <span
            key={index}
            className={index <= rating ? "text-yellow-500" : "text-gray-300"}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
