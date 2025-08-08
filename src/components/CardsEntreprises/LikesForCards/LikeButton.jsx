/* eslint-disable react/prop-types */
import LikeButtonFonction from './LikeButtonFonction';
import LikeButtonStyle from './LikeButtonStyle';

const LikeButton = ({ userId, enterpriseId, onUnlike }) => {
    return (
        <LikeButtonFonction userId={userId} enterpriseId={enterpriseId} onUnlike={onUnlike}>
            {({ hasLiked, isHovered, handleLike, setIsHovered }) => (
                <LikeButtonStyle
                    hasLiked={hasLiked}
                    isHovered={isHovered}
                    handleLike={handleLike}
                    setIsHovered={setIsHovered}
                />
            )}
        </LikeButtonFonction>
    );
};

export default LikeButton;
