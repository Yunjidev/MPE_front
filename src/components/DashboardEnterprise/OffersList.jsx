/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from 'react';
import { getData, deleteData, postData, putData } from '../../services/data-fetch';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { AiOutlineEuro } from "react-icons/ai";
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
        className="border rounded-lg p-2 w-48 mr-2 bg-neutral-800 text-white border-neutral-600" // Utilise des styles sombres par défaut
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
      className="border rounded-lg p-2 w-32 mr-2 bg-neutral-800 text-white border-neutral-600" // Utilise des styles sombres par défaut
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
      className="border rounded-lg p-2 w-32 mr-2 bg-neutral-800 text-white border-neutral-600" // Utilise des styles sombres par défaut
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
      className="border rounded-lg p-2 w-32 mr-2 bg-neutral-800 text-white border-neutral-600" // Utilise des styles sombres par défaut
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
    <div className="relative bg-neutral-800 border border-neutral-700 p-4 rounded-lg">
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
              className="flex bg-gradient-to-r from-[#67FFCC] to-black text-transparent bg-clip-text items-center justify-center w-full md:w-auto h-10 border border-neutral-300 font-bold py-2 px-4 rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <FaPlus className="text-gray-100 w-6 h-6 mr-2" />
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#67FFCC] to-[#FFFFFF]">Ajouter une offre</p>
            </button>
          </div>
        </div>
      </div>

      <ul className="space-y-4">
  {paginatedOffers.map(offer => {
    const hours = Math.floor(offer.duration / 60);
    const minutes = offer.duration % 60;
    const formattedDuration = hours > 0 
      ? (minutes > 0 ? `${hours}H${minutes}` : `${hours}H`)
      : `${minutes}min`;

    return (
      <li key={offer.id} className="bg-neutral-700 border border-neutral-600 p-4 rounded-lg flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-6 md:flex-1">
          {offer.image && (
            <img
              src={offer.image}
              alt={offer.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
          )}
          <div className="flex flex-wrap items-center space-x-6">
            <h3 className="text-lg font-bold text-white">{offer.name}</h3>
            <p className="text-sm text-gray-400">{offer.description}</p>
            <p className="flex items-center space-x-2 text-sm text-gray-400">
              <AiOutlineEuro className="w-4 h-4" />
              <span>{offer.price} €</span>
            </p>
            <p className="flex items-center space-x-2 text-sm text-gray-400">
              <IoTimeOutline className="w-4 h-4" />
              <span>{formattedDuration}</span>
            </p>
            <p className="flex items-center space-x-2 text-sm text-gray-400">
              <IoInformationCircleOutline className="w-4 h-4" />
              <span>{offer.estimate ? 'Estimé' : 'Non estimé'}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <button
            onClick={() => handleEdit(offer)}
            className="text-green-400 hover:scale-110 transition-transform"
            title="Modifier l'offre"
          >
            <FaEdit className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleDelete(offer.id)}
            className="text-red-400 hover:scale-110 transition-transform"
            title="Supprimer l'offre"
          >
            <FaTrash className="w-5 h-5" />
          </button>
        </div>
      </li>
    );
  })}
</ul>



      {/* Pagination */}
      <div className="mt-4 flex flex-wrap justify-between items-center">
        <div className="space-x-2">
          {[...Array(Math.ceil(filteredOffers.length / pageSize)).keys()].map((page) => (
            <button
              key={page}
              onClick={() => setPageIndex(page)}
              className={`px-4 py-2 rounded ${pageIndex === page ? 'bg-neutral-700 text-white' : 'bg-neutral-600 text-gray-300'}`}
            >
              {page + 1}
            </button>
          ))}
        </div>
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          className="border rounded-lg p-2 bg-neutral-800 text-white border-neutral-600"
        >
          <option value={5}>5 par page</option>
          <option value={10}>10 par page</option>
          <option value={15}>15 par page</option>
        </select>
      </div>

      {/* Modal pour ajouter/éditer une offre */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <OfferForm onSave={handleSave} offer={selectedOffer} />
      </Modal>
    </div>
  );
};

export default OffersList;
