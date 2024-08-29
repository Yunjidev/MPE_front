import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getData, putData } from "../../services/data-fetch";
import EnterpriseForm from "./Form/EnterpriseForm";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { enterprisesAtom } from "../../store/enterprises";

export default function EditEnterprise() {
  const navigate = useNavigate();
  const { enterpriseId } = useParams();
  const [enterprise, setEnterprise] = useState(null);
  const [enterprises, setEnterprises] = useAtom(enterprisesAtom);
  const memoizedEnterprise = useMemo(() => enterprise, [enterprise]);

  useEffect(() => {
    const fetchEnterprise = async () => {
      try {
        const enterprise = await getData(`enterprise/${enterpriseId}`);
        setEnterprise(enterprise);
      } catch (error) {
        console.error("Error fetching enterprise data:", error);
      }
    };

    fetchEnterprise();
  }, [enterpriseId]);

  const handleSubmit = useCallback(
    async (formData) => {
      try {
        const response = await putData(`enterprise/${enterpriseId}`, formData);
        const updatedEnterprises = enterprises.map((enterprise) =>
          enterprise.id === response.enterprise.id
            ? response.enterprise
            : enterprise,
        );
        setEnterprises(updatedEnterprises);

        navigate(`/enterprise/${enterpriseId}`);
        toast.success("Entreprise enregistrée");
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
    },
    [enterpriseId, navigate, enterprises, setEnterprises],
  );

  return (
    <>
      <EnterpriseForm
        title="Mise à jour d'entreprise"
        onSubmit={handleSubmit}
        initialData={memoizedEnterprise}
        isEditMode={true}
      />
    </>
  );
}
