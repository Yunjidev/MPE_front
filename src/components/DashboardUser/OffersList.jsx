import React, { useState, useEffect, useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { getData, deleteData, postData, putData } from "../../services/data-fetch";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "../Button/button";
import Modal from "../DashboardAdmin/Modal";
import OfferForm from "./OfferForm";
import { useParams } from 'react-router-dom';

const useOffers = (id, searchQuery) => {
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await getData(`enterprise/${id}/offers`);
        setOffers(data);
        setFilteredOffers(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des offres:", error);
      }
    };
    if (id) fetchOffers();
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
  }, [searchQuery, offers]);

  return { offers, filteredOffers, setOffers };
};

const Pagination = ({ currentPageIndex, pageSize, filteredOffersLength, gotoPage }) => (
  <div className="flex justify-center items-center space-x-4 w-full">
    <button
      onClick={() => gotoPage(0)}
      disabled={currentPageIndex === 0}
      className="px-4 py-2 bg-gray-200 rounded-lg dark:bg-neutral-700 dark:text-white border hover:border-[#67FFCC] transition duration-300 ease-in-out"
    >
      &laquo; Précédente
    </button>
    <span className="dark:text-white text-black font-bold">
      Page {currentPageIndex + 1} sur {Math.ceil(filteredOffersLength / pageSize)}
    </span>
    <button
      onClick={() => gotoPage(currentPageIndex + 1)}
      disabled={currentPageIndex >= Math.ceil(filteredOffersLength / pageSize) - 1}
      className="px-4 py-2 bg-gray-200 rounded-lg dark:bg-neutral-700 dark:text-white border hover:border-[#67FFCC] transition duration-300 ease-in-out"
    >
      Suivante &raquo;
    </button>
  </div>
);

const OffersList = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);

  const { offers, filteredOffers, setOffers } = useOffers(id, searchQuery);

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

  const columns = useMemo(
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
    page,
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
    setPageIndex(0);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-neutral-600 dark:bg-neutral-800 border dark:border-neutral-700">
      <div className="flex justify-between items-center p-4 space-x-4">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/3 px-3 py-1 rounded-lg dark:bg-neutral-800 bg-gray-300 text-white focus:outline-none focus:ring-[#67FFCC] focus:border-[#67FFCC]"
        />
        <Pagination
          currentPageIndex={currentPageIndex}
          pageSize={pageSize}
          filteredOffersLength={filteredOffers.length}
          gotoPage={gotoPage}
        />
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
      
      <div className="flex justify-center items-center mt-2 mb-3 mx-auto w-40">
        <Button
          onClick={addNewOffer}
        >Ajouter une offre
          
        </Button>
      </div>

      {/* Modal pour ajouter ou modifier une offre */}
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
