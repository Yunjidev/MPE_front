import CompanyForm from "../../components/DashboardUser/companyform";

const RegisterCompany = () => {
  const handleFormSubmit = async (formData) => {
    console.log(formData);
  };

  return (
    <div>
      <CompanyForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default RegisterCompany;
