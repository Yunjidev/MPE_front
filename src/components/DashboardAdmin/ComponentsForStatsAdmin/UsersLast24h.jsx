import { useEffect, useState } from "react";
import { getData } from "../../../services/data-fetch";
import { filterUsersLast24h } from "./filterLast24h";

const UsersLast24h = () => {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getData("admin/users");
        const filteredData = filterUsersLast24h(data);
        // console.log("data", data);
        setUsersData(filteredData);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="bg-neutral-800 text-white p-6 rounded-lg shadow-md w-full overflow-x-auto mb-12">
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-[#67FFCC] text-transparent bg-clip-text">
        Utilisateurs inscrits ces dernières 24h
      </h2>
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Username
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Firstname
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Lastname
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Is Entrepreneur
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Avatar
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Enterprises
            </th>
          </tr>
        </thead>
        <tbody className="bg-neutral-800 divide-y divide-gray-700">
          {usersData.map((user, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {user.username}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {user.firstname}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {user.lastname}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {user.isentrepreneur ? "Yes" : "No"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
              {user.enterprises.map((enterprise, idx) => (
                  <div key={idx}>{enterprise.name}</div>
              ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersLast24h;