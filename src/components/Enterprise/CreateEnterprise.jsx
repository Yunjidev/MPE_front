import { useNavigate } from "react-router-dom";
import { postData } from "../../services/data-fetch";
import EnterpriseForm from "./Form/EnterpriseForm";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";

export default function CreateEnterprise() {
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const response = await postData("enterprise", formData);
      const updateAtom = {
        ...user,
        enterprises: [...user.enterprises, response.enterprise],
      };
      setUser(updateAtom);
      navigate(`/dashboard/user-db`);
      toast.success("Entreprise créée");
    } catch (error) {
      const errorData = await JSON.parse(error.message);
      console.log(errorData);
      errorData.forEach((error) => {
        const [, message] = Object.entries(error)[0];
        toast.error(`${message}`);
      });
    }
  };

  return (
    <div>
      <EnterpriseForm title="Création d'entreprise" onSubmit={handleSubmit} />
    </div>
  );
}
