import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getData } from "../../services/data-fetch";
import EditEnterpriseModal from "@/components/Enterprise/ComponentsForEnterprise/EditEnterpriseModal";
import OffersListModal from "@/components/Enterprise/ComponentsForEnterprise/OffersListModal";
import ReservationSummary from "@/components/Enterprise/ComponentsForEnterprise/ReservationSummary";
import StatsSummary from "@/components/Enterprise/ComponentsForStats/StatsSummary";

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

  // Ouvre le modal de modification
  const handleEditClick = () => {
    setIsEditFormOpen(true);
  };

  // Ferme le modal de modification
  const handleCloseEditForm = () => {
    setIsEditFormOpen(false);
  };

  // Sauvegarde les changements et ferme le modal
  const handleSave = (updatedCompany) => {
    setEnterprise(updatedCompany);
    handleCloseEditForm();
  };

  // Redirige vers la page de l'entreprise
  const handleViewClick = () => {
    if (enterprise) {
      navigate(`/enterprise/${enterprise.id}`);
    }
  };

  // Ouvre le modal de la liste des offres
  const handleOffersListClick = () => {
    setIsOffersListOpen(true);
  };

  // Ferme le modal de la liste des offres
  const handleCloseOffersList = () => {
    setIsOffersListOpen(false);
  };

  return (
    <div className="bg-neutral-900 text-white p-4 sm:p-6 rounded-lg max-w-full sm:max-w-8xl mt-8 sm:mt-6  sm:mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-row items-center">
          <h2 className="text-xl sm:text-2xl mr-20 font-semibold text-[#67FFCC]">Tableau de Bord</h2>
          <h3 className="text-lg sm:text-xl font-medium text-[#67FFCC]">
            {enterprise ? enterprise.name : "Chargement..."}
          </h3>
        </div>
      </div>
      <hr className="mb-4" />
      
      {/* Résumé des réservations avec actions */}
      <ReservationSummary
        enterprise={enterprise}
        onEdit={handleEditClick}
        onView={handleViewClick}
        onOffersList={handleOffersListClick}
      />

      {/* Résumé des statistiques */}
      <StatsSummary />

      {/* Modal de modification de l'entreprise */}
      {isEditFormOpen && (
        <EditEnterpriseModal
          enterpriseId={id}
          onSave={handleSave}
          onClose={handleCloseEditForm}
        />
      )}

      {/* Modal de la liste des offres */}
      {isOffersListOpen && (
        <OffersListModal onClose={handleCloseOffersList} />
      )}
    </div>
  );
}
