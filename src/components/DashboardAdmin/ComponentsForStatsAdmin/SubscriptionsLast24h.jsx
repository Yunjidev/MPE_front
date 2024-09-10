import { useEffect, useState } from "react";
import { getData } from "../../../services/data-fetch";
import { filterSubscriptionsLast24h } from "./filterLast24h";

const SubscriptionsLast24h = () => {
  const [subscriptionsData, setSubscriptionsData] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const data = await getData("admin/subscriptions");
        // console.log("data", data);
        const filteredData = filterSubscriptionsLast24h(data);
        setSubscriptionsData(filteredData);
      } catch (error) {
        console.error("Erreur lors de la récupération des abonnements:", error);
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    <div className="bg-neutral-800 text-white p-6 rounded-lg shadow-md w-full overflow-x-auto mb-12">
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-[#67FFCC] text-transparent bg-clip-text">
        Abonnements des dernières 24h
      </h2>
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Nom Entreprise
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Type Abonnement
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Date de début
            </th>
          </tr>
        </thead>
        <tbody className="bg-neutral-800 divide-y divide-gray-700">
          {subscriptionsData.map((subscription, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {subscription.enterprise.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {subscription.status}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {subscription.subscription_type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {new Date(subscription.start_date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubscriptionsLast24h;