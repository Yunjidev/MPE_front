/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export default function SignOut() {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);

  const handleSignOut = async () => {
    window.localStorage.removeItem("token");
    window.sessionStorage.removeItem("token");
    // Réinitialisation de l'état utilisateur
    setUser({ id: "", email: "", isLogged: false });

    // Notification de succès
    toast.info("Vous êtes maintenant déconnecté !");
    // Redirection après la déconnexion
    navigate("/signin");
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
