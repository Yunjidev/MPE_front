import React from 'react';
import { postData } from '../../services/data-fetch';
import { toast } from "react-toastify";

const LikeButton = ({ userId, enterpriseId }) => {
    const handleLike = async (event) => {
        event.stopPropagation();
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
        }
      };

  return (
    <input
      type="radio"
      name={`rating-${enterpriseId}`}
      className="mask mask-heart bg-red-400"
      onClick={handleLike}
    />
  );
};

export default LikeButton;