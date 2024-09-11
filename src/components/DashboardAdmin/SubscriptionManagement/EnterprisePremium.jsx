import { useState, useEffect } from "react";
import { getData } from "../../../services/data-fetch";
import { FaEye } from "react-icons/fa";
import Button from "../../Button/button";
import { useNavigate } from "react-router-dom";

const PremiumCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [pageSize, setPageSize] = useState(1);
  const [pageIndex, setPageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getData("enterprises/premium");
        // console.log(data);
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  // Pagination
  const pageCount = Math.ceil(companies.length / pageSize);
  const paginatedCompanies = companies.slice(
    pageIndex * pageSize,
    (pageIndex + 1) * pageSize
  );
  const viewCompany = (id) => {
    navigate(`/enterprise/${id}`);
  };
  const handlePageSizeChange = (event) => {
    const newSize = Number(event.target.value);
    setPageSize(newSize);
    setPageIndex(0); // Reset to page 0
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-neutral-800 border border-neutral-700">
      <div className="flex flex-col">
        {paginatedCompanies.map((company) => (
          <div
            key={company.id}
            className="mb-4 p-4 rounded-lg shadow-md bg-neutral-800 flex items-start"
          >
            <div className="flex-grow">
              <div className="grid grid-cols-2 gap-4">
                <div className="font-bold text-white">
                  Nom:
                </div>
                <div className="text-white">
                  {company.name || "N/A"}
                </div>
                <div className="font-bold text-white">
                  Ville:
                </div>
                <div className="text-white">
                  {company.city || "N/A"}
                </div>
                <div className="font-bold text-white">
                  CP:
                </div>
                <div className="text-white">
                  {company.zip_code || "N/A"}
                </div>
                <div className="font-bold text-white">
                  Région:
                </div>
                <div className="text-white">
                  {company.country?.name || "N/A"}
                </div>
                <div className="font-bold text-white">
                  Métier:
                </div>
                <div className="text-white">
                  {company.job?.name || "N/A"}
                </div>
                <div className="font-bold text-white">
                  Pseudo:
                </div>
                <div className="text-white">
                  {company.entrepreneur?.username || "N/A"}
                </div>
                <div className="font-bold text-white">
                  Note moyenne:
                </div>
                <div className="text-white">
                  {company.averageRating}
                </div>
              </div>
            </div>
            <div className="ml-4 flex flex-col justify-between">
              <Button
                onClick={() => viewCompany(company.id)}
                className="text-blue-500 hover:underline mb-2"
              >
                <FaEye />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => setPageIndex(pageIndex - 1)}
          disabled={pageIndex === 0}
          className="px-4 py-2 mx-1 bg-neutral-700 text-white rounded-lg mr-4 transform hover:scale-105 border hover:border-[#67FFCC] transition duration-300 ease-in-out"
        >
          « Précédent
        </button>
        <span className="text-white text-black font-bold">
          Page {pageIndex + 1} sur {pageCount}
        </span>
        <button
          onClick={() => setPageIndex(pageIndex + 1)}
          disabled={pageIndex >= pageCount - 1}
          className="px-4 py-2 mx-1 bg-neutral-700 text-white rounded-lg mr-4 transform hover:scale-105 border hover:border-[#67FFCC] transition duration-300 ease-in-out"
        >
          Suivant »
        </button>
      </div>
    </div>
  );
};

export default PremiumCompanies;
