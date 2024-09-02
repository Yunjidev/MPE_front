import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaEye, FaRegListAlt, FaTimes } from "react-icons/fa";
import { getData } from "../../services/data-fetch";
import Likes from "../../components/Enterprise/ComponentsForStats/Likes";
import LenghtSearch from "../../components/Enterprise/ComponentsForStats/LenghtSearch";
import LenghtView from "../../components/Enterprise/ComponentsForStats/LenghtView";
import LengthReservation from "../../components/Enterprise/ComponentsForStats/LengthReservation";
import AverageRating from "../../components/Enterprise/ComponentsForStats/AverageRating";
import Comments from "../../components/Enterprise/ComponentsForStats/Comments";
import GraphForView from "../../components/Enterprise/ComponentsForStats/GraphForView";
import CommentsList from "../../components/Enterprise/ComponentsForStats/CommentsList";
import EditEnterprise from "../../components/Enterprise/EditEnterprise";
import OffersList from "../../components/DashboardEnterprise/OffersList";

export default function StatsEnterprises() {
  const { id } = useParams();
  const [enterprise, setEnterprise] = useState(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isOffersListOpen, setIsOffersListOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnterprise = async () => {
      try {
        const data = await getData(`enterprise/${id}`);
        setEnterprise(data);
      } catch (error) {
        console.error("Error fetching enterprise:", error);
      }
    };

    fetchEnterprise();
  }, [id]);

  const handleEditClick = () => {
    setIsEditFormOpen(true);
  };

  const handleCloseEditForm = () => {
    setIsEditFormOpen(false);
  };

  const handleSave = (updatedCompany) => {
    setEnterprise(updatedCompany);
    handleCloseEditForm();
  };

  const handleViewClick = () => {
    if (enterprise) {
      navigate(`/enterprise/${enterprise.id}`);
    }
  };

  const handleOffersListClick = () => {
    setIsOffersListOpen(true);
  };

  const handleCloseOffersList = () => {
    setIsOffersListOpen(false);
  };

  const companyName = enterprise ? enterprise.name : "Chargement...";

  return (
    <div className="dark:bg-neutral-900 bg-white text-white p-4 sm:p-6 rounded-lg max-w-full sm:max-w-8xl mt-8 sm:mt-6 mb-4 sm:mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#67FFCC]">Tableau de Bord</h2>
          <h3 className="text-lg sm:text-xl font-medium text-[#67FFCC]">{companyName}</h3>
        </div>
        <div className="flex space-x-4">
          <FaEdit 
            className="text-[#67FFCC] cursor-pointer text-2xl" 
            title="Modifier mon entreprise" 
            onClick={handleEditClick} 
          />
          <FaRegListAlt 
            className="text-[#67FFCC] cursor-pointer text-2xl" 
            title="Services de l'entreprise" 
            onClick={handleOffersListClick} 
          />
          <FaEye 
            className="text-[#67FFCC] cursor-pointer text-2xl" 
            title="Voir ma page entreprise" 
            onClick={handleViewClick} 
          />
        </div>
      </div>
      <hr className="w-full sm:w-11/12 mb-8 sm:mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Likes />
        <LenghtSearch />
        <LenghtView />
        <LengthReservation />
        <AverageRating />
        <Comments />
      </div>
      <div className="w-full mt-8">
        <GraphForView />
      </div>
      <div className="w-full mt-8">
        <CommentsList />
      </div>

      {/* Affichage du pop-up d'édition */}
      {isEditFormOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseEditForm}
        >
          <div
            className="p-2 rounded-lg shadow-lg relative max-w-4xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <FaTimes
              className="absolute top-6 right-6 z-50 text-[#67FFCC] cursor-pointer text-2xl"
              title="Fermer"
              onClick={handleCloseEditForm}
            />
            <EditEnterprise
              enterpriseId={id}
              onSave={handleSave}
              onClose={handleCloseEditForm}
            />
          </div>
        </div>
      )}

      {/* Affichage du pop-up des offres */}
      {isOffersListOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseOffersList}
        >
          <div
            className="bg-neutral-800 p-6 rounded-lg shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <FaTimes
              className="absolute top-3 right-3 text-[#67FFCC] cursor-pointer text-2xl z-50"
              title="Fermer"
              onClick={handleCloseOffersList}
            />
            <OffersList />
          </div>
        </div>
      )}
    </div>
  );
}
