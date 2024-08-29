import { FaEye } from "react-icons/fa";

export default function LenghtView() {
  return (
    <div className="bg-black text-white shadow-md rounded-lg p-6 flex items-center space-x-4 w-64">
      <FaEye className="text-5xl" />
      <div>
        <h2 className="text-2xl font-bold">Vues Page</h2>
        <p className="text-xl">32</p>
      </div>
    </div>
  );
}