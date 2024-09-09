import React, { useState, useEffect, useMemo } from 'react';
import { getData, deleteData, postData, putData } from '../../services/data-fetch';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { IoTimeOutline, IoInformationCircleOutline } from 'react-icons/io5';
import Modal from '../DashboardAdmin/Modal';
import OfferForm from './OfferForm';
import { useParams } from 'react-router-dom';

// Composant de filtrage
const SearchBar = ({ filterText, onFilterTextChange }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Rechercher..."
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
        className="border rounded-lg p-2 w-48 mr-2"  // Réduit la largeur du champ de recherche
      />
    </div>
  );
};

// Composant de filtrage pour la durée
const DurationFilter = ({ selectedDuration, onDurationChange }) => {
  return (
    <select
      value={selectedDuration}
      onChange={(e) => onDurationChange(e.target.value)}
      className="border rounded-lg p-2 w-32 mr-2"  // Réduit la largeur du filtre de durée
    >
      <option value="">Toutes les durées</option>
      <option value="60">1h</option>
      <option value="120">2h</option>
      <option value="180">3h</option>
    </select>
  );
};

// Composant de filtrage pour l'estimation
const EstimateFilter = ({ isEstimated, onEstimateChange }) => {
  return (
    <select
      value={isEstimated}
      onChange={(e) => onEstimateChange(e.target.value === 'true')}
      className="border rounded-lg p-2 w-32 mr-2"  // Réduit la largeur du filtre d'estimation
    >
      <option value="">Toutes les estimations</option>
      <option value="true">Estimé</option>
      <option value="false">Non estimé</option>
    </select>
  );
};

// Composant de tri pour la durée
const DurationSort = ({ sortOrder, onSortOrderChange }) => {
  return (
    <select
      value={sortOrder}
      onChange={(e) => onSortOrderChange(e.target.value)}
      className="border rounded-lg p-2 w-32 mr-2"  // Réduit la largeur du tri par durée
    >
      <option value="">Pas de tri</option>
      <option value="asc">Durée croissante</option>
      <option value="desc">Durée décroissante</option>
    </select>
  );
};

const OffersList = () => {
  const { id } = useParams();
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [filterText, setFilterText] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [isEstimated, setIsEstimated] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  // Fetch offers from API
  const fetchOffers = async () => {
    console.log('Fetching offers...');
    try {
      const response = await getData(`enterprise/${id}`);
      console.log('Offers fetched:', response);
      setOffers(response.offers || []);
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };

  useEffect(() => {
    if (id) fetchOffers();
  }, [id]);

  useEffect(() => {
    // Apply filters whenever offers or filters change
    let filtered = offers
      .filter(offer => offer.name.toLowerCase().includes(filterText.toLowerCase()))
      .filter(offer => selectedDuration === '' || offer.duration === parseInt(selectedDuration))
      .filter(offer => isEstimated === '' || offer.estimate === isEstimated);

    // Apply sorting
    if (sortOrder === 'asc') {
      filtered = filtered.sort((a, b) => a.duration - b.duration);
    } else if (sortOrder === 'desc') {
      filtered = filtered.sort((a, b) => b.duration - a.duration);
    }

    setFilteredOffers(filtered);
  }, [offers, filterText, selectedDuration, isEstimated, sortOrder]);

  // Paginate offers
  const paginatedOffers = useMemo(() => {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    return filteredOffers.slice(start, end);
  }, [filteredOffers, pageIndex, pageSize]);

  const handleDelete = async (offerId) => {
    console.log('Deleting offer with ID:', offerId);
    try {
      await deleteData(`enterprise/${id}/offer/${offerId}`);
      fetchOffers(); // Refresh offers after delete
    } catch (error) {
      console.error('Error deleting offer:', error);
    }
  };

  const handleEdit = (offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedOffer(null);
    setIsModalOpen(true);
  };

  const handleSave = async (formDataToSend) => {
    console.log('Saving offer...', formDataToSend);
    try {
      if (selectedOffer) {
        await putData(`enterprise/${id}/offer/${selectedOffer.id}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await postData(`enterprise/${id}/offer`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      fetchOffers(); // Refresh offers after save
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving offer:', error);
    }
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPageIndex(0); // Reset page index when page size changes
  };

  return (
    <div className="relative bg-neutral-600 bg-neutral-800 border border-neutral-700 p-4 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-start mb-4 space-y-4 md:space-y-0">
        <SearchBar filterText={filterText} onFilterTextChange={setFilterText} />
        <div className="flex flex-wrap items-center space-x-2">
          {/* Filtre de Durée */}
          <DurationFilter selectedDuration={selectedDuration} onDurationChange={setSelectedDuration} />
          {/* Filtre d'Estimation */}
          <EstimateFilter isEstimated={isEstimated} onEstimateChange={setIsEstimated} />
          {/* Tri par Durée */}
          <DurationSort sortOrder={sortOrder} onSortOrderChange={setSortOrder} />
        </div>
        <div className="flex flex-col w-full md:w-auto">
          <div className="mb-4">
            <button
              onClick={handleAddNew}
              className="flex dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] bg-gradient-to-r from-[#67FFCC] to-black text-transparent bg-clip-text items-center justify-center w-full md:w-auto h-10 border border-neutral-300 font-bold py-2 px-4 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <FaPlus className="text-gray-800 dark:text-gray-100 w-6 h-6 mr-2" />
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#67FFCC] to-[#FFFFFF]">Ajouter une offre</p>
            </button>
          </div>
        </div>
      </div>

      <ul className="space-y-4">
        {paginatedOffers.map(offer => (
          <li key={offer.id} className="bg-white bg-neutral-700 border border-neutral-200 border-neutral-600 p-4 rounded-lg flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 md:flex-1">
              {offer.image && (
                <img
                  src={offer.image}
                  alt={offer.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
              )}
              <div className="flex flex-wrap items-center space-x-6">
                <h3 className="text-lg font-bold text-gray-900">{offer.name}</h3>
                <p className="flex items-center space-x-2 text-sm text-gray-700 text-gray-400">
                  <IoTimeOutline className="text-xl" />
                  <span>Durée : {offer.duration} min</span>
                </p>
                <p className="flex items-center space-x-2 text-sm text-gray-700 text-gray-400">
                  <IoInformationCircleOutline className="text-xl" />
                  <span>Estimation : {offer.estimate ? <span> Oui</span> : <span> Non</span>}</span>
                </p>
              </div>
            </div>
            <div className="flex space-x-2 mt-2 md:mt-0">
              <button
                onClick={() => handleEdit(offer)}
                className="flex bg-gradient-to-r dark:from-white dark:to-[#67FFCC] bg-gradient-to-r from-[#67FFCC] to-black text-transparent bg-clip-text items-center justify-center w-32 h-10 border border-neutral-300 font-bold py-2 px-4 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
              >
                <FaEdit className="text-gray-800 dark:text-gray-100 w-3 h-3 mr-2" />
                <p>Editer</p>
              </button>
              <button
                onClick={() => handleDelete(offer.id)}
                className="flex dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] bg-gradient-to-r from-[#67FFCC] to-black text-transparent bg-clip-text items-center justify-center w-32 h-10 border border-neutral-300 font-bold py-2 px-4 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
              >
                <FaTrash className="text-gray-800 text-gray-100 w-6 h-6 mr-2" />
                <p>Supprimer</p>
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setPageIndex(prevIndex => Math.max(prevIndex - 1, 0))}
            disabled={pageIndex === 0}
            className="px-4 py-2 bg-gray-200 rounded-lg bg-neutral-700 text-white border hover:border-[#67FFCC] transition duration-300 ease-in-out"
          >
            &laquo; Précédente
          </button>
          <span className="text-white font-bold">
            Page {pageIndex + 1} sur {Math.ceil(filteredOffers.length / pageSize)}
          </span>
          <button
            onClick={() => setPageIndex(prevIndex => Math.min(prevIndex + 1, Math.ceil(filteredOffers.length / pageSize) - 1))}
            disabled={pageIndex >= Math.ceil(filteredOffers.length / pageSize) - 1}
            className="px-4 py-2 bg-gray-200 rounded-lg bg-neutral-700 text-white border hover:border-[#67FFCC] transition duration-300 ease-in-out"
          >
            Suivante &raquo;
          </button>
        </div>
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          className="border rounded-lg bg-neutral-700 text-white p-2"
        >
          {[10, 20, 30, 40].map(size => (
            <option key={size} value={size}>
              {size} offres par page
            </option>
          ))}
        </select>
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedOffer ? "Modifier l'offre" : "Ajouter une nouvelle offre"}
        >
          <OfferForm offer={selectedOffer} onSave={handleSave} onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default OffersList;
