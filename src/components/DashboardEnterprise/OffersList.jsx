import React, { useState, useEffect, useMemo } from "react";
import { getData, deleteData, postData, putData } from "../../services/data-fetch";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { IoTimeOutline, IoPricetagOutline, IoInformationCircleOutline } from "react-icons/io5"; // Import des icônes
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
      const description = offer.description ? offer.description.toLowerCase() : "";

      return name.includes(lowercasedQuery) || description.includes(lowercasedQuery);
    });
    setFilteredOffers(filtered);
    setPageIndex(0); // Réinitialiser la page à 0 lors du filtrage
  }, [searchQuery, offers]);

  const deleteOffer = async (offerId) => {
    try {
      await deleteData(`enterprise/${id}/offer/${offerId}`);
      setOffers((prevOffers) => prevOffers.filter((offer) => offer.id !== offerId));
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
    setSelectedOffer(null);
    setIsModalOpen(true);
  };

  const handleSave = async (formDataToSend) => {
    try {
      if (selectedOffer) {
        // Modification d'une offre existante
        await putData(`enterprise/${id}/offer/${selectedOffer.id}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert("Offre mise à jour avec succès.");
      } else {
        // Création d'une nouvelle offre
        await postData(`enterprise/${id}/offer`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert("Offre créée avec succès.");
      }
  
      fetchOffers(); // Rafraîchissement des offres
      setIsModalOpen(false); // Fermeture de la modal
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
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 rounded-lg dark:bg-neutral-800 bg-gray-300 text-white focus:outline-none focus:ring-[#67FFCC] focus:border-[#67FFCC]"
        />
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <button
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={pageIndex === 0}
            className="w-full md:w-auto px-4 py-2 bg-gray-200 rounded-lg dark:bg-neutral-700 dark:text-white border hover:border-[#67FFCC] transition duration-300 ease-in-out"
          >
            &laquo; Précédente
          </button>
          <span className="dark:text-white text-black font-bold">
            Page {pageIndex + 1} sur {Math.ceil(filteredOffers.length / pageSize)}
            Page {pageIndex + 1} sur {Math.ceil(filteredOffers.length / pageSize)}
          </span>
          <button
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={pageIndex >= Math.ceil(filteredOffers.length / pageSize) - 1}
            className="w-full md:w-auto px-4 py-2 bg-gray-200 rounded-lg dark:bg-neutral-700 dark:text-white border hover:border-[#67FFCC] transition duration-300 ease-in-out"
          >
            Suivante &raquo;
          </button>
        </div>
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          className="w-full md:w-auto border rounded-lg dark:bg-neutral-700 dark:text-white p-2"
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
          <li key={offer.id} className="p-4 bg-gray-100 dark:bg-neutral-700 rounded-lg flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 md:flex-1">
              {offer.image && (
                <img
                  src={offer.image}
                  alt={offer.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              )}
              <div className="flex flex-wrap items-center space-x-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{offer.name}</h3>
                <p className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-400">
                  <IoTimeOutline className="text-xl" />
                  <span>Durée : {offer.duration} min</span>
                </p>
                <p className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-400">
                  <IoPricetagOutline className="text-xl" />
                  <span>Prix : {offer.price} €</span>
                </p>
                <p className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-400">
                  <IoInformationCircleOutline className="text-xl" />
                  <span>Estimation : {offer.estimate ? <span> Oui</span> : <span> Non</span>}</span>
                </p>
              </div>
            </div>
            <div className="flex space-x-2 mt-2 md:mt-0">
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
          className="mx-auto flex items-center justify-center bg-gray-800 hover:bg-gradient-to-r hover:from-violet-400 hover:via-orange-400 hover:to-[#67FFCC] text-white py-2 px-4 rounded-lg transition-colors duration-300 ease-in-out"
        >
          <FaPlus className="mr-2" /> Ajouter une offre
        </button>
      </div>

      {/* Modal pour l'ajout/modification d'offres */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedOffer ? "Modifier l'offre" : "Ajouter une nouvelle offre"}
        >
          <OfferForm offer={selectedOffer} onSave={handleSave} onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default OffersList;
