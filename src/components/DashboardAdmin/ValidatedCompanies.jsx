/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getData, deleteData } from "../../services/data-fetch";
import { addSubscription } from "./SubscriptionManagement/FunctionForSubscription";
import { FaEdit, FaTrash, FaEye, FaPlusCircle, FaSearch, FaMapMarkerAlt, FaUserAlt, FaStar, FaBriefcase } from "react-icons/fa";
import Modal from "./Modal";
import { toast } from "react-toastify";

const ValidatedCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // (réservé si tu veux un modal d’édition plus tard)
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
        setCompanies(data || []);
        setFilteredCompanies(data || []);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  // recherche
  useEffect(() => {
    const q = searchQuery.toLowerCase().trim();
    const filtered = companies.filter((company) => {
      const name = company.name?.toLowerCase() || "";
      const city = company.city?.toLowerCase() || "";
      const zipCode = company.zip_code?.toLowerCase() || "";
      const country = company.country?.name?.toLowerCase() || "";
      const activity = company.job?.name?.toLowerCase() || "";
      const siretNumber = company.siret_number?.toLowerCase() || "";
      const username = company.entrepreneur?.username?.toLowerCase() || "";
      const averageRating = company.averageRating?.toString().toLowerCase() || "";

      return (
        name.includes(q) ||
        city.includes(q) ||
        zipCode.includes(q) ||
        country.includes(q) ||
        activity.includes(q) ||
        username.includes(q) ||
        averageRating.includes(q) ||
        siretNumber.includes(q)
      );
    });
    setFilteredCompanies(filtered);
    setPageIndex(0);
  }, [searchQuery, companies]);

  const confirmDeleteCompany = (company) => {
    setCompanyToDelete(company);
    setIsDeleteConfirmOpen(true);
  };

  const deleteCompany = async () => {
    try {
      await deleteData(`enterprise/${companyToDelete.id}`);
      setCompanies((prev) => prev.filter((c) => c.id !== companyToDelete.id));
      setFilteredCompanies((prev) => prev.filter((c) => c.id !== companyToDelete.id));
      toast.success("Entreprise supprimée avec succès");
    } catch (error) {
      console.error("Error deleting company:", error);
      toast.error("Erreur lors de la suppression de l'entreprise");
    } finally {
      setIsDeleteConfirmOpen(false);
      setCompanyToDelete(null);
    }
  };

  const viewCompany = (companyId) => navigate(`/enterprise/${companyId}`);

  const handleSubscriptionSubmit = async () => {
    if (!selectedCompany) return;
    try {
      await addSubscription(selectedCompany.id, subscriptionStatus, subscriptionType);
      toast.success("Abonnement ajouté avec succès");
      setIsSubscriptionModalOpen(false);
      setSubscriptionStatus("");
      setSubscriptionType("");
    } catch (error) {
      console.error("Error ajout subscription:", error);
      toast.error("Erreur lors de l’ajout de l’abonnement");
    }
  };

  // pagination
  const pageCount = Math.max(1, Math.ceil(filteredCompanies.length / pageSize));
  const currentSlice = filteredCompanies.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  const primaryIconBtn =
    "h-10 w-10 grid place-items-center rounded-xl border border-neutral-700 text-neutral-200 hover:bg-neutral-800 hover:text-white active:scale-[0.98] transition";
  const dangerIconBtn =
    "h-10 w-10 grid place-items-center rounded-xl border border-red-600/40 text-red-300 hover:bg-red-600/10 hover:text-red-200 active:scale-[0.98] transition";

  return (
    <div className="rounded-2xl border border-neutral-800/70 bg-neutral-900/60 backdrop-blur-sm shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]">
      {/* Header + recherche */}
      <div className="p-5 lg:p-6 border-b border-neutral-800/70">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl lg:text-2xl font-semibold text-white">Entreprises validées</h2>
            <p className="text-sm text-neutral-400">Parcourez, recherchez et gérez les entreprises.</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                placeholder="Rechercher par nom, ville, métier…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-80 pl-10 pr-3 h-11 rounded-xl bg-neutral-900/80 text-white placeholder:text-neutral-500 border border-neutral-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition"
              />
            </div>

            {/* page size */}
            <select
              value={pageSize}
              onChange={(e) => {
                const newSize = Number(e.target.value);
                setPageSize(newSize);
                setPageIndex(0);
              }}
              className="h-11 rounded-xl bg-neutral-900/80 text-white border border-neutral-800 outline-none px-3 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition"
            >
              {[5, 10, 20, 50].map((n) => (
                <option value={n} key={n}>
                  {n} / page
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Liste / cartes */}
      <div className="p-5 lg:p-6">
        {currentSlice.length === 0 ? (
          <div className="w-full h-40 grid place-items-center rounded-xl border border-neutral-800 bg-neutral-900/60 text-neutral-400">
            Aucune entreprise trouvée.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {currentSlice.map((company) => {
              const country = company.country?.name || "—";
              const job = company.job?.name || "—";
              const username = company.entrepreneur?.username || "—";
              const rating = company.averageRating ?? "—";

              return (
                <div
                  key={company.id}
                  className="rounded-xl border border-neutral-800 bg-neutral-900/70 p-4 shadow-[0_6px_18px_-10px_rgba(0,0,0,0.7)]"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    {/* Infos principales */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-white font-semibold text-lg leading-tight">
                          {company.name || "Nom inconnu"}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg border border-emerald-500/30 text-emerald-300 bg-emerald-500/10">
                          <FaStar className="opacity-80" />
                          {rating}
                        </span>
                      </div>

                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-neutral-300">
                          <FaMapMarkerAlt className="text-neutral-500" />
                          <span className="truncate">
                            {company.city || "—"} {company.zip_code ? `(${company.zip_code})` : ""} • {country}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-300">
                          <FaBriefcase className="text-neutral-500" />
                          <span className="truncate">{job}</span>
                        </div>
                        <div className="flex items-center gap-2 text-neutral-300">
                          <FaUserAlt className="text-neutral-500" />
                          <span className="truncate">Entrepreneur : {username}</span>
                        </div>
                        {company.siret_number && (
                          <div className="text-neutral-400">
                            <span className="text-neutral-500">SIRET :</span> {company.siret_number}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="md:ml-4 flex md:flex-col gap-2 md:items-end">
                      <button
                        onClick={() => viewCompany(company.id)}
                        className={primaryIconBtn}
                        title="Voir la fiche"
                      >
                        <FaEye />
                      </button>

                      <button
                        onClick={() => {
                          setSelectedCompany(company);
                          setIsSubscriptionModalOpen(true);
                        }}
                        className={primaryIconBtn}
                        title="Ajouter un abonnement"
                      >
                        <FaPlusCircle />
                      </button>

                      <button
                        onClick={() => confirmDeleteCompany(company)}
                        className={dangerIconBtn}
                        title="Supprimer l'entreprise"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
            disabled={pageIndex === 0}
            className={`h-11 px-4 rounded-xl border ${pageIndex === 0 ? "border-neutral-800 text-neutral-600" : "border-neutral-700 text-neutral-200 hover:bg-neutral-800 hover:text-white"} transition`}
          >
            &laquo; Précédent
          </button>

          <div className="text-neutral-300">
            Page <span className="text-white font-semibold">{pageIndex + 1}</span> sur{" "}
            <span className="text-white font-semibold">{pageCount}</span>
          </div>

          <button
            onClick={() => setPageIndex((p) => Math.min(pageCount - 1, p + 1))}
            disabled={pageIndex >= pageCount - 1}
            className={`h-11 px-4 rounded-xl border ${pageIndex >= pageCount - 1 ? "border-neutral-800 text-neutral-600" : "border-neutral-700 text-neutral-200 hover:bg-neutral-800 hover:text-white"} transition`}
          >
            Suivant &raquo;
          </button>
        </div>
      </div>

      {/* Modal confirmation suppression */}
      {isDeleteConfirmOpen && (
        <Modal isOpen={isDeleteConfirmOpen} onClose={() => setIsDeleteConfirmOpen(false)}>
          <div className="text-white bg-neutral-900/90 p-6 border border-neutral-800 rounded-2xl shadow-xl">
            <h2 className="text-lg font-semibold mb-2 text-center">Confirmer la suppression</h2>
            <p className="text-neutral-300 text-center">
              Êtes-vous sûr de vouloir supprimer{" "}
              <span className="text-white font-medium">{companyToDelete?.name}</span> ?
            </p>
            <div className="flex justify-center gap-3 mt-5">
              <button
                onClick={deleteCompany}
                className="h-11 w-36 rounded-xl border border-red-600/50 text-red-300 hover:bg-red-600/10 hover:text-red-200 transition"
              >
                Supprimer
              </button>
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="h-11 w-36 rounded-xl border border-neutral-700 text-neutral-200 hover:bg-neutral-800 hover:text-white transition"
              >
                Annuler
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal abonnement */}
      {isSubscriptionModalOpen && (
        <Modal isOpen={isSubscriptionModalOpen} onClose={() => setIsSubscriptionModalOpen(false)}>
          <div className="text-white bg-neutral-900/90 p-6 rounded-2xl shadow-xl w-[min(90vw,480px)]">
            <h2 className="text-lg font-semibold mb-4 text-center">Ajouter un abonnement</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubscriptionSubmit();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm text-neutral-300 mb-2">Statut</label>
                <select
                  value={subscriptionStatus}
                  onChange={(e) => setSubscriptionStatus(e.target.value)}
                  className="w-full h-11 rounded-xl bg-neutral-900/80 text-white border border-neutral-800 px-3 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition"
                >
                  <option value="">Sélectionner un statut</option>
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-neutral-300 mb-2">Type</label>
                <select
                  value={subscriptionType}
                  onChange={(e) => setSubscriptionType(e.target.value)}
                  className="w-full h-11 rounded-xl bg-neutral-900/80 text-white border border-neutral-800 px-3 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition"
                >
                  <option value="">Sélectionner un type</option>
                  <option value="yearly">Annuel</option>
                  <option value="monthly">Mensuel</option>
                  <option value="forever">À vie</option>
                </select>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  type="submit"
                  className="h-11 w-36 rounded-xl border border-neutral-700 text-neutral-200 hover:bg-neutral-800 hover:text-white transition"
                >
                  Ajouter
                </button>
                <button
                  type="button"
                  onClick={() => setIsSubscriptionModalOpen(false)}
                  className="h-11 w-36 rounded-xl border border-neutral-800 text-neutral-400 hover:bg-neutral-900 transition"
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
