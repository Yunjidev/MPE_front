import { useEffect, useState } from 'react';
import { getData, postData } from '../../services/data-fetch';
import { toast } from "react-toastify";
import { FaHeart } from 'react-icons/fa';

const LikeButton = ({ userId, enterpriseId }) => {
    const [hasLiked, setHasLiked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Styles pour l'icône de cœur
    const heartStyles = {
        color: hasLiked ? '#60a5fa' : (isHovered ? '#e3342f' : '#fca5a5'),
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        transition: 'color 0.2s, transform 0.2s',
        cursor: 'pointer'
    };

    useEffect(() => {
        const checkIfLiked = async () => {

            // Supposons que l'API renvoie un tableau de "likes" pour l'entreprise
            const likes = await getData("likes");
            // Vérifiez si l'utilisateur actuel a déjà "liké" l'entreprise
            const userLike = likes.find(like => like.User_id === userId && like.Enterprise_id === enterpriseId);
            setHasLiked(!!userLike);

        };

        checkIfLiked();
    }, [userId, enterpriseId]);

    const handleLike = async (event) => {
        event.stopPropagation();
        if (!userId) {
            toast.info('Veuillez vous connecter pour liker cette entreprise.');
            return;
        }
        if (hasLiked) {
            toast.info('Vous avez déjà liké cette entreprise.');
            return;
        }


        const likeData = {
            User_id: userId,
            Enterprise_id: enterpriseId,
        };
        const result = await postData(`enterprise/${enterpriseId}/like`, likeData);
        if (result.error) {
            toast.error('Une erreur est survenue lors de la création du like.');
            console.error('Erreur lors de la création du like:', result.error);
        } else {
            toast.success('Like créé avec succès.');
            console.log('Like créé avec succès:', result.data);
            setHasLiked(true); // Mettez à jour l'état pour refléter le nouveau "like"
        }

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

export default LikeButton;