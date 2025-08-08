import { Navigate, Outlet } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../store/user";
import { toast } from "react-toastify";

const AuthenticatedRoute = () => {
  const [user] = useAtom(userAtom);

  console.log("AuthenticatedRoute: user =", user);

  if (user && user.isLogged) {
    return <Outlet />;
  } else {
    toast.error("Vous devez être connecté pour accéder à cette page.");
    return <Navigate to="/" />;
  }
};

export default AuthenticatedRoute;
