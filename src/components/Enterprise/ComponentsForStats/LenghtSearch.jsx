import { FaSearch } from "react-icons/fa";



export default function LenghtSearch() {
  return (
    <div className="bg-black text-white shadow-md rounded-lg p-6 flex items-center space-x-4 w-64">
      <FaSearch className="text-5xl" />
      <div>
        <h2 className="text-2xl font-bold">Apparition Recherche</h2>
        <p className="text-xl">6</p>
      </div>
    </div>
  );
}