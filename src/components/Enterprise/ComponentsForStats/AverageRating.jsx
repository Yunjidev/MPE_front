import { FaStar } from "react-icons/fa";
import { useEnterpriseData } from "./useEnterpriseData";

export default function AverageRating() {
  const data = useEnterpriseData();

  if (!data) {
    return <div>Chargement...</div>;
  }

  const averageRating = data.averageRating;

  return (
    <div className="bg-neutral-700 text-white shadow-md rounded-lg p-6 flex items-center space-x-4 w-56 h-32">
      <FaStar className="text-5xl" />
      <div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-white to-orange-400 text-transparent bg-clip-text">
          Note Globale
        </h2>
        <p className="text-xl bg-gradient-to-r from-white to-orange-400 text-transparent bg-clip-text">
          {averageRating}/5
        </p>
      </div>
    </div>
  );
}