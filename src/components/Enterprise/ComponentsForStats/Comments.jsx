import { MdOutlineComment } from "react-icons/md";



export default function Comments() {
  return (
    <div className="bg-black text-white shadow-md rounded-lg p-6 flex items-center space-x-4 w-64">
      <MdOutlineComment className="text-5xl" />
      <div>
        <h2 className="text-2xl font-bold">Commentaires</h2>
        <p className="text-xl">12</p>
      </div>
    </div>
  );
}