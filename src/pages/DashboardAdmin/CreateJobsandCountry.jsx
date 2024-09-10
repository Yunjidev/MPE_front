import CreateJobForm from "../../components/DashboardAdmin/CreateJobForm";
import CreateRegionForm from "@/components/DashboardAdmin/CreateRegionForm";

const CreateJobsandCountry = () => {
  return (
    <div className="flex flex-col h-full space-around bg-neutral-900 p-6 mt-6 rounded-lg">
      
      <CreateJobForm />
      <CreateRegionForm />
    </div>
  );
};

export default CreateJobsandCountry;
