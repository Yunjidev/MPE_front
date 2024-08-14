import React from "react";
import UpdateCompany from "../../components/DashboardUser/UpdateCompanyForm";

const UpdateCompany = () => {
  const handleFormSubmit = async (formData) => {
    console.log(formData);
  };

  return (
    <div>
      <UpdateCompany onSubmit={handleFormSubmit} />
    </div>
  );
};

export default UpdateCompany;
