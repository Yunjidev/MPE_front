
import { FaEye } from "react-icons/fa";

export default function LenghtView() {
  return (
    <div className="bg-orange-100 bg-opacity-30 dark:bg-black text-black dark:text-white shadow-md rounded-lg p-6 flex items-center space-x-4 w-64">
      <FaEye className="text-5xl" />
      <div>
      <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-violet-800 dark:bg-gradient-to-r dark:from-violet-200 dark:to-violet-400 text-transparent bg-clip-text">
            Vues Page</h2>
            <p className="text-xl bg-gradient-to-r from-violet-400 to-violet-800 dark:bg-gradient-to-r dark:from-violet-200 dark:to-violet-400 text-transparent bg-clip-text">
            32</p>
      </div>
    </div>
  );
}