
import { FaEye } from "react-icons/fa";

export default function LenghtView() {
  return (
    <div className="bg-neutral-700 text-white shadow-md rounded-lg p-6 flex items-center space-x-4 w-56 h-32">
      <FaEye className="text-5xl" />
      <div>
      <h2 className="text-xl font-bold bg-gradient-to-r from-violet-200 to-violet-400 text-transparent bg-clip-text">
            Vues Page</h2>
            <p className="text-xl bg-gradient-to-r from-violet-200 to-violet-400 text-transparent bg-clip-text">
            32</p>
      </div>
    </div>
  );
}