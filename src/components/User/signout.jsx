import { authSignOut } from "../../services/auth-fetch";
import { useNavigate } from "react-router-dom";
import { useResetAtom } from "jotai/utils";
import { userAtom } from "../../store/user";
import { toast } from "react-toastify";

export default function SignOut() {
  const navigate = useNavigate();
  const resetUser = useResetAtom(userAtom);

  const handleSignOut = async () => {
    try {
      await authSignOut("signout");
      resetUser();
      toast.info("Vous êtes maintenant déconnecté !");
      navigate("/signin");
    } catch (error) {
      resetUser();
      navigate("/signin");
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="text-white hover:text-neutral-300 mt-2"
    >
      Se déconnecter
    </button>
  );
}
