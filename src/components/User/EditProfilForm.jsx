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
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex flex-col h-full space-around rounded-lg">
      <UserForm onSubmit={handleSubmit} mode="Edit" initialData={user} />
    </div>
  );
}
