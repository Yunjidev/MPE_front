/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import { getData, deleteData } from "../../services/data-fetch";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Button from "../Button/button";
import Modal from "./Modal";
import EditCompanyForm from "./EditCompanyForm";

const ValidatedCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getData("enterprises/validate");
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  const deleteCompany = async (companyId) => {
    try {
      await deleteData(`enterprise/${companyId}`);
      setCompanies((prevCompanies) =>
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

  const viewCompany = (companyId) => {
    history.push(`/enterprise/${companyId}/show`);
  };

  const handleSave = () => {
    setIsModalOpen(false);
    // Re-fetch or update companies data here if necessary
  };

  const columns = React.useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "City", accessor: "city" },
      { Header: "Zip Code", accessor: "zip_code" },
      { Header: "Country", accessor: "country.name" },
      { Header: "Activity", accessor: "job.name" },
      { Header: "Siret Number", accessor: "siret_number" },
      
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
    [companies]
  );

  const tableInstance = useTable({ columns, data: companies });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table
        {...getTableProps()}
        className="w-full text-sm text-left text-gray-500 bg-white border border-gray-200 dark:bg-neutral-800 dark:text-gray-400"
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
          {rows.map((row) => {
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
