import checkTokenExpiration from "./checkToken";
import { toast } from 'react-toastify';
import Cookies from "js-cookie";

const checkTokenAndLocalStorage = (user, setUser, navigate) =>{
  const tokenStatus = checkTokenExpiration();
  if(tokenStatus.isValid){
    return true
  } else {
    if (tokenStatus.reason === "notFound") {
      // Check if user data is in local storage and seems valid
      if (user.id) {
        // as token does not exist, we reset only local storage
        setUser({ id: "", email: "", isLogged: false });
        toast.info("Votre connexion a expiré, veuillez vous reconnecter");
        navigate("/");
        return false
      }
    } else {
      // For expired or invalid token
      // reset local storage and cookies
      setUser({ id: "", email: "", isLogged: false });
      Cookies.remove("mpe-auth");
      toast.info("Votre connexion a expiré, veuillez vous reconnecter");
      navigate("/signin");
      return false
    }
  }
}

export default checkTokenAndLocalStorage