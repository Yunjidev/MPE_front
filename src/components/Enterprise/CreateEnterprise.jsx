import { useNavigate } from "react-router-dom";
import { postData } from "../../services/data-fetch";
import EnterpriseForm from "./Form/EnterpriseForm";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { enterprisesAtom } from "../../store/enterprises";

export default function CreateEnterprise() {
  const navigate = useNavigate();
  const [, setEnterprise] = useAtom(enterprisesAtom);

  const handleSubmit = async (formData) => {
    try {
      const response = await postData("enterprise", formData);
      setEnterprise((prev) => [...prev, response.enterprise]);

      navigate(`/dashboard/user-db`);
      toast.success("Entreprise créée");
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
    <div>
      <EnterpriseForm title="Création d'entreprise" onSubmit={handleSubmit} />
    </div>
  );
}
