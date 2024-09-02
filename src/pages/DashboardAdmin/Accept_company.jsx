import NonValidatedCompanies from "../../components/DashboardAdmin/NonValidatedCompanies";

const AcceptCompanyPage = () => {
  return (
    <div className="dark:bg-neutral-900 bg-white text-white p-4 sm:p-6 rounded-lg max-w-full sm:max-w-8xl mt-8 sm:mt-12 mb-4 sm:mb-8">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-[#67FFCC]">
        Validation Entreprises
      </h2>
      <hr className="w-full sm:w-11/12 mb-8 sm:mb-12" />
      <div className="flex flex-col sm:flex-wrap">
        <div className="w-full">
          <NonValidatedCompanies />
        </div>
      </div>
    </div>
  );
};

export default AcceptCompanyPage;
