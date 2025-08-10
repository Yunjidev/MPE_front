/* eslint-disable react/prop-types */
import LikeButtonFonction from "./LikeButtonFonction";
import LikeButtonStyle from "./LikeButtonStyle";

const LikeButton = ({ userId, enterpriseId, onUnlike }) => {
  return (
    <LikeButtonFonction userId={userId} enterpriseId={enterpriseId} onUnlike={onUnlike}>
      {({ hasLiked, handleLike }) => (
        <LikeButtonStyle hasLiked={hasLiked} handleLike={handleLike} />
      )}
    </LikeButtonFonction>
  );
};

export default LikeButton;
