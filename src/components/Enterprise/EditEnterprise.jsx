import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getData, putData } from "../../services/data-fetch";
import EnterpriseForm from "./EnterpriseForm";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { userAtom } from "../../store/user";

export default function EditEnterprise() {
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();
  const { enterpriseId } = useParams();
  const [enterprise, setEnterprise] = useState(null);
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
        const updatedEnterprise = user.enterprises.map((enterprise) => {
          if (response.enterprise.id === enterprise.id) {
            return { ...enterprise, ...response.enterprise };
          }
          return enterprise;
        });
        setUser((prevUser) => ({
          ...prevUser,
          enterprises: updatedEnterprise,
        }));
        navigate(`/enterprise/${enterpriseId}`);
        toast.success("Entreprise enregistrée");
      } catch (error) {
        const errorData = await JSON.parse(error.message);
        console.log(errorData);
        errorData.forEach((error) => {
          const [, message] = Object.entries(error)[0];
          toast.error(`${message}`);
        });
      }
    },
    [enterpriseId, navigate, user, setUser],
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
