/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import { getData, putData } from "../../services/data-fetch";
import { useSocketIo } from "../../services/UseSocketIo";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Import des icônes

const NonValidatedCompanies = () => {
  const socket = useSocketIo();
  const [companies, setCompanies] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getData("admin/enterprises/not-validate");
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  const validateCompany = async (companyId) => {
    try {
      const formData = new FormData();
      formData.append("isValidate", "true");
      const response = await putData(`enterprise/${companyId}`, formData);
      if (socket) {
        socket.emit("enterpriseValidated", { id: companyId, isValidate: true });
      }

      setCompanies((prevCompanies) =>
        prevCompanies.filter((company) => company.id !== companyId)
      );
    } catch (error) {
      console.error("Error validating company:", error);
    }
  };

  const rejectCompany = async (companyId) => {
    try {
      const formData = new FormData();
      formData.append("isValidate", "false");
      const response = await putData(`enterprise/${companyId}`, formData);
      if (socket) {
        socket.emit("enterpriseRejected", { id: companyId, isValidate: false });
      }

      setCompanies((prevCompanies) =>
        prevCompanies.filter((company) => company.id !== companyId)
      );
    } catch (error) {
      console.error("Error rejecting company:", error);
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: "Nom", accessor: "name" },
      { Header: "Téléphone", accessor: "phone" },
      { Header: "Mail", accessor: "mail" },
      { Header: "Adresse", accessor: "adress" },
      { Header: "Ville", accessor: "city" },
      { Header: "CP", accessor: "zip_code" },
      { Header: "Siret", accessor: "siret_number" },
      { Header: "Région", accessor: "country.name" },
      { Header: "Métier", accessor: "job.name" },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ value }) => (
          <div className="flex justify-around">
            <button
              onClick={() => validateCompany(value)}
              className="text-green-600 dark:text-green-400 hover:scale-110 transition-transform"
              title="Valider l'entreprise"
            >
              <FaCheckCircle size={20} />
            </button>
            <button
              onClick={() => rejectCompany(value)}
              className="text-red-600 dark:text-red-400 hover:scale-110 transition-transform"
              title="Refuser l'entreprise"
            >
              <FaTimesCircle size={20} />
            </button>
          </div>
        ),
      },
    ],
    [companies]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Use `page` instead of `rows` for pagination
    prepareRow,
    state: { pageIndex: currentPageIndex, pageSize: currentPageSize },
    gotoPage,
    setPageSize: setTablePageSize,
  } = useTable(
    {
      columns,
      data: companies,
      initialState: { pageIndex, pageSize },
      pageCount: Math.ceil(companies.length / pageSize),
    },
    usePagination
  );

  const handlePageSizeChange = (event) => {
    const newSize = Number(event.target.value);
    setPageSize(newSize);
    setTablePageSize(newSize);
    setPageIndex(0); // Reset page to 0
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-neutral-600 dark:bg-neutral-800 border dark:border-neutral-700 p-4">
      <div className="p-4">
        <input
          type="text"
          placeholder="Rechercher..."
          className="w-full px-4 py-2 mb-4 rounded-lg dark:bg-neutral-800 bg-gray-300 text-white focus:outline-none focus:ring-[#67FFCC] focus:border-[#67FFCC]"
        />
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
                <tr key={row.id} {...row.getRowProps()}>
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
          Page {currentPageIndex + 1} sur{" "}
          {Math.ceil(companies.length / pageSize)}
        </span>
        <button
          onClick={() => gotoPage(currentPageIndex + 1)}
          disabled={
            currentPageIndex >= Math.ceil(companies.length / pageSize) - 1
          }
          className="px-4 py-2 mx-1 bg-gray-200 rounded-lg ml-4 dark:bg-neutral-700 dark:text-white transform hover:scale-105 border hover:border-[#67FFCC] transition duration-300 ease-in-out"
        >
          Suivant &raquo;
        </button>
      </div>
    </div>
  );
};

export default NonValidatedCompanies;
