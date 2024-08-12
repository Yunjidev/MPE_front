/* eslint-disable react/prop-types */
import { Navigate, useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../store/user'; // Assurez-vous que le chemin est correct

const PrivateRoute = ({ children }) => {
  const [user] = useAtom(userAtom);
  const { id } = useParams();

  // Vérifiez si l'utilisateur est connecté et si l'ID correspond
  if (!user || !user.isLoggedIn || user.id.toString() !== id) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default PrivateRoute;
