/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import { getData, putData } from "../../services/data-fetch";
import Button from "../Button/button";

const NonValidatedCompanies = () => {
  const [companies, setCompanies] = useState([]);

  // Fonction pour récupérer les entreprises non validées
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

  // Fonction pour valider une entreprise
  const validateCompany = async (companyId) => {
    try {
        const updatedCompany = { isValidate: 'true' };
        console.log("Company ID:", companyId);
        console.log("Data to update:", updatedCompany);

        
        const response = await putData(`enterprise/${companyId}`, updatedCompany);
        console.log("Response from PUT:", response);

        
        setCompanies((prevCompanies) =>
            prevCompanies.map((company) =>
                company.id === companyId ? { ...company, isValidate: true } : company
            )
        );

        alert("Entreprise validée avec succès");
    } catch (error) {
        console.error("Error validating company:", error);
    }
};


  // Colonnes pour le tableau
  const columns = React.useMemo(
    () => [
      { Header: "Name", accessor: "name" },
      { Header: "Phone", accessor: "phone" },
      { Header: "Mail", accessor: "mail" },
      { Header: "Address", accessor: "adress" },
      { Header: "City", accessor: "city" },
      { Header: "Zip Code", accessor: "zip_code" },
      { Header: "Siret Number", accessor: "siret_number" },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ value }) => (
          <Button
            onClick={() => validateCompany(value)}
            className="rounded-lg px-3 py-1 bg-green-600 hover:bg-green-800 text-white"
          >
            Validate
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
    <div className="mt-8 flex justify-center">
      <table
        {...getTableProps()}
        className="min-w-full bg-neutral-900 text-white border border-gray-700 rounded-lg"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-4 py-2 border-b border-gray-700 text-left"
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
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="px-4 py-2 border-b border-gray-700"
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
