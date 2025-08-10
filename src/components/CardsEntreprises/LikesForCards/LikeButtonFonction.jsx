/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from "react";
import { getData, postData, deleteData } from "../../../services/data-fetch";
import { toast } from "react-toastify";

// Composant logique (render-prop)
const LikeButtonFonction = ({ userId, enterpriseId, children, onUnlike }) => {
  const [hasLiked, setHasLiked] = useState(false);

  // Normalise pour éviter les comparaisons string/number
  const uid = Number(userId);
  const eid = Number(enterpriseId);

  useEffect(() => {
    let mounted = true;

    const checkIfLiked = async () => {
      try {
        const likes = await getData("likes"); // [{ id, User_id, Enterprise_id }, ...]
        const userLike = likes.find(
          (like) => Number(like.User_id) === uid && Number(like.Enterprise_id) === eid
        );
        if (mounted) setHasLiked(Boolean(userLike));
      } catch (err) {
        console.error("Erreur lors de la récupération des likes:", err);
      }
    };

    if (uid && eid) checkIfLiked();
    return () => {
      mounted = false;
    };
  }, [uid, eid]);

  const handleLikeCreate = useCallback(async () => {
    const likeData = { User_id: uid, Enterprise_id: eid };

    const result = await postData(`enterprise/${eid}/like`, likeData);
    if (result?.error) {
      toast.error("Une erreur est survenue lors de la création du like.");
      console.error("Erreur création like:", result.error);
      return false;
    }
    toast.success("Like créé avec succès.");
    return true;
  }, [uid, eid]);

  const handleLikeDelete = useCallback(async () => {
    try {
      await deleteData(`enterprise/${eid}/like`);
      toast.success("Like supprimé avec succès.");
      if (typeof onUnlike === "function") onUnlike(eid); // MAJ liste favoris
      return true;
    } catch (error) {
      toast.error("Une erreur est survenue lors de la suppression du like.");
      console.error("Erreur suppression like:", error);
      return false;
    }
  }, [eid, onUnlike]);

  const toggleLike = useCallback(
    async (event) => {
      // protège si l’event n’est pas passé
      event?.stopPropagation?.();

      if (!uid) {
        toast.info("Veuillez vous connecter pour liker ou annuler un like.");
        return;
      }
      if (!eid) return;

      // Optimistic UI
      const next = !hasLiked;
      setHasLiked(next);

      const ok = next ? await handleLikeCreate() : await handleLikeDelete();
      if (!ok) {
        // rollback si API échoue
        setHasLiked(!next);
      }
    },
    [uid, eid, hasLiked, handleLikeCreate, handleLikeDelete]
  );

  // Render prop
  return children({
    hasLiked,
    handleLike: toggleLike,
  });
};

export default LikeButtonFonction;
