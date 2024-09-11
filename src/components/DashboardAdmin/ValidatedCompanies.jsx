/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getData, deleteData } from "../../services/data-fetch";
import { addSubscription } from "./SubscriptionManagement/FunctionForSubscription";
import { FaEdit, FaTrash, FaEye, FaPlusCircle } from "react-icons/fa";
import Modal from "./Modal";
import { toast } from "react-toastify";

const ValidatedCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState("");
  const [subscriptionType, setSubscriptionType] = useState("");

  const navigate = useNavigate();

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
      const country = company.country && company.country.name
        ? company.country.name.toLowerCase()
        : "";
      const activity = company.job && company.job.name
        ? company.job.name.toLowerCase()
        : "";
      const siretNumber = company.siret_number
        ? company.siret_number.toLowerCase()
        : "";
      const username = company.entrepreneur && company.entrepreneur.username
        ? company.entrepreneur.username.toLowerCase()
        : "";
      const averageRating = company.averageRating
        ? company.averageRating.toString().toLowerCase()
        : "";

      return (
        name.includes(lowercasedQuery) ||
        city.includes(lowercasedQuery) ||
        zipCode.includes(lowercasedQuery) ||
        country.includes(lowercasedQuery) ||
        activity.includes(lowercasedQuery) ||
        username.includes(lowercasedQuery) ||
        averageRating.includes(lowercasedQuery) ||
        siretNumber.includes(lowercasedQuery)
      );
    });
    setFilteredCompanies(filtered);
    setPageIndex(0); // Reset to page 0 on search
  }, [searchQuery, companies]);

  const confirmDeleteCompany = (company) => {
    setCompanyToDelete(company);
    setIsDeleteConfirmOpen(true);
  };

  const deleteCompany = async () => {
    try {
      await deleteData(`enterprise/${companyToDelete.id}`);
      setCompanies((prevCompanies) =>
        prevCompanies.filter((company) => company.id !== companyToDelete.id)
      );
      setFilteredCompanies((prevCompanies) =>
        prevCompanies.filter((company) => company.id !== companyToDelete.id)
      );
      toast.success("Entreprise supprimée avec succès");
    } catch (error) {
      console.error("Error deleting company:", error);
    } finally {
      setIsDeleteConfirmOpen(false);
      setCompanyToDelete(null);
    }
  };

  const viewCompany = (companyId) => {
    navigate(`/enterprise/${companyId}`);
  };

  const handleSave = (updatedCompany) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === updatedCompany.id
          ? { ...company, ...updatedCompany }
          : company
      )
    );
    setFilteredCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === updatedCompany.id
          ? { ...company, ...updatedCompany }
          : company
      )
    );
    setIsModalOpen(false);
  };

  const handleSubscriptionSubmit = async () => {
    try {
      await addSubscription(selectedCompany.id, subscriptionStatus, subscriptionType);
      toast.success("Subscription ajoutée avec succès");
      setIsSubscriptionModalOpen(false);
    } catch (error) {
      console.error("Error ajout subscritpion:", error);
      toast.error("Error ajout subscritpion");
    }
  };

  // Pagination
  const pageCount = Math.ceil(filteredCompanies.length / pageSize);

  const handlePageSizeChange = (event) => {
    const newSize = Number(event.target.value);
    setPageSize(newSize);
    setPageIndex(0); // Reset to page 0
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-neutral-800 border border-neutral-700">
      <div className="p-4">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg bg-neutral-800 text-white focus:outline-none focus:ring-[#67FFCC] focus:border-[#67FFCC]"
        />
      </div>

      {/* Affichage en cartes horizontales tout le temps avec colonnes */}
      <div className="flex flex-col">
        {filteredCompanies
          .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
          .map((company) => (
            <div
              key={company.id}
              className="mb-4 p-4 rounded-lg shadow-md bg-neutral-800 flex items-center"
            >
              <div className="flex-grow">
                <div className="grid grid-cols-2 gap-4">
                  <div className="font-bold text-white">
                    Nom:
                  </div>
                  <div className="text-white">
                    {company.name}
                  </div>
                  <div className="font-bold text-white">
                    Ville:
                  </div>
                  <div className="text-white">
                    {company.city}
                  </div>
                  <div className="font-bold text-white">
                    CP:
                  </div>
                  <div className="text-white">
                    {company.zip_code}
                  </div>
                  <div className="font-bold text-white">
                    Région:
                  </div>
                  <div className="text-white">
                    {company.country && company.country.name}
                  </div>
                  <div className="font-bold text-white">
                    Métier:
                  </div>
                  <div className="text-white">
                    {company.job && company.job.name}
                  </div>
                  <div className="font-bold text-white">
                    Pseudo:
                  </div>
                  <div className="text-white">
                    {company.entrepreneur && company.entrepreneur.username}
                  </div>
                  <div className="font-bold text-white">
                    Note moyenne:
                  </div>
                  <div className="text-white">
                    {company.averageRating}
                  </div>
                </div>
              </div>
              <div className="ml-4 flex flex-col justify-center items-center mb-6">
                <button
                  onClick={() => viewCompany(company.id)}
                  className="text-[#67FFCC] hover:scale-110 transition-transform text-2xl mb-6"
                >
                  <FaEye />
                </button>
                <button
                  onClick={() => confirmDeleteCompany(company)}
                  className="text-red-500 hover:scale-110 transition-transform text-2xl"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => {
                    setSelectedCompany(company);
                    setIsSubscriptionModalOpen(true);
                  }}
                  className="text-blue-500 hover:scale-110 transition-transform text-2xl mt-5"
                >
                  <FaPlusCircle/>
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 mb-4">
        <button
          onClick={() => setPageIndex(0)}
          disabled={pageIndex === 0}
          className="px-4 py-2 mx-1 bg-neutral-700 text-white rounded-lg mr-4 transform hover:scale-105 border hover:border-[#67FFCC] transition duration-300 ease-in-out"
        >
          &laquo; Précédent
        </button>
        <span className="text-white font-bold">
          Page {pageIndex + 1} sur {pageCount}
        </span>
        <button
          onClick={() => setPageIndex(pageIndex + 1)}
          disabled={pageIndex >= pageCount - 1}
          className="px-4 py-2 mx-1 bg-neutral-700 text-white rounded-lg ml-4 transform hover:scale-105 border hover:border-[#67FFCC] transition duration-300 ease-in-out"
        >
          Suivant &raquo;
        </button>
      </div>

      {/* Modal de confirmation de suppression */}
      {isDeleteConfirmOpen && (
        <Modal isOpen={isDeleteConfirmOpen} onClose={() => setIsDeleteConfirmOpen(false)}>
          <div className="text-white bg-neutral-800 p-4 border border-white rounded-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">Confirmation</h2>
            <p className="text-center">Êtes-vous sûr de vouloir supprimer cette entreprise ?</p>
            <div className="flex justify-center space-x-2 mt-4">
              <button
                onClick={deleteCompany}
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

      {/* Modal d'abonnement */}
      {isSubscriptionModalOpen && (
        <Modal isOpen={isSubscriptionModalOpen} onClose={() => setIsSubscriptionModalOpen(false)}>
          <div className="text-white bg-neutral-800 p-4 border border-white rounded-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">Ajouter un abonnement</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSubscriptionSubmit();
            }}>
              <div className="mb-4">
                <label className="block text-white mb-2">Statut de l'abonnement</label>
                <select
                  value={subscriptionStatus}
                  onChange={(e) => setSubscriptionStatus(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-neutral-800 text-white focus:outline-none focus:ring-[#67FFCC] focus:border-[#67FFCC]"
                >
                  <option value="">Sélectionner un statut</option>
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2">Type d'abonnement</label>
                <select
                  value={subscriptionType}
                  onChange={(e) => setSubscriptionType(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-neutral-800 text-white focus:outline-none focus:ring-[#67FFCC] focus:border-[#67FFCC]"
                >
                  <option value="">Sélectionner un type</option>
                  <option value="yearly">Annuel</option>
                  <option value="monthly">Mensuel</option>
                  <option value="forever">À vie</option>
                </select>
              </div>
              <div className="flex justify-center space-x-2 mt-4">
                <button
                  type="submit"
                  className="w-32 px-4 py-2 bg-green-500 text-black font-semibold text-center rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Ajouter
                </button>
                <button
                  type="button"
                  onClick={() => setIsSubscriptionModalOpen(false)}
                  className="w-32 px-4 py-2 bg-gray-500 text-black font-semibold text-center rounded-lg hover:bg-gray-600 transition duration-300"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ValidatedCompanies;
