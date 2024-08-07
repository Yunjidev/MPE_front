/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";
import { toast } from 'react-toastify';

export default function SignOut() {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);

  const handleSignOut = async () => {
    try {
      // Appel à l'API pour la déconnexion
      await fetch('/api/signout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Utilisez la clé correcte
        }
      });

      // Effacer le token du stockage local et session
      window.localStorage.removeItem('token');
      window.sessionStorage.removeItem('token');

      // Effacer les cookies si nécessaire
      document.cookie.split(";").forEach((c) => {
        if (c.trim().startsWith('mpe-auth=')) {
          document.cookie = c.trim() + ';expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
        }
      });

      // Réinitialisation de l'état utilisateur
      setUser({ id: "", email: "", isLogged: false });

      // Notification de succès
      toast.info("Vous êtes maintenant déconnecté !");

      // Redirection après la déconnexion
      navigate("/signin");
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
      toast.error(`Erreur lors de la déconnexion : ${error.message}`);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="text-black dark:text-white dark:hover:text-neutral-300 hover:text-neutral-600 mt-2"
    >
      Se déconnecter
    </button>
  );
}
