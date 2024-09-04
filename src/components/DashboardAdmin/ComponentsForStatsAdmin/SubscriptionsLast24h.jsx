import React from "react";

export default function SubscriptionsLast24h() {
    const subscriptionsData = [
        {
          enterpriseName: "Enterprise1",
          user: "johndoe",
          subscriptionType: "Premium",
          job: "Manager"
        },
        // Ajoutez plus de données fictives si nécessaire
      ];
  return (
    <div className="bg-neutral-800 text-white p-6 rounded-lg shadow-md w-full overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-[#67FFCC] dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] text-transparent bg-clip-text">
        Abonnements des dernières 24h
      </h2>
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Nom Entreprise
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Type Abonnement
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Job
            </th>
          </tr>
        </thead>
        <tbody className="bg-neutral-800 divide-y divide-gray-700">
          {subscriptionsData.map((subscription, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {subscription.enterpriseName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {subscription.user}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {subscription.subscriptionType}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {subscription.job}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}