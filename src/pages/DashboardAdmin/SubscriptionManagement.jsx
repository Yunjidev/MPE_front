import EnterprisePremium from "../../components/DashboardAdmin/SubscriptionManagement/EnterprisePremium";
import SubscriptionView from "../../components/DashboardAdmin/SubscriptionManagement/SubscriptionView";

const SubscriptionManagement = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Entreprises Premium</h2>
      </div>
      <EnterprisePremium />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Gestions des abonnements</h2>
      </div>
      <SubscriptionView />
    </div>
  );
};

export default SubscriptionManagement;