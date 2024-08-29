import React, { useEffect, useState } from "react";
import { getData } from "../../services/data-fetch";
import Likes from "../../components/Enterprise/ComponentsForStats/Likes";



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
      < Likes />
        
    </div>
    </div>
    
  );
}