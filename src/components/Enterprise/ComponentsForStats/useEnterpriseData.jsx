import { useState, useEffect } from "react";
import { getData } from "../../../services/data-fetch";
import { useAtom } from "jotai";
import { userAtom } from "../../../store/user";
import { enterprisesAtom } from "../../../store/enterprises";

export function useEnterpriseData() {
  const [data, setData] = useState(null);
  const [user] = useAtom(userAtom);
  const [enterprises] = useAtom(enterprisesAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const enterpriseId = enterprises.length > 0 ? enterprises[0].id : undefined;
        console.log('Enterprise ID:', enterpriseId);

        if (!enterpriseId) {
          throw new Error('Enterprise ID is undefined');
        }

        let response = await getData(`enterprise/${enterpriseId}`);
        console.log('Données récupérées:', response); // Vérifier les données récupérées

        setData(response);
      } catch (error) {
        console.error('Error fetching enterprise data:', error);
      }
    };
    fetchData();
  }, [user.id, enterprises]);

  return data;
}