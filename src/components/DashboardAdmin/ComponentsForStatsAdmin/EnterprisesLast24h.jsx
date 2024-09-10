import { useEffect, useState } from "react";
import { getData } from "../../../services/data-fetch";
import { filterEnterprisesLast24h } from "./filterLast24h";

export default function EnterprisesLast24h() {
    const [enterprisesData, setEnterprisesData] = useState([]);

    useEffect(() => {
      const fetchEnterprises = async () => {
        try {
          const data = await getData("admin/enterprises");
          const filteredData = filterEnterprisesLast24h(data);
          // console.log("data", data);
          setEnterprisesData(filteredData);
        } catch (error) {
          console.error("Erreur lors de la récupération des entreprises:", error);
        }
      };
  
      fetchEnterprises();
    }, []);
      
    return (
      <div className="bg-neutral-800 text-white p-6 rounded-lg shadow-md w-full overflow-x-auto mb-12">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-[#67FFCC] bg-gradient-to-r from-white to-[#67FFCC] text-transparent bg-clip-text">
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
                  {enterprise.job ? enterprise.job.name : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {enterprise.country ? enterprise.country.name : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }