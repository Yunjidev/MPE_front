import React, { useState, useEffect, useMemo } from "react";
import { getData, deleteData, postData, putData } from "../../services/data-fetch";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Button from "../Button/button";
import Modal from "../DashboardAdmin/Modal";
import OfferForm from "./OfferForm";
import { useParams } from 'react-router-dom';

const decodeHtml = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const OffersList = () => {
  const { id } = useParams();
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);

  const fetchOffers = async () => {
    try {
      const data = await getData(`enterprise/${id}`);
      setOffers(data.offers || []);
      setFilteredOffers(data.offers || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des offres:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchOffers();
    }
  }, [id]);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = offers.filter((offer) => {
      const name = offer.name ? offer.name.toLowerCase() : "";
      const description = offer.description ? offer.description.toLowerCase() : "";

      return (
        name.includes(lowercasedQuery) ||
        description.includes(lowercasedQuery)
      );
    });
    setFilteredOffers(filtered);
    setPageIndex(0); // Réinitialiser la page à 0 lors du filtrage
  }, [searchQuery, offers]);

  const deleteOffer = async (offerId) => {
    try {
      await deleteData(`enterprise/${id}/offer/${offerId}`);
      setOffers((prevOffers) =>
        prevOffers.filter((offer) => offer.id !== offerId)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de l'offre:", error);
      alert("Une erreur est survenue lors de la suppression de l'offre.");
    }
  };

  const editOffer = (offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  const addNewOffer = () => {
    setSelectedOffer(null); // Clear selection to add new
    setIsModalOpen(true);
  };

  const handleSave = async (formDataToSend) => {
    try {
      if (selectedOffer) {
        await putData(`enterprise/${id}/offer/${selectedOffer.id}`, formDataToSend);
        alert("Offre mise à jour avec succès.");
      } else {
        await postData(`enterprise/${id}/offer`, formDataToSend);
        alert("Offre créée avec succès.");
      }
      
      fetchOffers();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de l'offre:", error);
      alert("Une erreur est survenue lors de la sauvegarde de l'offre.");
    }
  };

  // Pagination logic
  const paginatedOffers = useMemo(() => {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    return filteredOffers.slice(start, end);
  }, [filteredOffers, pageIndex, pageSize]);

  const handlePageSizeChange = (event) => {
    const newSize = Number(event.target.value);
    setPageSize(newSize);
    setPageIndex(0); // Réinitialiser la page à 0
  };

  return (
    <div className="relative bg-neutral-600 dark:bg-neutral-800 border dark:border-neutral-700 p-4 rounded-lg">
      {/* Barre de recherche, Pagination et Sélecteur de taille de page en haut */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/3 px-4 py-2 rounded-lg dark:bg-neutral-800 bg-gray-300 text-white focus:outline-none focus:ring-[#67FFCC] focus:border-[#67FFCC]"
        />
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={pageIndex === 0}
            className="px-4 py-2 bg-gray-200 rounded-lg dark:bg-neutral-700 dark:text-white border hover:border-[#67FFCC] transition duration-300 ease-in-out"
          >
            &laquo; Précédente
          </button>
          <span className="dark:text-white text-black font-bold">
            Page {pageIndex + 1} sur {Math.ceil(filteredOffers.length / pageSize)}
          </span>
          <button
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={pageIndex >= Math.ceil(filteredOffers.length / pageSize) - 1}
            className="px-4 py-2 bg-gray-200 rounded-lg dark:bg-neutral-700 dark:text-white border hover:border-[#67FFCC] transition duration-300 ease-in-out"
          >
            Suivante &raquo;
          </button>
        </div>
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          className="border rounded-lg dark:bg-neutral-700 dark:text-white p-2"
        >
          {[10, 20, 30, 40].map((size) => (
            <option key={size} value={size}>
              {size} offres par page
            </option>
          ))}
        </select>
      </div>

      {/* Liste des offres paginées */}
      <ul className="space-y-4">
        {paginatedOffers.map((offer) => (
          <li key={offer.id} className="p-4 bg-gray-100 dark:bg-neutral-700 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{offer.name}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-400">
                {decodeHtml(offer.description)}
              </p>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                <p>Durée : {offer.duration} min</p>
                <p>Prix : {offer.price} €</p>
                <p>Estimation : {offer.estimate ? "Oui" : "Non"}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => editOffer(offer)}
                className="text-green-600 dark:text-green-500 hover:underline"
              >
                <FaEdit />
              </Button>
              <Button
                onClick={() => deleteOffer(offer.id)}
                className="text-red-600 dark:text-red-500 hover:underline"
              >
                <FaTrash />
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {/* Bouton Ajouter une offre centré en bas */}
      <div className="flex justify-center mt-6">
        <button
          onClick={addNewOffer}
          className="mx-auto flex items-center justify-center bg-gray-800 hover:bg-gradient-to-r hover:from-violet-400 hover:via-orange-400 hover:to-green-300 hover:text-black text-white font-bold rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out py-3 px-4"
        >
          <FaPlus className="mr-3 text-white text-base" />
          Ajouter une offre
        </button>
      </div>

      {/* Modal pour formulaire d'offre */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <OfferForm
          offer={selectedOffer}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSave}
        />
      </Modal>
    </div>
  );
};

export default OffersList;
