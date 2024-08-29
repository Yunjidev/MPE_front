import { FaStar } from "react-icons/fa";


export default function AverageRating() {
  return (
    <div className="bg-black text-white shadow-md rounded-lg p-6 flex items-center space-x-4 w-64">
      <FaStar className="text-5xl" />
      <div>
        <h2 className="text-2xl font-bold">Note Globale</h2>
        <p className="text-xl">3.8</p>
      </div>
    </div>
  );
}