import EnterprisePremium from "../../components/DashboardAdmin/SubscriptionManagement/EnterprisePremium";
import SubscriptionView from "../../components/DashboardAdmin/SubscriptionManagement/SubscriptionView";

const SubscriptionManagement = () => {
  return (
    <div className="flex flex-col">
      <div className="bg-neutral-900 text-white p-4 sm:p-6 rounded-lg max-w-full sm:max-w-8xl mt-8 sm:mt-12 mb-4 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-[#67FFCC]">Entreprises Premium</h2>
        <hr className="w-full sm:w-11/12 mb-8 sm:mb-12" />
        <div className="flex flex-col sm:flex-wrap">
          <div className="w-full">
            <EnterprisePremium />
          </div>
        </div>
      </div>
      <div className="bg-neutral-900 text-white p-4 sm:p-6 rounded-lg max-w-full sm:max-w-8xl mt-8 sm:mt-12 mb-4 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-[#67FFCC]">Gestions des abonnements</h2>
        <hr className="w-full sm:w-11/12 mb-8 sm:mb-12" />
        <div className="flex flex-col sm:flex-wrap">
          <div className="w-full">
            <SubscriptionView />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionManagement;

