import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getData, deleteData } from "../../../services/data-fetch";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import Button from "../../Button/button";
import Modal from "../Modal";
import EditCompanyForm from "../../DashboardEnterprise/EditCompanyForm";
import { toast } from "react-toastify";

const PremiumCompanies = () => {
    const [companies, setCompanies] = useState([]);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(0);
  
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchCompanies = async () => {
        try {
          const data = await getData("enterprises/premium");
          console.log(data);
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
        const name = company.enterprise.name ? company.enterprise.name.toLowerCase() : "";
        const city = company.enterprise.city ? company.enterprise.city.toLowerCase() : "";
        const zipCode = company.enterprise.zip_code ? company.enterprise.zip_code.toLowerCase() : "";
        const country = company.enterprise.country.name
          ? company.enterprise.country.name.toLowerCase()
          : "";
        const activity = company.enterprise.job.name ? company.enterprise.job.name.toLowerCase() : "";
        const siretNumber = company.enterprise.siret_number
          ? company.enterprise.siret_number.toLowerCase()
          : "";
        const username = company.enterprise.entrepreneur.username
          ? company.enterprise.entrepreneur.username.toLowerCase()
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
  
    const deleteCompany = async (companyId) => {
      try {
        await deleteData(`enterprise/${companyId}`);
        setCompanies((prevCompanies) =>
          prevCompanies.filter((company) => company.id !== companyId)
        );
        setFilteredCompanies((prevCompanies) =>
          prevCompanies.filter((company) => company.id !== companyId)
        );
        toast.success("Entreprise supprimée avec succès");
      } catch (error) {
        console.error("Error deleting company:", error);
      }
    };
  
    const editCompany = (company) => {
      setSelectedCompany(company);
      setIsModalOpen(true);
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
  
    // Pagination
    const pageCount = Math.ceil(filteredCompanies.length / pageSize);
  
    const handlePageSizeChange = (event) => {
      const newSize = Number(event.target.value);
      setPageSize(newSize);
      setPageIndex(0); // Reset to page 0
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
        </div>
  
        {/* Affichage en cartes horizontales tout le temps avec colonnes */}
        <div className="flex flex-col">
          {filteredCompanies
            .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
            .map((company) => (
              <div
                key={company.id}
                className="mb-4 p-4 rounded-lg shadow-md bg-white dark:bg-neutral-800 flex items-start"
              >
                <div className="flex-grow">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="font-bold text-gray-900 dark:text-white">
                      Nom:
                    </div>
                    <div className="text-gray-900 dark:text-white">
                      {company.enterprise.name}
                    </div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      Ville:
                    </div>
                    <div className="text-gray-900 dark:text-white">
                      {company.enterprise.city}
                    </div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      CP:
                    </div>
                    <div className="text-gray-900 dark:text-white">
                      {company.enterprise.zip_code}
                    </div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      Région:
                    </div>
                    <div className="text-gray-900 dark:text-white">
                      {company.enterprise.country}
                    </div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      Métier:
                    </div>
                    <div className="text-gray-900 dark:text-white">
                      {company.enterprise.job}
                    </div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      Pseudo:
                    </div>
                    <div className="text-gray-900 dark:text-white">
                      {company.enterprise.entrepreneur.username}
                    </div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      Note moyenne:
                    </div>
                    <div className="text-gray-900 dark:text-white">
                      {company.averageRating}
                    </div>
                  </div>
                </div>
                <div className="ml-4 flex flex-col justify-between">
                  <Button
                    onClick={() => viewCompany(company.enterprise.id)}
                    className="text-blue-600 dark:text-blue-500 hover:underline mb-2"
                >
                  <FaEye />
                </Button>
                <Button
                  onClick={() => editCompany(company)}
                  className="text-green-600 dark:text-green-500 hover:underline mb-2"
                >
                  <FaEdit />
                </Button>
                <Button
                  onClick={() => deleteCompany(company.id)}
                  className="text-red-600 dark:text-red-500 hover:underline"
                >
                  <FaTrash />
                </Button>
              </div>
            </div>
          ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => setPageIndex(0)}
          disabled={pageIndex === 0}
          className="px-4 py-2 mx-1 bg-gray-200 rounded-lg mr-4 dark:bg-neutral-700 dark:text-white transform hover:scale-105 border hover:border-[#67FFCC] transition duration-300 ease-in-out"
        >
          « Précédent
        </button>
        <span className="dark:text-white text-black font-bold">
          Page {pageIndex + 1} sur {pageCount}
        </span>
        <button
          onClick={() => setPageIndex(pageIndex + 1)}
          disabled={pageIndex >= pageCount - 1}
          className="px-4 py-2 mx-1 bg-gray-200 rounded-lg ml-4 dark:bg-neutral-700 dark:text-white transform hover:scale-105 border hover:border-[#67FFCC] transition duration-300 ease-in-out"
        >
          Suivant »
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedCompany && (
          <EditCompanyForm
            company={selectedCompany}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
          />
        )}
      </Modal>
    </div>
  );
};

export default PremiumCompanies;
