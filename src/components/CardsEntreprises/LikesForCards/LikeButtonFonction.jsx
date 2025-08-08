import { useEffect, useState } from "react";
import { getData, postData, deleteData } from "../../../services/data-fetch";
import { toast } from "react-toastify";

// Composant pour la logique
const LikeButtonFonction = ({ userId, enterpriseId, children, onUnlike }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      // Supposons que l'API renvoie un tableau de "likes" pour l'entreprise
      const likes = await getData("likes");
      // Vérifiez si l'utilisateur actuel a déjà "liké" l'entreprise
      const userLike = likes.find(
        (like) => like.User_id === userId && like.Enterprise_id === enterpriseId
      );
      setHasLiked(!!userLike);
    };

    checkIfLiked();
  }, [userId, enterpriseId]);

  const toggleLike = async (event) => {
    event.stopPropagation();

    if (!userId) {
      toast.info("Veuillez vous connecter pour liker ou annuler un like.");
      return;
    }

    if (hasLiked) {
      await handleUnlike();
    } else {
      await handleLike();
    }
  };

  const handleLike = async () => {
    const likeData = {
      User_id: userId,
      Enterprise_id: enterpriseId,
    };

    const result = await postData(`enterprise/${enterpriseId}/like`, likeData);
    if (result.error) {
      toast.error("Une erreur est survenue lors de la création du like.");
      console.error("Erreur lors de la création du like:", result.error);
    } else {
      toast.success("Like créé avec succès.");
      console.log("Like créé avec succès:", result.data);
      setHasLiked(true);
    }
  };

  const handleUnlike = async () => {
    try {
      await deleteData(`enterprise/${enterpriseId}/like`);
      toast.success("Like supprimé avec succès.");
      setHasLiked(false);
      if (onUnlike) onUnlike(enterpriseId); // Appelle la fonction de suppression
    } catch (error) {
      toast.error("Une erreur est survenue lors de la suppression du like.");
      console.error("Erreur lors de la suppression du like:", error);
    }
  };

  return children({
    hasLiked,
    isHovered,
    handleLike: toggleLike,
    setIsHovered,
  });
};

export default LikeButtonFonction;
