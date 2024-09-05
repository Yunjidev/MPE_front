import { useState, useEffect } from "react";
import { getData } from "../../../services/data-fetch";


export function useAdminStatsData() {
  const [data, setData] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsResponse = await getData("stats");
        const notValidatedEnterprisesResponse = await getData("admin/enterprises/not-validate");
        const subscriptionsResponse = await getData("admin/subscriptions");

        setData({
          ...statsResponse,
          notValidatedEnterprises: notValidatedEnterprisesResponse.length,
          subscriptions: subscriptionsResponse.length,
        });
      } catch (error) {
        console.error('Error fetching stats data:', error);
      }
    };
    fetchData();
  }, []);

  return data;
}