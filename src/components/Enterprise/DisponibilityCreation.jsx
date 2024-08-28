import { useParams } from "react-router-dom";
import { postData } from "../../services/data-fetch";
import { toast } from "react-toastify";
import DisponibilityForm from "./Form/DisponibilityForm";

export default function CreateAvailability() {
  const { id } = useParams();

  const handleSubmit = async (data) => {
    event.preventDefault();
    try {
      await postData(`enterprise/${id}/disponibility`, data);
      toast.success("Disponibilité créée");
    } catch (error) {
      const errorData = await JSON.parse(error.message);
      toast.error(errorData.errors);
    }
  };

  return (
    <div>
      <DisponibilityForm onSubmit={handleSubmit} />
    </div>
  );
}
