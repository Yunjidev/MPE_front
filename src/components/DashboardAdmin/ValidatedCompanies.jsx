/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import { getData, deleteData } from "../../services/data-fetch";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Button from "../Button/button";
import Modal from "./Modal";
import EditCompanyForm from "./EditCompanyForm";

const ValidatedCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getData("enterprises/validate");
        setCompanies(data);
        setFilteredCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = companies.filter((company) => {
      const name = company.name ? company.name.toLowerCase() : "";
      const city = company.city ? company.city.toLowerCase() : "";
      const zipCode = company.zip_code ? company.zip_code.toLowerCase() : "";
      const country = company.country.name ? company.country.name.toLowerCase() : "";
      const activity = company.job.name ? company.job.name.toLowerCase() : "";
      const siretNumber = company.siret_number ? company.siret_number.toLowerCase() : "";

      return (
        name.includes(lowercasedQuery) ||
        city.includes(lowercasedQuery) ||
        zipCode.includes(lowercasedQuery) ||
        country.includes(lowercasedQuery) ||
        activity.includes(lowercasedQuery) ||
        siretNumber.includes(lowercasedQuery)
      );
    });
    setFilteredCompanies(filtered);
    setPageIndex(0); // Reset to page 0 on search
  }, [searchQuery, companies]);

  const deleteCompany = async (companyId) => {
    try {
      await deleteData(`enterprise/${companyId}`);
      setCompanies((prevCompanies) =>
        prevCompanies.filter((company) => company.id !== companyId)
      );
      setFilteredCompanies((prevCompanies) =>
        prevCompanies.filter((company) => company.id !== companyId)
      );
      alert("Entreprise supprimée avec succès");
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  const editCompany = (company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleSave = (updatedCompany) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === updatedCompany.id ? { ...company, ...updatedCompany } : company
      )
    );
    setFilteredCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === updatedCompany.id ? { ...company, ...updatedCompany } : company
      )
    );
    setIsModalOpen(false);
  };

  const columns = React.useMemo(
    () => [
      { Header: "Nom", accessor: "name" },
      { Header: "Ville", accessor: "city" },
      { Header: "CP", accessor: "zip_code" },
      { Header: "Région", accessor: "country.name" },
      { Header: "Métier", accessor: "job.name" },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <Button
              onClick={() => viewCompany(row.original.id)}
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              <FaEye />
            </Button>
            <Button
              onClick={() => editCompany(row.original)}
              className="text-green-600 dark:text-green-500 hover:underline"
            >
              <FaEdit />
            </Button>
            <Button
              onClick={() => deleteCompany(row.original.id)}
              className="text-red-600 dark:text-red-500 hover:underline"
            >
              <FaTrash />
            </Button>
          </div>
        ),
      },
    ],
    [filteredCompanies]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Use `page` for pagination
    prepareRow,
    state: { pageIndex: currentPageIndex, pageSize: currentPageSize },
    gotoPage,
    setPageSize: setTablePageSize,
  } = useTable(
    {
      columns,
      data: filteredCompanies,
      initialState: { pageIndex, pageSize },
      pageCount: Math.ceil(filteredCompanies.length / pageSize),
    },
    usePagination
  );

  const handlePageSizeChange = (event) => {
    const newSize = Number(event.target.value);
    setPageSize(newSize);
    setTablePageSize(newSize);
    setPageIndex(0); // Reset to page 0
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
          <span className="dark:text-white text-black font-bold">Page {currentPageIndex + 1} sur {Math.ceil(filteredCompanies.length / pageSize)}</span>
          <button
            onClick={() => gotoPage(currentPageIndex + 1)}
            disabled={currentPageIndex >= Math.ceil(filteredCompanies.length / pageSize) - 1}
            className="px-4 py-2 mx-1 bg-gray-200 rounded-lg ml-4 dark:bg-neutral-700 dark:text-white transform hover:scale-105 border hover:border-[#67FFCC] transition duration-300 ease-in-out"
          >
            Suivant &raquo;
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedCompany && (
          <EditCompanyForm
            company={selectedCompany}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
          />
        )}
      </Modal>
    </div>
  );
};

export default ValidatedCompanies;
