import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { postData } from "../../services/data-fetch";
import { UserContext } from "../../context/UserContext";
import { useParams } from 'react-router-dom';

export default function OfferForm({ onSubmit }) {
  const { user } = useContext(UserContext); // Utilisation du contexte utilisateur
  const { id } = useParams(); // Récupération de l'ID de l'entreprise

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: 0,
    price: "",
    estimate: false,
    image: null
  });

  const handleChange = (e) => {
    const { id, type, value, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : (type === 'file' ? files[0] : value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, description, duration, price, estimate, image } = formData;
    const offer = { name, description, duration, price, estimate, image };

    if (typeof onSubmit !== 'function') {
      console.error("onSubmit is not a function");
      return;
    }

    try {
      const response = await postData(`enterprise/${id}/offers`, offer, user.token); // Corriger l'URL pour correspondre à la logique de votre API
      alert("Offre créée avec succès");
      onSubmit(response);  // Appelle une fonction de rappel pour gérer le succès
    } catch (error) {
      alert("Une erreur est survenue lors de la création de l'offre.");
      console.error("Erreur lors de la création de l'offre:", error);
    }
  };

  return (
    <div className="bg-neutral-900 text-white w-full p-8">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-semibold">Offre</h2>
      </div>
      <form onSubmit={handleSubmit}>
        {['name', 'description', 'duration', 'price'].map(field => (
          <div key={field} className="mb-4">
            <label htmlFor={field} className="block text-sm font-medium">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === 'duration' ? 'number' : 'text'}
              id={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full mt-1 p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
              placeholder={`Entrée pour ${field}`}
              required
            />
          </div>
        ))}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="estimate"
            checked={formData.estimate}
            onChange={handleChange}
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
            onChange={handleChange}
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
