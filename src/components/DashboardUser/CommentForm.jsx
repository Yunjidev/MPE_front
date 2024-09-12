// // src/components/CommentForm.jsx
// import React, { useState } from 'react';
// import { putData } from '../../services/data-fetch';

// const CommentForm = ({ reservationId, onSubmit }) => {
//   const [comment, setComment] = useState('');
//   const [rating, setRating] = useState(0);

//   const handleCommentChange = (event) => {
//     setComment(event.target.value);
//   };

//   const handleRatingChange = (event) => {
//     setRating(event.target.value);
//   };

//   const handleSubmit = async () => {
//     try {
//       await putData(`offer/${reservationId}/rating`, {
//         note: rating,
//         comment: comment,
//         Offer_id: reservationId,
//       });
//       if (onSubmit) {
//         onSubmit();
//       }
//       alert('Commentaire ajouté avec succès!');
//     } catch (error) {
//       console.error("Error adding comment:", error);
//       alert("Une erreur s'est produite lors de l'ajout du commentaire. Veuillez réessayer.");
//     }
//   };

//   return (
//     <div className="p-4 bg-neutral-700 text-white rounded-lg shadow-lg mb-4">
//       <textarea
//         value={comment}
//         onChange={handleCommentChange}
//         placeholder="Votre commentaire"
//         className="w-full p-2 bg-neutral-600 text-white rounded-lg"
//       />
//       <input
//         type="number"
//         value={rating}
//         onChange={handleRatingChange}
//         min="1"
//         max="5"
//         placeholder="Note (1-5)"
//         className="w-full mt-2 p-2 bg-neutral-600 text-white rounded-lg"
//       />
//       <button
//         onClick={handleSubmit}
//         className="w-full mt-2 p-2 bg-blue-500 text-white rounded-lg"
//       >
//         Soumettre le commentaire
//       </button>
//     </div>
//   );
// };

// export default CommentForm;
