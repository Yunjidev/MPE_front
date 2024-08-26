import { FaHeart } from 'react-icons/fa';

const LikeButtonStyle = ({ hasLiked, isHovered, handleLike, setIsHovered }) => {

    // Styles pour l'icône de cœur
    const heartStyles = {
        color: hasLiked ? '#60a5fa' : (isHovered ? '#e3342f' : '#fca5a5'),
        transform: isHovered ? 'scale(2)' : 'scale(1)',
        transition: 'color 0.2s, transform 0.2s',
        cursor: 'pointer'
    };

    return (
        <button
            title={hasLiked ? 'Vous avez déjà liké cette entreprise.' : 'Cliquez pour liker cette entreprise.'} // Infobulle
            onClick={handleLike}
            disabled={hasLiked} // Ce bouton sera désactivé si hasLiked est vrai
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