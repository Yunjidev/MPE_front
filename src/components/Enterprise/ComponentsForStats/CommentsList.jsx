import { FaStar } from "react-icons/fa";

const commentsData = [
  { username: "User1", comment: "Très bon service!", rating: 4.5 },
  { username: "User2", comment: "Satisfait de la qualité.", rating: 4.0 },
  { username: "User3", comment: "Peut mieux faire.", rating: 3.0 },
];

export default function CommentsList() {
  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-[#67FFCC] dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] text-transparent bg-clip-text">
        Mes Commentaires et Notes
      </h2>
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Username
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Commentaires
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Note
            </th>
          </tr>
        </thead>
        <tbody className="bg-black divide-y divide-gray-700">
          {commentsData.map((comment, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                {comment.username}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {comment.comment}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white flex items-center">
                <FaStar className="text-yellow-400 mr-2" />
                {comment.rating}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}