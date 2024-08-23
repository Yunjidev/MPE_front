import { useEffect, useState } from 'react';
import { getData, postData } from '../../../services/data-fetch';
import { toast } from "react-toastify";


// Composant pour la logique
const LikeButtonFonction = ({ userId, enterpriseId, children }) => {
    const [hasLiked, setHasLiked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

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

    // Passer les props nécessaires au composant enfant
    return children({ hasLiked, isHovered, handleLike, setIsHovered });
};

export default LikeButtonFonction;