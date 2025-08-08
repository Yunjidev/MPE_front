import { FaSearch } from "react-icons/fa";



export default function LenghtSearch() {
  return (
    <div className="bg-neutral-700 text-white shadow-md rounded-lg p-6 flex items-center space-x-4 w-56 h-32">
      <FaSearch className="text-6xl" />
      <div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-white to-[#67FFCC] text-transparent bg-clip-text">
          Apparition Recherche</h2>
        <p className="text-xl bg-gradient-to-r from-white to-[#67FFCC] text-transparent bg-clip-text">
          6</p>
      </div>
    </div>
  );
}