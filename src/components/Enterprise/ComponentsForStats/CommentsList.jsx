import { FaStar } from "react-icons/fa";
import { useEnterpriseData } from "./useEnterpriseData";

export default function CommentsList() {
  const data = useEnterpriseData();

  if (!data) {
    return <div>Chargement...</div>;
  }

  const commentsData = data.offers.flatMap(offer =>
    offer.ratings.map(rating => ({
      username: rating.user.username,
      comment: rating.comment,
      rating: parseFloat(rating.note),
      offerName: offer.name
    }))
  );

  return (
    <div className="bg-neutral-800 text-white p-6 rounded-lg shadow-md w-full overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-[#67FFCC] text-transparent bg-clip-text">
        Mes Commentaires et Notes
      </h2>
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Offre
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Clients
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider max-w-xs">
              Commentaires
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Note
            </th>
          </tr>
        </thead>
        <tbody className="bg-neutral-800 divide-y divide-gray-700">
          {commentsData.map((comment, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {comment.offerName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                {comment.username}
              </td>
              <td className="px-6 py-4 text-sm text-white break-words max-w-xs">
                {comment.comment}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white flex items-center">
                <FaStar className="text-yellow-400 mr-2" />
                {comment.rating}/5
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}