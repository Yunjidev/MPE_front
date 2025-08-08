/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { getData, deleteData } from "../../services/data-fetch";
import { FaEdit, FaTrash } from "react-icons/fa";
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
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false); // Pour la modal de confirmation de suppression
  const [userToDelete, setUserToDelete] = useState(null); // Utilisateur en cours de suppression

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

  const confirmDeleteUser = (user) => {
    setUserToDelete(user);
    setIsDeleteConfirmOpen(true);
  };

  const deleteUser = async () => {
    try {
      await deleteData(`admin/users/${userToDelete.id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete.id));
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsDeleteConfirmOpen(false);
      setUserToDelete(null);
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

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-neutral-800 border border-neutral-700 p-4">
      <div className="p-4">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg bg-neutral-800 text-white focus:outline-none focus:ring-[#67FFCC] focus:border-[#67FFCC]"
        />
      </div>

      {/* Affichage des utilisateurs sous forme de cartes */}
      <div className="flex flex-col gap-4">
        {filteredUsers
          .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
          .map((user) => (
            <div
              key={user.id}
              className="p-4 bg-neutral-800 rounded-lg shadow-md"
            >
              <div className="grid grid-cols-4 gap-4 items-center">
                {/* Première colonne : Informations de l'utilisateur */}
                <div className="flex flex-col">
                  <div className="text-white text-sm">
                    {user.username} 
                  </div>
                  <div className="text-gray-300 text-xs">
                    {user.email}
                  </div>
                </div>

                {/* Première colonne : Informations de l'utilisateur */}
                <div className="flex flex-col">
                  <div className="text-white text-sm">
                    {user.firstname} {user.lastname}
                  </div>
                </div>

                {/* Deuxième colonne : Rôles */}
                <div className="text-gray-300 text-xs">
                  {user.isAdmin ? "Admin" : "Utilisateur"} /{" "}
                  {user.isEntrepreneur ? "Entrepreneur" : "Client"}
                </div>

                {/* Troisième colonne : Boutons d'action */}
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => editUser(user)}
                    className="text-green-400 hover:scale-110 transition-transform"
                    title="Modifier l'utilisateur"
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    onClick={() => confirmDeleteUser(user)}
                    className="text-red-400 hover:scale-110 transition-transform"
                    title="Supprimer l'utilisateur"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => setPageIndex(pageIndex > 0 ? pageIndex - 1 : 0)}
          disabled={pageIndex === 0}
          className="px-3 py-1 mx-1 rounded-lg mr-4 bg-neutral-700 text-white transform hover:scale-105 border hover:border-[#67FFCC] transition duration-300 ease-in-out text-xs"
        >
          « Précédent
        </button>
        <span className="text-white font-bold text-xs">
          Page {pageIndex + 1} sur {Math.ceil(filteredUsers.length / pageSize)}
        </span>
        <button
          onClick={() =>
            setPageIndex(
              pageIndex < Math.ceil(filteredUsers.length / pageSize) - 1
                ? pageIndex + 1
                : pageIndex
            )
          }
          disabled={pageIndex >= Math.ceil(filteredUsers.length / pageSize) - 1}
          className="px-3 py-1 mx-1 rounded-lg ml-4 bg-neutral-700 text-white transform hover:scale-105 border hover:border-[#67FFCC] transition duration-300 ease-in-out text-xs"
        >
          Suivant »
        </button>
      </div>

      {/* Modal de confirmation de suppression */}
      {isDeleteConfirmOpen && (
        <Modal isOpen={isDeleteConfirmOpen} onClose={() => setIsDeleteConfirmOpen(false)}>
          <div className="text-white bg-neutral-800 p-4 border border-white rounded-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">Confirmation</h2>
            <p className="text-center">Êtes-vous sûr de vouloir supprimer cet utilisateur ?</p>
            <div className="flex justify-center space-x-2 mt-4">
              <button
                onClick={deleteUser}
                className="w-32 px-4 py-2 bg-red-500 text-black font-semibold text-center rounded-lg hover:bg-red-600 transition duration-300"
              >
                Supprimer
              </button>
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="w-32 px-4 py-2 bg-gray-500 text-black font-semibold text-center rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Annuler
              </button>
            </div>
          </div>
        </Modal>
      )}


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
