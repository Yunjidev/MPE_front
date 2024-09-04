import React from "react";

export default function EnterprisesLast24h() {
    const enterprisesData = [
        {
          name: "Enterprise1",
          city: "Paris",
          website: "https://enterprise1.com",
          logo: "https://via.placeholder.com/40",
          entrepreneur: { username: "johndoe" },
          job: "CEO",
          country: "France"
        },
        // Ajoutez plus de données fictives si nécessaire
      ];
      
  return (
    <div className="bg-neutral-800 text-white p-6 rounded-lg shadow-md w-full overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-[#67FFCC] dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] text-transparent bg-clip-text">
        Entreprises créées ces dernières 24h
      </h2>
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              City
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Website
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Logo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Entrepreneur Username
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Job
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Country
            </th>
          </tr>
        </thead>
        <tbody className="bg-neutral-800 divide-y divide-gray-700">
          {enterprisesData.map((enterprise, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {enterprise.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {enterprise.city}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {enterprise.website}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                <img src={enterprise.logo} alt="logo" className="w-10 h-10 rounded-full" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {enterprise.entrepreneur.username}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {enterprise.job}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {enterprise.country}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}