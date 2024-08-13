/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import { getData, deleteData } from "../../services/data-fetch";
import { FaEdit, FaTrash } from "react-icons/fa";
import Button from "../Button/button";
import Modal from "./Modal";
import EditUserForm from "./EditUserForm";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getData("admin/users");
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await deleteData(`users/${userId}`);
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

  const handleSave = () => {
    setIsModalOpen(false);
    // Re-fetch or update users data here if necessary
  };

  const columns = React.useMemo(
    () => [
      { Header: "Username", accessor: "username" },
      { Header: "First Name", accessor: "firstname" },
      { Header: "Last Name", accessor: "lastname" },
      { Header: "Email", accessor: "email" },
      { Header: "Is Admin", accessor: "isAdmin", Cell: ({ value }) => (value ? "Yes" : "No") },
      { Header: "Is Entrepreneur", accessor: "isEntrepeneur", Cell: ({ value }) => (value ? "Yes" : "No") },
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

  const tableInstance = useTable({ columns, data: users });
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
