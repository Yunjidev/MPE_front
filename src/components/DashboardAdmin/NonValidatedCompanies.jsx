/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import { getData, putData } from "../../services/data-fetch";
import Button from "../Button/button";

const NonValidatedCompanies = () => {
  const [companies, setCompanies] = useState([]);

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
      const updatedCompany = { isValidate: 'true' };
      console.log("Company ID:", companyId);
      console.log("Data to update:", updatedCompany);

      const response = await putData(`enterprise/${companyId}`, updatedCompany);
      console.log("Response from PUT:", response);

      setCompanies((prevCompanies) =>
        prevCompanies.filter((company) => company.id !== companyId)
      );

      alert("Entreprise validée avec succès");
    } catch (error) {
      console.error("Error validating company:", error);
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Phone", accessor: "phone" },
      { Header: "Mail", accessor: "mail" },
      { Header: "Address", accessor: "adress" },
      { Header: "City", accessor: "city" },
      { Header: "Zip Code", accessor: "zip_code" },
      { Header: "Siret Number", accessor: "siret_number" },
      { Header: "Activity", accessor: "job.name" },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ value }) => (
          <Button
            onClick={() => validateCompany(value)}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Valider
          </Button>
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
        className="w-full text-sm text-left text-gray-500 bg-white border border-gray-200 dark:bg-neutral-800 dark:text-gray-400 "
      >
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-neutral-700 dark:text-gray-400 bg-black text-white">
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
                className="border-b dark:bg-neutral-800 dark:border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 hover:bg-neutral-300 bg-neutral-200 border-black-200"
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
  );
};

export default NonValidatedCompanies;
