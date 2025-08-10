/* eslint-disable react/prop-types */
import { FaHeart } from "react-icons/fa";
import { useState } from "react";

const LikeButtonStyle = ({ hasLiked, handleLike }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e) => {
    setIsAnimating(true);
    handleLike(e); // on passe l’event pour stopPropagation
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      type="button"
      title={
        hasLiked ? "Cliquez pour annuler votre like." : "Cliquez pour liker cette entreprise."
      }
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center justify-center p-2 rounded-full"
    >
      {/* Halo animé si liké */}
      {hasLiked && (
        <span
          className="absolute w-8 h-8 rounded-full bg-orange-500/30 animate-ping"
          style={{ zIndex: 0 }}
        />
      )}

      <FaHeart
        className={`relative z-10 transition-all duration-300 ${
          hasLiked
            ? "text-orange-400 drop-shadow-[0_0_6px_rgba(255,153,0,0.6)]"
            : isHovered
            ? "text-orange-300"
            : "text-neutral-400"
        }`}
        style={{
          transform: isAnimating ? "scale(1.4)" : isHovered ? "scale(1.2)" : "scale(1)",
        }}
      />
    </button>
  );
};

export default LikeButtonStyle;
