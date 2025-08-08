/* eslint-disable react/prop-types */
import { FaHeart } from "react-icons/fa";

const LikeButtonStyle = ({ hasLiked, isHovered, handleLike, setIsHovered }) => {
  // Styles pour l'icône de cœur
  const heartStyles = {
    color: hasLiked ? "#e3342f" : isHovered ? "#60a5fa" : "#fca5a5",
    transform: isHovered ? "scale(2)" : "scale(1)",
    transition: "color 0.2s, transform 0.2s",
    cursor: "pointer",
  };

  return (
    <button
      title={
        hasLiked
          ? "Cliquez pour annuler votre like."
          : "Cliquez pour liker cette entreprise."
      } // Infobulle
      onClick={handleLike}
    >
      <FaHeart
        style={heartStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </button>
  );
};

export default LikeButtonStyle;
