import React, { useState, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import { getData, deleteData, postData } from "../../services/data-fetch";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Button from "../Button/button";
import Modal from "../DashboardAdmin/Modal";
import EditOfferForm from "./OfferForm";
import { useParams } from 'react-router-dom'; // Importer useParams

const OffersList = () => {
  const { id } = useParams();  // Récupérer l'ID de l'entreprise
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      // Fonction pour obtenir les offres
      const fetchOffers = async () => {
        try {
          const data = await getData(`enterprise/${id}/offers`);
          setOffers(data);
          setFilteredOffers(data);
        } catch (error) {
          console.error("Erreur lors de la récupération des offres:", error);
        }
      };

      fetchOffers();
    }
  }, [id]);  // Recharger les offres si l'ID change

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
    setPageIndex(0); // Réinitialiser la page à 0 lors du changement de la recherche
  }, [searchQuery, offers]);

  const deleteOffer = async (offerId) => {
    try {
      await deleteData(`enterprise/${id}/offer/${offerId}`);
      setOffers((prevOffers) =>
        prevOffers.filter((offer) => offer.id !== offerId)
      );
      alert("Offre supprimée avec succès");
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

  const handleSave = async (updatedOffer) => {
    try {
      if (updatedOffer.id) {
        // Update existing offer
        setOffers((prevOffers) =>
          prevOffers.map((offer) =>
            offer.id === updatedOffer.id ? { ...offer, ...updatedOffer } : offer
          )
        );
      } else {
        // Add new offer
        const newOffer = await postData(`enterprise/${id}/offers`, updatedOffer);
        setOffers((prevOffers) => [...prevOffers, newOffer]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de l'offre:", error);
      alert("Une erreur est survenue lors de la sauvegarde de l'offre.");
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: "Nom de l'offre", accessor: "name" },
      { Header: "Description", accessor: "description" },
      { Header: "Durée (min)", accessor: "duration" },
      { Header: "Prix (€)", accessor: "price", Cell: ({ value }) => `${value} €` },
      { Header: "Estimation", accessor: "estimate", Cell: ({ value }) => (value ? "Oui" : "Non") },
      { Header: "Image", accessor: "image", Cell: ({ value }) => value ? <img src={value} alt="Offer" className="w-16 h-16 object-cover" /> : "Aucune" },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <Button
              onClick={() => editOffer(row.original)}
              className="text-green-600 dark:text-green-500 hover:underline"
            >
              <FaEdit />
            </Button>
            <Button
              onClick={() => deleteOffer(row.original.id)}
              className="text-red-600 dark:text-red-500 hover:underline"
            >
              <FaTrash />
            </Button>
          </div>
        ),
      },
    ],
    [offers]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Utilisez `page` au lieu de `rows` pour la pagination
    prepareRow,
    state: { pageIndex: currentPageIndex, pageSize: currentPageSize },
    gotoPage,
    setPageSize: setTablePageSize,
  } = useTable(
    {
      columns,
      data: filteredOffers,
      initialState: { pageIndex, pageSize },
      pageCount: Math.ceil(filteredOffers.length / pageSize),
    },
    usePagination
  );

  const handlePageSizeChange = (event) => {
    const newSize = Number(event.target.value);
    setPageSize(newSize);
    setTablePageSize(newSize);
    setPageIndex(0); // Réinitialiser la page à 0
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-neutral-600 dark:bg-neutral-800 border dark:border-neutral-700">
      <div className="p-4">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg dark:bg-neutral-800 bg-gray-300 text-white focus:outline-none focus:ring-[#67FFCC] focus:border-[#67FFCC]"
        />
        <div className="overflow-x-auto">
          <table
            {...getTableProps()}
            className="w-full text-sm text-center text-gray-500 bg-white border border-gray-200 dark:bg-neutral-800 dark:text-gray-400"
          >
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-neutral-700 dark:text-gray-400">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-6 py-3 border-b border-gray-200 dark:border-gray-200"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className="border-b dark:bg-neutral-800 dark:border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => gotoPage(0)}
            disabled={currentPageIndex === 0}
            className="px-4 py-2 mx-1 bg-gray-200 rounded-lg mr-4 dark:bg-neutral-700 dark:text-white transform hover:scale-105 border hover:border-[#67FFCC] transition duration-300 ease-in-out"
          >
            &laquo; Précédent
          </button>
          <span className="dark:text-white text-black font-bold">Page {currentPageIndex + 1} sur {Math.ceil(filteredOffers.length / pageSize)}</span>
          <button
            onClick={() => gotoPage(currentPageIndex + 1)}
            disabled={currentPageIndex >= Math.ceil(filteredOffers.length / pageSize) - 1}
            className="px-4 py-2 mx-1 bg-gray-200 rounded-lg ml-4 dark:bg-neutral-700 dark:text-white transform hover:scale-105 border hover:border-[#67FFCC] transition duration-300 ease-in-out"
          >
            Suivant &raquo;
          </button>
        </div>

        <div className="mt-4">
          <select
            value={currentPageSize}
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
      </div>

      <div className="absolute bottom-4 right-4">
        <Button
          onClick={addNewOffer}
          className="bg-gradient-to-r from-[#67FFCC] to-[#33B7A6] dark:bg-[#4CAF50] rounded-full shadow-lg hover:bg-[#56D6B8] dark:hover:bg-[#45A049] transition-colors duration-300 ease-in-out"
        >
          <FaPlus className="text-white text-xl" />
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <EditOfferForm
          offer={selectedOffer}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSave}
        />
      </Modal>
    </div>
  );
};

export default OffersList;
