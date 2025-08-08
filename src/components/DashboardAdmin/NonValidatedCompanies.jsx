/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { getData, putData } from "../../services/data-fetch";
import { useSocketIo } from "../../services/UseSocketIo";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCity,
  FaBuilding,
  FaBriefcase,
} from "react-icons/fa";
import Modal from "./Modal";

const NonValidatedCompanies = () => {
  const socket = useSocketIo();
  const [companies, setCompanies] = useState([]);
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
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  const validateCompany = async (companyId) => {
    try {
      const formData = new FormData();
      formData.append("isValidate", "true");
      await putData(`enterprise/${companyId}`, formData);
      if (socket) {
        socket.emit("enterpriseValidated", { id: companyId, isValidate: true });
      }

      setCompanies((prevCompanies) =>
        prevCompanies.filter((company) => company.id !== companyId)
      );
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
      if (socket) {
        socket.emit("enterpriseRejected", { id: companyId, isValidate: false });
      }

      setCompanies((prevCompanies) =>
        prevCompanies.filter((company) => company.id !== companyId)
      );
    } catch (error) {
      console.error("Error rejecting company:", error);
    } finally {
      setIsRejectConfirmOpen(false);
      setCompanyToReject(null);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-neutral-600 bg-neutral-800 border border-neutral-700 p-4">
      <div className="p-4">
        <input
          type="text"
          placeholder="Rechercher..."
          className="w-full px-4 py-2 mb-4 rounded-lg 
          bg-neutral-800 text-white focus:outline-none focus:ring-[#67FFCC] focus:border-[#67FFCC]"
        />
      </div>

      {/* Affichage des entreprises sous forme de cartes */}
      <div className="flex flex-col gap-4">
        {companies
          .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
          .map((company) => (
            <div
              key={company.id}
              className="p-4 bg-neutral-800 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-bold text-white mb-4">
                {company.name}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
                {/* Téléphone et Mail */}
                <div className="flex-1 max-w-[120px]">
                  <div className="flex items-center text-gray-300 mb-1 text-xs">
                    <FaPhone className="mr-1 text-sm" /> {company.phone}
                  </div>
                  <div className="flex items-center text-gray-300 text-xs">
                    <FaEnvelope className="mr-1 text-sm" /> {company.mail}
                  </div>
                </div>

                {/* Adresse, Ville et Code Postal */}
                <div className="flex-1 max-w-[120px]">
                  <div className="flex items-center text-gray-300 mb-1 text-xs">
                    <FaMapMarkerAlt className="mr-1 text-sm" /> {company.adress}
                  </div>
                  <div className="flex items-center text-gray-300 mb-1 text-xs">
                    <FaCity className="mr-1 text-sm" /> {company.city},{" "}
                    {company.zip_code}
                  </div>
                </div>

                {/* Siret et Métier */}
                <div className="grid grid-cols-1">
                  <div className="flex items-center text-gray-300 mb-1 text-xs">
                    <FaBuilding className="mr-1 text-sm" />{" "}
                    {company.siret_number}
                  </div>
                  <div className="flex items-center text-gray-300 text-xs">
                    <FaBriefcase className="mr-1 text-sm" /> {company.job.name}
                  </div>
                </div>
                <div className="flex justify-center md:justify-end mt-4">
                  <button
                    onClick={() => {
                      setCompanyToValidate(company);
                      setIsValidateConfirmOpen(true);
                    }}
                    className="text-green-400 hover:scale-110 transition-transform mx-1 text-xs md:text-sm"
                    title="Valider l'entreprise"
                  >
                    <FaCheckCircle size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setCompanyToReject(company);
                      setIsRejectConfirmOpen(true);
                    }}
                    className="text-red-600 hover:scale-110 transition-transform mx-1 text-xs md:text-sm"
                    title="Refuser l'entreprise"
                  >
                    <FaTimesCircle size={16} />
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
          className="px-3 py-1 mx-1 bg-gray-200 rounded-lg mr-4 bg-neutral-700 text-white transform hover:scale-105 border hover:border-[#67FFCC] transition duration-300 ease-in-out text-xs"
        >
          « Précédent
        </button>
        <span className="text-white text-black font-bold text-xs">
          Page {pageIndex + 1} sur {Math.ceil(companies.length / pageSize)}
        </span>
        <button
          onClick={() =>
            setPageIndex(
              pageIndex < Math.ceil(companies.length / pageSize) - 1
                ? pageIndex + 1
                : pageIndex
            )
          }
          disabled={pageIndex >= Math.ceil(companies.length / pageSize) - 1}
          className="px-3 py-1 mx-1 bg-gray-200 rounded-lg ml-4 bg-neutral-700 text-white transform hover:scale-105 border hover:border-[#67FFCC] transition duration-300 ease-in-out text-xs"
        >
          Suivant »
        </button>
      </div>

      {/* Modal de confirmation pour validation */}
      {isValidateConfirmOpen && (
        <Modal isOpen={isValidateConfirmOpen} onClose={() => setIsValidateConfirmOpen(false)}>
          <div className="text-white bg-neutral-800 p-4 border border-white rounded-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">Confirmation</h2>
            <p className="text-center">Êtes-vous sûr de vouloir valider cette entreprise ?</p>
            <div className="flex justify-center space-x-2 mt-4">
              <button
                onClick={() => validateCompany(companyToValidate.id)}
                className="w-32 px-4 py-2 bg-green-500 text-black font-semibold text-center rounded-lg hover:bg-green-600 transition duration-300"
              >
                Valider
              </button>
              <button
                onClick={() => setIsValidateConfirmOpen(false)}
                className="w-32 px-4 py-2 bg-gray-500 text-black font-semibold text-center rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Annuler
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal de confirmation pour rejet */}
      {isRejectConfirmOpen && (
        <Modal isOpen={isRejectConfirmOpen} onClose={() => setIsRejectConfirmOpen(false)}>
          <div className="text-white bg-neutral-800 p-4 border border-white rounded-lg">
            <h2 className="text-lg font-semibold mb-4 text-center">Confirmation</h2>
            <p className="text-center">Êtes-vous sûr de vouloir rejeter cette entreprise ?</p>
            <div className="flex justify-center space-x-2 mt-4">
              <button
                onClick={() => rejectCompany(companyToReject.id)}
                className="w-32 px-4 py-2 bg-red-500 text-black font-semibold text-center rounded-lg hover:bg-red-600 transition duration-300"
              >
                Rejeter
              </button>
              <button
                onClick={() => setIsRejectConfirmOpen(false)}
                className="w-32 px-4 py-2 bg-gray-500 text-black font-semibold text-center rounded-lg hover:bg-gray-600 transition duration-300"
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
