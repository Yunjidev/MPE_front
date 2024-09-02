import React from "react";
import CreateJobAndRegionForm from "@/components/DashboardAdmin/CreateCountry&JobsForm";

const CreateJobsandCountry = () => {
  return (
    <div className="flex flex-col h-full space-around bg-neutral-800 p-6 rounded-lg">
      <h2 className="dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] bg-gradient-to-r from-black to-[#67FFCC] font-bold text-transparent bg-clip-text text-center text-2xl mb-5">
        Création de Nouveau Métier et Région</h2>
      <hr className="w-1/2 my-4 border-t-2 border-gray-400 mx-auto" />
      <CreateJobAndRegionForm />
    </div>
  );
};

export default CreateJobsandCountry;
