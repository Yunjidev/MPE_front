import React from "react";
import CompanyForm from "../../components/DashboardUser/companyform";
import ky from "ky";

const handleFormSubmit = async (formData) => {
  try {
    const token = "your-auth-token";

    const response = await ky
      .post("http://localhost:8080/api/enterprise", {
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json();
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
