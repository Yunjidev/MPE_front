import React from "react";

const TotalUsersCard = ({ totalUsers }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md dark:bg-neutral-800">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100">Total Users</h2>
      <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-gray-50">{totalUsers}</p>
    </div>
  );
};

export default TotalUsersCard;
