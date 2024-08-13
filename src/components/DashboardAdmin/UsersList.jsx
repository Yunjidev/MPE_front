/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import { getData, deleteData } from "../../services/data-fetch";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "../Button/button";
import Modal from "./Modal";
import EditUserForm from "./EditUserForm";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getData("admin/users");
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = users.filter((user) => {
      const username = user.username ? user.username.toLowerCase() : "";
      const firstname = user.firstname ? user.firstname.toLowerCase() : "";
      const lastname = user.lastname ? user.lastname.toLowerCase() : "";
      const email = user.email ? user.email.toLowerCase() : "";
  
      return (
        username.includes(lowercasedQuery) ||
        firstname.includes(lowercasedQuery) ||
        lastname.includes(lowercasedQuery) ||
        email.includes(lowercasedQuery)
      );
    });
    setFilteredUsers(filtered);
    setPageIndex(0); // Réinitialiser la page à 0 lors du changement de la recherche
  }, [searchQuery, users]);

  const deleteUser = async (userId) => {
    try {
      await deleteData(`admin/users/${userId}`);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const editUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSave = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      )
    );
    setIsModalOpen(false);
  };

  const columns = React.useMemo(
    () => [
      { Header: "Pseudo", accessor: "username" },
      { Header: "Prénom", accessor: "firstname" },
      { Header: "Nom", accessor: "lastname" },
      { Header: "Email", accessor: "email" },
      { Header: "Admin", accessor: "isAdmin", Cell: ({ value }) => (value ? "Oui" : "Non") },
      { Header: "Entrepreneur", accessor: "isEntrepeneur", Cell: ({ value }) => (value ? "Oui" : "Non") },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <Button
              onClick={() => editUser(row.original)}
              className="text-green-600 dark:text-green-500 hover:underline"
            >
              <FaEdit />
            </Button>
            <Button
              onClick={() => deleteUser(row.original.id)}
              className="text-red-600 dark:text-red-500 hover:underline"
            >
              <FaTrash />
            </Button>
          </div>
        ),
      },
    ],
    [users]
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
      data: filteredUsers,
      initialState: { pageIndex, pageSize },
      pageCount: Math.ceil(filteredUsers.length / pageSize),
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
          <span className="dark:text-white text-black font-bold">Page {currentPageIndex + 1} sur {Math.ceil(filteredUsers.length / pageSize)}</span>
          <button
            onClick={() => gotoPage(currentPageIndex + 1)}
            disabled={currentPageIndex >= Math.ceil(filteredUsers.length / pageSize) - 1}
            className="px-4 py-2 mx-1 bg-gray-200 rounded-lg ml-4 dark:bg-neutral-700 dark:text-white transform hover:scale-105 border hover:border-[#67FFCC] transition duration-300 ease-in-out"
          >
            Suivant &raquo;
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedUser && (
          <EditUserForm
            user={selectedUser}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
          />
        )}
      </Modal>
    </div>
  );
};

export default UsersList;
