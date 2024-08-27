import React, { useState, useEffect } from "react";
import { getData } from "../../services/data-fetch";
import TotalUsersCard from "../../components/DashboardAdmin/TotalUsersCard.jsx";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [pendingEnterprises, setPendingEnterprises] = useState(0);
  const [validatedEnterprises, setValidatedEnterprises] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getData("admin/users");
        setUsers(usersData);
        setTotalUsers(usersData.length); // Nombre total d'utilisateurs

        // Fetch pending enterprises
        const pendingEnterprisesData = await getData(
          "admin/enterprises/not-validate"
        );
        setPendingEnterprises(pendingEnterprisesData.length);

        // Fetch validated enterprises
        const validatedEnterprisesData = await getData("enterprises/validate");
        setValidatedEnterprises(validatedEnterprisesData.length);
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
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100">
          Pending Companies
        </h2>
        <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-50">
          {pendingEnterprises}
        </p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-md dark:bg-neutral-800">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100">
          Validated Companies
        </h2>
        <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-50">
          {validatedEnterprises}
        </p>
      </div>
      {/* Ajoutez d'autres cartes pour les abonnements, visites, etc. */}
    </div>
  );
};

export default AdminDashboard;
