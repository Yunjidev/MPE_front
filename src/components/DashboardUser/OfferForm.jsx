import React, { useState } from "react";

const OfferForm = ({ offer, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: offer ? offer.name : "",
    description: offer ? offer.description : "",
    duration: offer ? offer.duration : "",
    price: offer ? offer.price : "",
    estimate: offer ? offer.estimate : false,
    image: null,
  });

  const handleChange = (e) => {
    const { id, value, type, checked, files } = e.target;

    if (type === "file") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: files[0],
      }));
    } else if (type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: checked,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Créez une instance de FormData pour gérer l'envoi des fichiers et des autres données du formulaire
    const formDataToSend = new FormData();
    formDataToSend.append("nom", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("durée", formData.duration);
    formDataToSend.append("prix", formData.price);
    formDataToSend.append("estimation", formData.estimate);

    if (formData.image) {
      formDataToSend.append("image", formData.image); 
    }

    try {
      await onSubmit(formDataToSend);
      onClose();  // Fermer la modal après succès
    } catch (error) {
      console.error("Erreur lors de la création de l'offre:", error);
      alert("Une erreur est survenue lors de la création de l'offre.");
    }
  };

  return (
    <div className="bg-neutral-900 text-white w-full p-8">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-semibold">{offer ? "Modifier l'offre" : "Créer une nouvelle offre"}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        {['le nom', 'la description', 'la durée', 'le prix'].map(field => (
          <div key={field} className="mb-4">
            <label htmlFor={field} className="block text-sm font-medium">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === 'durée' || field === 'prix' ? 'nombre' : 'texte'}
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
            accept="image/*"
            onChange={handleChange}
            className="w-full mt-1 p-2 rounded bg-neutral-800 border border-neutral-700 text-white"
          />
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-gradient-to-r from-[#67FFCC] to-black text-transparent bg-clip-text font-semibold py-2 px-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
          >
            {offer ? "Modifier l'offre" : "Créer Offre"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OfferForm;
