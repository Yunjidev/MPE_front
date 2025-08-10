/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { getData, deleteData } from "../../services/data-fetch";
import { FaEdit, FaTrash, FaSearch, FaUserCircle, FaShieldAlt, FaBriefcase } from "react-icons/fa";
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
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

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
    const q = searchQuery.toLowerCase();
    const filtered = users.filter((u) => {
      const username = (u.username || "").toLowerCase();
      const firstname = (u.firstname || "").toLowerCase();
      const lastname = (u.lastname || "").toLowerCase();
      const email = (u.email || "").toLowerCase();
      return (
        username.includes(q) ||
        firstname.includes(q) ||
        lastname.includes(q) ||
        email.includes(q)
      );
    });
    setFilteredUsers(filtered);
    setPageIndex(0);
  }, [searchQuery, users]);

  const confirmDeleteUser = (user) => {
    setUserToDelete(user);
    setIsDeleteConfirmOpen(true);
  };

  const deleteUser = async () => {
    try {
      await deleteData(`admin/users/${userToDelete.id}`);
      setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
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
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? { ...u, ...updatedUser } : u))
    );
    setIsModalOpen(false);
  };

  const pageCount = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const slice = filteredUsers.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 backdrop-blur-sm p-5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-white">Utilisateurs</h2>
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-72">
            <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Rechercher par nom, email…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 rounded-xl bg-neutral-900/80 pl-10 pr-3 text-sm text-white placeholder:text-neutral-500 border border-neutral-800 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 outline-none transition"
            />
          </div>

          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageIndex(0);
            }}
            className="h-10 rounded-xl bg-neutral-900/80 text-white text-sm border border-neutral-800 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 outline-none transition px-3"
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}/page
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cards list */}
      <div className="space-y-3">
        {slice.map((u) => (
          <div
            key={u.id}
            className="rounded-xl border border-neutral-800 bg-neutral-900/80 p-4 hover:border-emerald-400/40 transition shadow-[0_0_15px_-10px_rgba(0,0,0,0.8)]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              {/* Identity */}
              <div className="sm:col-span-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-neutral-800 grid place-items-center text-neutral-400 overflow-hidden">
                  {u.avatar ? (
                    <img src={u.avatar} alt={u.username} className="h-full w-full object-cover" />
                  ) : (
                    <FaUserCircle className="text-2xl" />
                  )}
                </div>
                <div>
                  <div className="text-white text-sm font-medium leading-tight">
                    {u.username || "—"}
                  </div>
                  <div className="text-neutral-400 text-xs">{u.email || "—"}</div>
                </div>
              </div>

              {/* Name */}
              <div className="sm:col-span-3">
                <div className="text-white text-sm">{u.firstname || "—"} {u.lastname || ""}</div>
                <div className="text-neutral-500 text-xs">Nom complet</div>
              </div>

              {/* Roles */}
              <div className="sm:col-span-2 flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs
                  ${u.isAdmin ? "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-600/30" : "bg-neutral-700/40 text-neutral-300 ring-1 ring-neutral-600/40"}`}>
                  <FaShieldAlt /> {u.isAdmin ? "Admin" : "Utilisateur"}
                </span>
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs
                  ${u.isEntrepreneur ? "bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-600/30" : "bg-neutral-700/40 text-neutral-300 ring-1 ring-neutral-600/40"}`}>
                  <FaBriefcase /> {u.isEntrepreneur ? "Entrepreneur" : "Client"}
                </span>
              </div>

              {/* Actions */}
              <div className="sm:col-span-2 flex justify-start sm:justify-end gap-2">
                <button
                  onClick={() => editUser(u)}
                  className="h-9 w-9 grid place-items-center rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-500/15 ring-1 ring-emerald-600/30 transition"
                  title="Modifier l'utilisateur"
                >
                  <FaEdit size={16} />
                </button>
                <button
                  onClick={() => confirmDeleteUser(u)}
                  className="h-9 w-9 grid place-items-center rounded-lg text-red-300 hover:text-white hover:bg-red-500/15 ring-1 ring-red-600/30 transition"
                  title="Supprimer l'utilisateur"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {slice.length === 0 && (
          <div className="text-center py-10 text-neutral-400 text-sm">
            Aucun utilisateur trouvé.
          </div>
        )}
      </div>

<div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
  <span className="text-xs text-neutral-400">
    {filteredUsers.length} utilisateur(s) — page {pageIndex + 1} / {pageCount}
  </span>

  <div className="flex items-center gap-2">
    <button
      onClick={() => setPageIndex(0)}
      disabled={pageIndex === 0}
      className="h-9 px-3 rounded-xl text-sm bg-neutral-800 text-neutral-200 ring-1 ring-neutral-700 disabled:opacity-50 hover:bg-neutral-700 transition"
    >
      Début
    </button>

    <button
      onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
      disabled={pageIndex === 0}
      className="h-9 px-3 rounded-xl text-sm bg-neutral-800 text-neutral-200 ring-1 ring-neutral-700 disabled:opacity-50 hover:bg-neutral-700 transition"
    >
      « Précédent
    </button>

    <button
      onClick={() => setPageIndex((p) => Math.min(pageCount - 1, p + 1))}
      disabled={pageIndex >= pageCount - 1}
      className="h-9 px-3 rounded-xl text-sm bg-neutral-800 text-neutral-200 ring-1 ring-neutral-700 disabled:opacity-50 hover:bg-neutral-700 transition"
    >
      Suivant »
    </button>

    <button
      onClick={() => setPageIndex(pageCount - 1)}
      disabled={pageIndex >= pageCount - 1}
      className="h-9 px-3 rounded-xl text-sm bg-neutral-800 text-neutral-200 ring-1 ring-neutral-700 disabled:opacity-50 hover:bg-neutral-700 transition"
    >
      Fin
    </button>
  </div>
</div>

      {/* Modal suppression */}
      {isDeleteConfirmOpen && (
        <Modal isOpen={isDeleteConfirmOpen} onClose={() => setIsDeleteConfirmOpen(false)}>
          <div className="text-white bg-neutral-900 p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-center">Confirmer la suppression</h3>
            <p className="mt-2 text-center text-neutral-300">
              Supprimer <span className="font-medium">{userToDelete?.username}</span> ?
              Cette action est irréversible.
            </p>
            <div className="mt-5 flex justify-center gap-2">
              <button
                onClick={deleteUser}
                className="h-10 px-4 rounded-xl text-sm font-medium bg-red-600 text-white hover:bg-red-500 transition"
              >
                Supprimer
              </button>
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="h-10 px-4 rounded-xl text-sm font-medium bg-neutral-800 text-neutral-200 ring-1 ring-neutral-700 hover:bg-neutral-700 transition"
              >
                Annuler
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal édition */}
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
