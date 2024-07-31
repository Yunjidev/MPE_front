import { authSignInUp } from "../../services/auth-fetch";
import UserForm from "./form";

export default function SignUp() {
  const handleSubmit = async ({ username, email, password }) => {
    await authSignInUp("signup", { username, email, password });
  };

  return <UserForm onSubmit={handleSubmit} mode={"Inscription"} />;
}
