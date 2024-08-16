import UpdateCompanyForm from "../../components/DashboardUser/UpdateCompanyForm";

const UpdateCompany = () => {
  const handleFormSubmit = async (formData) => {
    console.log(formData);
  };

  return (
    <div>
      <UpdateCompanyForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default UpdateCompany;
