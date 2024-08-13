import NonValidatedCompanies from "../../components/DashboardAdmin/NonValidatedCompanies";

const AcceptCompanyPage = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold text-center mb-6">
        Entreprises Non Validées
      </h1>
      <NonValidatedCompanies />
    </div>
  );
};

export default AcceptCompanyPage;
