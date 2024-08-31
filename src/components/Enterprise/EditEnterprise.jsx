/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getData, putData } from "../../services/data-fetch";
import EnterpriseForm from "./Form/EnterpriseForm";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { enterprisesAtom } from "../../store/enterprises";

export default function EditEnterprise({ enterpriseId, onSave, onClose }) {
  const navigate = useNavigate();
  const [enterprise, setEnterprise] = useState(null);
  const [enterprises, setEnterprises] = useAtom(enterprisesAtom);

  useEffect(() => {
    const fetchEnterprise = async () => {
      try {
        const data = await getData(`enterprise/${enterpriseId}`);
        setEnterprise(data);
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
            : enterprise
        );
        setEnterprises(updatedEnterprises);

        if (onSave) onSave(response.enterprise);
        toast.success("Entreprise enregistrée");
        if (onClose) onClose();
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
    [enterpriseId, enterprises, setEnterprises, onSave, onClose]
  );

  return (
    <>
      <EnterpriseForm
        title="Mise à jour d'entreprise"
        onSubmit={handleSubmit}
        initialData={enterprise}
        isEditMode={true}
      />
    </>
  );
}
