/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { postData, getData } from "../../services/data-fetch";
import { UserContext } from "../../context/UserContext";

export default function OfferForm({ onSubmit }) {
  const { user } = useContext(UserContext); // Utilisation du contexte utilisateur

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [price, setPrice] = useState("");
  const [estimate, setEstimate] = useState(false);
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const offer = {
      name,
      description,
      duration,
      price,
      estimate,
      image,
    };

    try {
      const response = await postData("admin/offers", offer);
      alert("Offre créée avec succès");
      onSubmit(response);  // Appelle une fonction de rappel pour gérer le succès
    } catch (error) {
      console.error("Erreur lors de la création de l'offre:", error);

      if (error.response) {
        const status = error.response.status;
        if (status === 422) {
          const errorDetails = await error.response.json();
          const validationErrors = errorDetails.errors || {};
          // Gérer les erreurs de validation
        } else {
          const errorText = await error.response.text();
          // Gérer d'autres codes de statut
        }
      } else {
        // Gérer les erreurs sans réponse
      }
    }
  };

  return (
    <div className="bg-neutral-900 text-white w-full p-8">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-semibold">Création Offre</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Nom de l'offre
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
            placeholder="Nom de l'offre"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-1 p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
            rows="4"
            placeholder="Description de l'offre"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="duration" className="block text-sm font-medium">
            Durée (en heures)
          </label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full mt-1 p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
            placeholder="Durée de l'offre"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium">
            Prix
          </label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full mt-1 p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
            placeholder="Prix de l'offre"
            required
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="estimate"
            checked={estimate}
            onChange={(e) => setEstimate(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="estimate" className="text-sm font-medium">
            Estimation seulement
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium">
            Image
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full mt-1 p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
          />
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-gradient-to-r from-[#67FFCC] to-black text-transparent bg-clip-text font-semibold py-2 px-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
          >
            Créer Offre
          </button>
        </div>
      </form>
    </div>
  );
}

OfferForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
