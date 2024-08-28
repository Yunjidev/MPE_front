import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../services/data-fetch";
import Calendar from "../../components/DashboardEnterprise/Calendar";
import CreateAvailability from "../../components/Enterprise/DisponibilityCreation";
import CreateIndisponibility from "../../components/Enterprise/IndisponibilityCreate";

export default function Planning() {
  const { id } = useParams();
  const [enterprise, setEnterprise] = useState(null);

  useEffect(() => {
    const fetchEnterprise = async () => {
      try {
        const enterprise = await getData(`enterprise/${id}`);
        setEnterprise(enterprise);
      } catch (error) {
        console.error("Error fetching enterprise data:", error);
      }
    };

    fetchEnterprise();
  }, [id]);

  return (
    <div>
      <Calendar
        events={enterprise?.offers?.reservations || []}
        indisponibilities={enterprise?.indisponibilities || []}
        disponibilities={enterprise?.disponibilities || []}
      />
      <CreateAvailability />
      <CreateIndisponibility />
    </div>
  );
}
