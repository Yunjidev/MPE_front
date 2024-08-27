import React, { useState, useEffect } from "react";
import { getData } from "../../services/data-fetch";
import TotalUsersCard from "../../components/DashboardAdmin/TotalUsersCard.jsx"; // Assurez-vous d'utiliser le bon chemin

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [pendingCompanies, setPendingCompanies] = useState(0);
  const [validatedCompanies, setValidatedCompanies] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getData("admin/users");
        setUsers(usersData);
        setTotalUsers(usersData.length); // Nombre total d'utilisateurs

 
        const companiesData = await getData("admin/enterprises");
        const pending = ent.filter(company => !company.isValidated).length;
        const validated = companiesData.filter(company => company.isValidated).length;
        setPendingCompanies(pending);
        setValidatedCompanies(validated);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <TotalUsersCard totalUsers={totalUsers} />
      <div className="p-4 bg-white rounded-lg shadow-md dark:bg-neutral-800">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100">Pending Companies</h2>
        <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-50">{pendingCompanies}</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-md dark:bg-neutral-800">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100">Validated Companies</h2>
        <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-50">{validatedCompanies}</p>
      </div>
      {/* Ajoutez d'autres cartes pour les abonnements, visites, etc. */}
    </div>
  );
};

export default AdminDashboard;
