import { FaCalendarCheck } from "react-icons/fa";



export default function LenghtSearch() {
  return (
    <div className="bg-black text-white shadow-md rounded-lg p-6 flex items-center space-x-4 w-64">
      <FaCalendarCheck className="text-5xl" />
      <div>
        <h2 className="text-2xl font-bold">Rendez-vous</h2>
        <p className="text-xl">8</p>
      </div>
    </div>
  );
}