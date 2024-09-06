import { putData } from "../../services/data-fetch";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";
import UserForm from "./UserForm";

export default function EditProfilForm() {
  const [user, setUser] = useAtom(userAtom);

  const handleSubmit = async (data) => {
    try {
      const response = await putData("user/update", data);
      setUser((prevUser) => ({
        ...prevUser,
        ...response.user,
        isLogged: true,
      }));
      toast.success("Profil mis à jour avec succès !");
    } catch (error) {
      const errorData = await JSON.parse(error.message);
      if (Array.isArray(errorData.errors)) {
        errorData.errors.forEach((error) => {
          const [, message] = Object.entries(error)[0];
          toast.error(`${message}`);
        });
      } else {
        toast.error(errorData.errors);
      }
    }
  };

  return (
    <div className="flex flex-col h-full space-around rounded-lg">
      <UserForm onSubmit={handleSubmit} mode="Edition" initialData={user} />
    </div>
  );
}
