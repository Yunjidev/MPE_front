import { FaHeart } from "react-icons/fa";

export default function Likes() {
  return (
    <div className="bg-black text-white shadow-md rounded-lg p-6 flex items-center space-x-4 w-64">
      <FaHeart className="text-5xl" />
      <div>
        <h2 className="text-2xl font-bold">Favoris</h2>
        <p className="text-xl">12</p>
      </div>
    </div>
  );
}
