import { useParams } from "react-router-dom";
import { postData } from "../../services/data-fetch";
import { toast } from "react-toastify";
import InDisponibilityForm from "./Form/InDisponibilityForm";

export default function CreateIndisponibility() {
  const { id } = useParams();

  const handleSubmit = async (data) => {
    event.preventDefault();
    try {
      await postData(`enterprise/${id}/indisponibility`, data);
      toast.success("Indisponibilité créée");
    } catch (error) {
      const errorData = await JSON.parse(error.message);
      toast.error(errorData.errors);
    }
  };

  return (
    <div>
      <InDisponibilityForm onSubmit={handleSubmit} />
    </div>
  );
}
