import { useState, useEffect } from "react";
import { getData } from "../../../services/data-fetch";


export function useAdminStatsData() {
  const [data, setData] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await getData("stats");
        console.log('Données récupérées:', response); // Vérifier les données récupérées

        setData(response);
      } catch (error) {
        console.error('Error fetching stats data:', error);
      }
    };
    fetchData();
  }, []);

  return data;
}