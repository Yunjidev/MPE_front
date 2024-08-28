import React, { useEffect, useState } from "react";
import { getData } from "../../services/data-fetch";


export default function StatsEnterprises() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("stats");
      setStats(data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4 lg:p-8 mx-4 lg:mx-8">
      <h1 className="text-4xl font-bold mb-8">Statistiques</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold">Utilisateurs</h2>
          <p className="text-xl">{stats.userLength}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold">Entrepreneurs</h2>
          <p className="text-xl">{stats.entrepreneurLength}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold">Entreprises</h2>
          <p className="text-xl">{stats.enterpriseLength}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold">Réservations</h2>
          <p className="text-xl">{stats.reservationLength}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold">Entreprises Premium</h2>
          <p className="text-xl">{stats.premiumEnterpriseLength}</p>
        </div>
      </div>
    </div>
  );
}