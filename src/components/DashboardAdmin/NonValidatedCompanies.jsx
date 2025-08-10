/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";
import { getData, putData } from "../../services/data-fetch";
import { useSocketIo } from "../../services/UseSocketIo";
import { useAtom } from "jotai";
import { enterprisesAtom } from "../../store/enterprises";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCity,
  FaBuilding,
  FaBriefcase,
  FaSearch,
} from "react-icons/fa";
import Modal from "./Modal";

const NonValidatedCompanies = () => {
  const socket = useSocketIo();

  // ← Setter de l’atom global lu par la sidebar
  const [, setEnterprises] = useAtom(enterprisesAtom);

  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [isValidateConfirmOpen, setIsValidateConfirmOpen] = useState(false);
  const [isRejectConfirmOpen, setIsRejectConfirmOpen] = useState(false);
  const [companyToValidate, setCompanyToValidate] = useState(null);
  const [companyToReject, setCompanyToReject] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getData("admin/enterprises/not-validate");
        setCompanies(data || []);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  // Recherche
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return companies;
    return companies.filter((c) => {
      const name = c.name?.toLowerCase() || "";
      const city = c.city?.toLowerCase() || "";
      const cp = String(c.zip_code || "").toLowerCase();
      const mail = c.mail?.toLowerCase() || "";
      const job = c.job?.name?.toLowerCase() || "";
      const siret = String(c.siret_number || "").toLowerCase();
      return (
        name.includes(q) ||
        city.includes(q) ||
        cp.includes(q) ||
        mail.includes(q) ||
        job.includes(q) ||
        siret.includes(q)
      );
    });
  }, [companies, search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageSlice = filtered.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  useEffect(() => {
    setPageIndex(0);
  }, [search, pageSize]);

  const validateCompany = async (companyId) => {
    try {
      const formData = new FormData();
      formData.append("isValidate", "true");
      await putData(`enterprise/${companyId}`, formData);

      // MAJ locale (liste admin)
      setCompanies((prev) => prev.filter((c) => c.id !== companyId));

      // MAJ immédiate de l’atom global → la sidebar se rafraîchit
      setEnterprises((prev) =>
        Array.isArray(prev)
          ? prev.map((e) => (e.id === companyId ? { ...e, isValidate: true } : e))
          : prev
      );

      // (optionnel) broadcast socket
      socket?.emit("enterpriseValidated", { id: companyId, isValidate: true });
    } catch (error) {
      console.error("Error validating company:", error);
    } finally {
      setIsValidateConfirmOpen(false);
      setCompanyToValidate(null);
    }
  };

  const rejectCompany = async (companyId) => {
    try {
      const formData = new FormData();
      formData.append("isValidate", "false");
      await putData(`enterprise/${companyId}`, formData);

      // MAJ locale
      setCompanies((prev) => prev.filter((c) => c.id !== companyId));

      // MAJ immédiate de l’atom global pour cohérence UI
      setEnterprises((prev) =>
        Array.isArray(prev)
          ? prev.map((e) => (e.id === companyId ? { ...e, isValidate: false } : e))
          : prev
      );

      socket?.emit("enterpriseRejected", { id: companyId, isValidate: false });
    } catch (error) {
      console.error("Error rejecting company:", error);
    } finally {
      setIsRejectConfirmOpen(false);
      setCompanyToReject(null);
    }
  };

  return (
    <div className="relative overflow-x-hidden rounded-2xl border border-neutral-800 bg-neutral-900/80 backdrop-blur-sm shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]">
      {/* Header */}
      <div className="flex flex-col gap-3 p-5 md:p-6 border-b border-neutral-800">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-semibold text-white">Entreprises en attente</h2>
          <span className="text-xs px-2 py-1 rounded-lg bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/30">
            {companies.length} à traiter
          </span>
        </div>

        {/* Barre de recherche */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par nom, ville, SIRET, métier, email…"
            className="w-full h-11 pl-10 pr-3 rounded-xl bg-neutral-900 text-white placeholder:text-neutral-500
                       border border-neutral-800 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition"
          />
        </div>
      </div>

      {/* Liste */}
      <div className="p-5 md:p-6 space-y-4">
        {pageSlice.length === 0 ? (
          <div className="grid place-items-center h-40 rounded-xl border border-neutral-800 text-neutral-400">
            Aucune entreprise à afficher.
          </div>
        ) : (
          pageSlice.map((company) => (
            <div
              key={company.id}
              className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 md:p-5 hover:border-neutral-700 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-medium text-base md:text-lg">{company.name}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-neutral-800 ring-1 ring-neutral-700 text-neutral-300">
                      en attente
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {/* Téléphone / Mail */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-neutral-300 text-xs">
                        <FaPhone className="text-neutral-500" /> {company.phone || "—"}
                      </div>
                      <div className="flex items-center gap-2 text-neutral-300 text-xs">
                        <FaEnvelope className="text-neutral-500" /> {company.mail || "—"}
                      </div>
                    </div>

                    {/* Adresse */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-neutral-300 text-xs">
                        <FaMapMarkerAlt className="text-neutral-500" /> {company.adress || "—"}
                      </div>
                      <div className="flex items-center gap-2 text-neutral-300 text-xs">
                        <FaCity className="text-neutral-500" />
                        {company.city || "—"}
                        {company.zip_code ? `, ${company.zip_code}` : ""}
                      </div>
                    </div>

                    {/* SIRET / Métier */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-neutral-300 text-xs">
                        <FaBuilding className="text-neutral-500" /> {company.siret_number || "—"}
                      </div>
                      <div className="flex items-center gap-2 text-neutral-300 text-xs">
                        <FaBriefcase className="text-neutral-500" /> {company.job?.name || "—"}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex sm:justify-end items-center gap-2 mt-2 sm:mt-0">
                      <button
                        onClick={() => {
                          setCompanyToValidate(company);
                          setIsValidateConfirmOpen(true);
                        }}
                        className="h-9 px-3 rounded-xl text-sm bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/30 hover:bg-emerald-500/20 transition inline-flex items-center gap-2"
                        title="Valider l'entreprise"
                      >
                        <FaCheckCircle /> <span className="hidden md:inline">Valider</span>
                      </button>
                      <button
                        onClick={() => {
                          setCompanyToReject(company);
                          setIsRejectConfirmOpen(true);
                        }}
                        className="h-9 px-3 rounded-xl text-sm bg-red-500/10 text-red-300 ring-1 ring-red-500/30 hover:bg-red-500/20 transition inline-flex items-center gap-2"
                        title="Refuser l'entreprise"
                      >
                        <FaTimesCircle /> <span className="hidden md:inline">Refuser</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="px-5 md:px-6 pb-5 md:pb-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs text-neutral-400">
          {filtered.length} résultat(s) — page {pageIndex + 1} / {pageCount}
        </span>

        <div className="flex items-center gap-2">
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="h-9 rounded-xl bg-neutral-900 text-neutral-200 ring-1 ring-neutral-700 px-2 text-xs"
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}/page
              </option>
            ))}
          </select>

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

      {/* Modal validation */}
      {isValidateConfirmOpen && (
        <Modal isOpen={isValidateConfirmOpen} onClose={() => setIsValidateConfirmOpen(false)}>
          <div className="bg-neutral-900 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold text-center">Valider l’entreprise</h3>
            <p className="text-neutral-300 text-sm text-center mt-2">
              Confirmer la validation de <span className="font-medium">{companyToValidate?.name}</span> ?
            </p>
            <div className="mt-5 flex justify-center gap-2">
              <button
                onClick={() => validateCompany(companyToValidate.id)}
                className="h-10 px-4 rounded-xl bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/30 hover:bg-emerald-500/20 transition"
              >
                Valider
              </button>
              <button
                onClick={() => setIsValidateConfirmOpen(false)}
                className="h-10 px-4 rounded-xl bg-neutral-800 text-neutral-200 ring-1 ring-neutral-700 hover:bg-neutral-700 transition"
              >
                Annuler
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal rejet */}
      {isRejectConfirmOpen && (
        <Modal isOpen={isRejectConfirmOpen} onClose={() => setIsRejectConfirmOpen(false)}>
          <div className="bg-neutral-900 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-semibold text-center">Rejeter l’entreprise</h3>
            <p className="text-neutral-300 text-sm text-center mt-2">
              Confirmer le rejet de <span className="font-medium">{companyToReject?.name}</span> ?
            </p>
            <div className="mt-5 flex justify-center gap-2">
              <button
                onClick={() => rejectCompany(companyToReject.id)}
                className="h-10 px-4 rounded-xl bg-red-500/10 text-red-300 ring-1 ring-red-500/30 hover:bg-red-500/20 transition"
              >
                Rejeter
              </button>
              <button
                onClick={() => setIsRejectConfirmOpen(false)}
                className="h-10 px-4 rounded-xl bg-neutral-800 text-neutral-200 ring-1 ring-neutral-700 hover:bg-neutral-700 transition"
              >
                Annuler
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default NonValidatedCompanies;
