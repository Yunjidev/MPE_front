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

  const handleEditClick = () => setIsEditFormOpen(true);
  const handleCloseEditForm = () => setIsEditFormOpen(false);

  const handleSave = (updatedCompany) => {
    setEnterprise(updatedCompany);
    handleCloseEditForm();
  };

  const handleViewClick = () => {
    if (enterprise) navigate(`/enterprise/${enterprise.id}`);
  };

  const handleOffersListClick = () => setIsOffersListOpen(true);
  const handleCloseOffersList = () => setIsOffersListOpen(false);

  return (
    <div className="bg-neutral-900 text-white p-4 sm:p-6 rounded-lg mt-8 sm:mt-6 sm:mb-8 border border-neutral-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-row items-center gap-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-emerald-300">Tableau de Bord</h2>
          <h3 className="text-lg sm:text-xl font-medium text-neutral-200">
            {enterprise ? enterprise.name : "Chargement..."}
          </h3>
        </div>
      </div>

      {/* Actions + réservations du jour */}
      <ReservationSummary
        enterprise={enterprise}
        onEdit={handleEditClick}
        onView={handleViewClick}
        onOffersList={handleOffersListClick}
      />

      {/* Statistiques agrégées depuis le back */}
      <div className="mt-6">
        <StatsSummary enterprise={enterprise} />
      </div>

      {/* Modals */}
      {isEditFormOpen && (
        <EditEnterpriseModal
          enterpriseId={id}
          onSave={handleSave}
          onClose={handleCloseEditForm}
        />
      )}
      {isOffersListOpen && <OffersListModal onClose={handleCloseOffersList} />}
    </div>
  );
}
