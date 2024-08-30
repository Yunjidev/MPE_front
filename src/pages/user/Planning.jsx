import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../services/data-fetch";
import CustomCalendar from "../../components/DashboardEnterprise/Calendar";
import CreateAvailability from "../../components/Enterprise/DisponibilityCreation";
import CreateIndisponibility from "../../components/Enterprise/IndisponibilityCreate";

export default function Planning() {
  const { id } = useParams();
  const [enterprise, setEnterprise] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnterprise = async () => {
      try {
        const enterprise = await getData(`enterprise/${id}`);
        setEnterprise(enterprise);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching enterprise data:", error);
        setLoading(false);
      }
    };

    fetchEnterprise();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-10">
      <CustomCalendar
        reservations={enterprise?.offers?.reservations || []}
        indisponibilities={enterprise?.indisponibilities || []}
        disponibilities={enterprise?.disponibilities || []}
      />
      <CreateAvailability />
      <CreateIndisponibility />
    </div>
  );
}
