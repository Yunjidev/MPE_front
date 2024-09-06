import EnterprisePremium from "../../components/DashboardAdmin/SubscriptionManagement/EnterprisePremium";

const SubscriptionManagement = () => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Gestion des abonnements</h2>
      </div>
      <EnterprisePremium />
    </div>
  );
};

export default SubscriptionManagement;