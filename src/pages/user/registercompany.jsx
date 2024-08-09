import React from "react";
import CompanyForm from "../../components/DashboardUser/companyform";
import { postData } from "../../services/data-fetch";

const handleFormSubmit = async (formData) => {
  try {
    const token = "Authorization";

    // Appelez la fonction postData avec l'endpoint, les données et les en-têtes personnalisés
    const response = await postData("enterprise", formData, {
      Authorization: `Bearer ${token}`,
    });

    console.log(response);
  } catch (error) {
    console.error("There was an error submitting the form!", error);
  }
};

const RegisterCompany = () => (
  <div>
    <CompanyForm onSubmit={handleFormSubmit} />
  </div>
);

export default RegisterCompany;
