/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  getData,
  deleteData,
  postData,
  putData,
} from "../../services/data-fetch";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Button from "../Button/button";
import Modal from "../DashboardAdmin/Modal";
import OfferForm from "./OfferForm";
import { useParams } from "react-router-dom";

// Fonction pour décoder les entités HTML
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

  // Récupération des offres
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

      return name.includes(lowercasedQuery) || description.includes(lowercasedQuery);
    });
    setFilteredOffers(filtered);
    setPageIndex(0);
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

  return (
    <div className=" w-full bg-neutral-600 bg-neutral-800">
      <div className="p-4">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg bg-neutral-800 bg-gray-300 text-white focus:outline-none focus:ring-[#67FFCC] focus:border-[#67FFCC]"
        />
        <div className="overflow-y-auto max-h-96">
          {filteredOffers.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize).map((offer) => (
            <div
              key={offer.id}
              className="flex items-center justify-between border-b bg-neutral-800 border-gray-200 hover:bg-gray-50 hover:bg-gray-600 p-4"
            >
              <div className="flex-1 flex items-center space-x-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">{offer.name}</h3>
                </div>
                <div className="flex-1">
                  <div
                    className="text-sm text-white"
                    dangerouslySetInnerHTML={{ __html: decodeHtml(offer.description) }}
                  />
                </div>
                <div className="flex-1 text-sm text-white">
                  Durée : {offer.duration} min
                </div>
                <div className="flex-1 text-sm text-white">
                  Prix : {offer.price} €
                </div>
                <div className="flex-1 text-sm text-white">
                  Estimation : {offer.estimate ? "Oui" : "Non"}
                </div>
                <div className="flex-1">
                  {offer.image ? (
                    <img
                      src={offer.image}
                      alt="Offer"
                      className="w-16 h-16 object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-sm text-white">Aucune image</span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => editOffer(offer)}
                  className="text-green-500 hover:underline"
                >
                  <FaEdit />
                </Button>
                <Button
                  onClick={() => deleteOffer(offer.id)}
                  className="text-red-500 hover:underline"
                >
                  <FaTrash />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => setPageIndex(0)}
            disabled={pageIndex === 0}
            className="px-4 py-2 mx-1 bg-gray-200 rounded-lg mr-4 bg-neutral-700 text-white transform hover:scale-105 border hover:border-[#67FFCC] transition duration-300 ease-in-out"
          >
            &laquo; Précédent
          </button>
          <span className="text-white font-bold">
            Page {pageIndex + 1} sur {Math.ceil(filteredOffers.length / pageSize)}
          </span>
          <button
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={pageIndex >= Math.ceil(filteredOffers.length / pageSize) - 1}
            className="px-4 py-2 mx-1 bg-gray-200 rounded-lg ml-4 bg-neutral-700 text-white transform hover:scale-105 border hover:border-[#67FFCC] transition duration-300 ease-in-out"
          >
            Suivant &raquo;
          </button>
        </div>

        <div className="mt-4">
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="border rounded-lg bg-neutral-700 text-white p-2"
          >
            {[10, 20, 30, 40].map((size) => (
              <option key={size} value={size}>
                {size} offres par page
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="absolute bottom-4 right-4">
        <Button
          onClick={addNewOffer}
          className="bg-gradient-to-r from-[#67FFCC] to-[#33B7A6] bg-[#4CAF50] rounded-full shadow-lg hover:bg-[#56D6B8] hover:bg-[#45A049] transition-colors duration-300 ease-in-out"
        >
          <FaPlus className="text-white text-xl" />
        </Button>
      </div>

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
