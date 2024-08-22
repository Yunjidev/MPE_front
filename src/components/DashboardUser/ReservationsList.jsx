import React, { useState, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import { getData, deleteData } from "../../services/data-fetch";
import { FaTrash } from "react-icons/fa";
import Button from "../Button/button";
import { useParams } from "react-router-dom";

const ReservationsList = () => {
  const { id } = useParams();  
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);

  // Fonction pour obtenir les réservations
  const fetchReservations = async () => {
    try {
      const data = await getData(`enterprise/${id}/reservations`);
      setReservations(data);
      setFilteredReservations(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchReservations();
    }
  }, [id]);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = reservations.filter((reservation) => {
      const offerName = reservation.offer?.name ? reservation.offer.name.toLowerCase() : "";
      const userName = reservation.user?.firstName ? reservation.user.firstName.toLowerCase() : "";

      return (
        offerName.includes(lowercasedQuery) ||
        userName.includes(lowercasedQuery)
      );
    });
    setFilteredReservations(filtered);
    setPageIndex(0);
  }, [searchQuery, reservations]);

  const deleteReservation = async (reservationId) => {
    try {
      await deleteData(`enterprise/${id}/reservation/${reservationId}`);
      setReservations((prevReservations) =>
        prevReservations.filter((reservation) => reservation.id !== reservationId)
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de la réservation:", error);
      alert("Une erreur est survenue lors de la suppression de la réservation.");
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: "Offre", accessor: "offer.name" },
      { Header: "Client", accessor: "user.firstName" },
      { Header: "Date", accessor: "date" },
      { Header: "Heure de début", accessor: "start_time" },
      { Header: "Heure de fin", accessor: "end_time" },
      { Header: "Statut", accessor: "status" },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <Button
              onClick={() => deleteReservation(row.original.id)}
              className="text-red-600 dark:text-red-500 hover:underline"
            >
              <FaTrash />
            </Button>
          </div>
        ),
      },
    ],
    [reservations]
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
      data: filteredReservations,
      initialState: { pageIndex, pageSize },
      pageCount: Math.ceil(filteredReservations.length / pageSize),
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
          <span className="dark:text-white text-black font-bold">
            Page {currentPageIndex + 1} sur {Math.ceil(filteredReservations.length / pageSize)}
          </span>
          <button
            onClick={() => gotoPage(currentPageIndex + 1)}
            disabled={currentPageIndex >= Math.ceil(filteredReservations.length / pageSize) - 1}
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
                {size} réservations par page
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ReservationsList;
