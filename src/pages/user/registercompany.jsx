import React from "react";
import CompanyForm from "../../components/DashboardUser/companyform";
import { postData } from "../../services/data-fetch";

const handleFormSubmit = async (formData) => {
  const response = await postData("enterprise", formData, {});

  console.log(response);
};

const RegisterCompany = () => (
  <div>
    <CompanyForm onSubmit={handleFormSubmit} />
  </div>
);

export default RegisterCompany;
