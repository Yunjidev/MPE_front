import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { userAtom } from "../store/user";

const EntrepreneurRoute = () => {
  const [user] = useAtom(userAtom);

  if (user.isEntrepreneur) {
    return <Outlet />;
  } else {
    toast.error("Vous n'êtes pas autorisé à accéder à cette page.");
    return <Navigate to="/" />;
  }
};

export default EntrepreneurRoute;
