/* eslint-disable react/prop-types */
import { FaUsers, FaBriefcase, FaBuilding, FaCalendarCheck, FaStar, FaEye, FaDollarSign, FaTimesCircle } from "react-icons/fa";
import { useAdminStatsData } from "./useAdminStatsData";
import EnterprisesLast24h from "./EnterprisesLast24h";
import UsersLast24h from "./UsersLast24h";
import SubscriptionsLast24h from "./SubscriptionsLast24h";
import GraphForView from "../../Enterprise/ComponentsForStats/GraphForView";

export default function AdminStats() {
  const data = useAdminStatsData();

  if (!data) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
          <StatCard
            icon={<FaUsers className="text-5xl" />}
            title="Utilisateurs"
            value={data.userLength}
            gradientFrom="from-blue-400"
            gradientTo="to-blue-800"
          />
          <StatCard
            icon={<FaBriefcase className="text-5xl" />}
            title="Entrepreneurs"
            value={data.entrepreneurLength}
            gradientFrom="from-green-400"
            gradientTo="to-green-800"
          />
          <StatCard
            icon={<FaBuilding className="text-5xl" />}
            title="Entreprises"
            value={data.enterpriseLength}
            gradientFrom="from-purple-400"
            gradientTo="to-purple-800"
          />
          <StatCard
            icon={<FaCalendarCheck className="text-5xl" />}
            title="Réservations"
            value={data.reservationLength}
            gradientFrom="from-orange-400"
            gradientTo="to-orange-800"
          />
          <StatCard
            icon={<FaStar className="text-5xl" />}
            title="Entreprises Premium"
            value={data.premiumEnterpriseLength}
            gradientFrom="from-red-400"
            gradientTo="to-red-800"
          />
          <StatCard
            icon={<FaEye className="text-5xl" />}
            title="Visites du site"
            value="N/A" // Valeur fictive pour le moment
            gradientFrom="from-yellow-400"
            gradientTo="to-yellow-800"
          />
          <StatCard
            icon={<FaDollarSign className="text-5xl" />}
            title="Revenus"
            value="N/A" // Valeur fictive pour le moment
            gradientFrom="from-green-400"
            gradientTo="to-green-800"
          />
          <StatCard
            icon={<FaTimesCircle className="text-5xl" />}
            title="Entreprises non validées"
            value={data.notValidatedEnterprises}
            gradientFrom="from-red-400"
            gradientTo="to-red-800"
          />
          <StatCard
            icon={<FaUsers className="text-5xl" />}
            title="Abonnements"
            value={data.subscriptions}
            gradientFrom="from-blue-400"
            gradientTo="to-blue-800"
          />
        </div>
        <div className="m-4 p-4 border rounded-lg shadow-lg">
          <GraphForView />
        </div>
        <EnterprisesLast24h />
        <UsersLast24h />
        <SubscriptionsLast24h />
      </div>

    </div>
  );
}

function StatCard({ icon, title, value, gradientFrom, gradientTo }) {
  return (
    <div className={`bg-opacity-30 bg-neutral-700 text-black text-white shadow-md rounded-lg p-6 flex items-center space-x-4 w-full h-32`}>
      {icon}
      <div>
        <h2 className={`text-xl font-bold bg-gradient-to-r ${gradientFrom} ${gradientTo} text-transparent bg-clip-text`}>
          {title}
        </h2>
        <p className={`text-xl bg-gradient-to-r ${gradientFrom} ${gradientTo} text-transparent bg-clip-text`}>
          {value}
        </p>
      </div>
    </div>
  );
}