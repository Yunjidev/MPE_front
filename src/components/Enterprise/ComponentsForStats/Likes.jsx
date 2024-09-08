import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { getData } from "../../../services/data-fetch";
import { useAtom } from "jotai";
import { userAtom } from "../../../store/user";

export default function Likes() {
  const [likes, setLikes] = useState([]);
  const [user] = useAtom(userAtom);
  const userId = user.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await getData("likes");
        console.log('Données récupérées:', response); // Vérifier les données récupérées

        // Filtrer pour trouver l'entreprise correspondant à l'utilisateur connecté
        const userLikes = response.filter(like => like.entreprise_id === userId);
        setLikes(userLikes);
      } catch (error) {
        console.error('Error fetching entreprises:', error);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <div className="bg-neutral-700 text-white shadow-md rounded-lg p-6 flex items-center space-x-4 w-56 h-32">
      <FaHeart className="text-5xl" />
      <div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-violet-200 to-violet-400 text-transparent bg-clip-text">
          Favoris</h2>
        <p className="text-xl bg-gradient-to-r from-violet-200 to-violet-400 text-transparent bg-clip-text">
          {likes.length}
          </p>
      </div>
    </div>
  );
}
