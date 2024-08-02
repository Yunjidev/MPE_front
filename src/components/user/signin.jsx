import { authSignInUp } from "../../services/auth-fetch";
import UserForm from "./form";

export default function SignIn() {
  const handleSubmit = async ({ identifier, password }) => {
    await authSignInUp("signin", { identifier, password });
  };

  return <UserForm onSubmit={handleSubmit} mode={"Connexion"} />;
}