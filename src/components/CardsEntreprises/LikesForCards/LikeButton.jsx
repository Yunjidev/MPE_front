import LikeButtonFonction from './LikeButtonFonction';
import LikeButtonStyle from './LikeButtonStyle';


const LikeButton = ({ userId, enterpriseId }) => {
    return (
        <LikeButtonFonction userId={userId} enterpriseId={enterpriseId}>
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