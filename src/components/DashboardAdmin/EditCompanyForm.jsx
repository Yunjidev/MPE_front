/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { putData, getData } from "../../services/data-fetch";
import { FaBuilding, FaMapMarkerAlt, FaIndustry } from "react-icons/fa";

const EditCompanyForm = ({ company, onClose, onSave }) => {
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      name: "",
      city: "",
      zip_code: "",
      country: "",
      job: "",
    },
  });

  const [jobOptions, setJobOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);

  useEffect(() => {
    const fetchJobsAndCountries = async () => {
      try {
        const jobs = await getData("jobs");
        setJobOptions(jobs);

        const countries = await getData("countries");
        setCountryOptions(countries);
      } catch (error) {
        console.error("Failed to fetch jobs or countries:", error);
      }
    };

    fetchJobsAndCountries();
  }, []);

  useEffect(() => {
    if (company) {
      console.log("Company data:", company);

      reset({
        name: company.name || "",
        city: company.city || "",
        zip_code: company.zip_code || "",
        country: company.country.name || "",
        job: company.job.name || "",
      });

      setValue("name", company.name || "");
      setValue("city", company.city || "");
      setValue("zip_code", company.zip_code || "");
      setValue("country", company.country.name || "");
      setValue("job", company.job.name || "");
    }
  }, [company, reset, setValue]);

  const onSubmit = async (data) => {
    console.log("Form data submitted:", data);

    const companyUpdate = {};
    if (data.name !== company.name) companyUpdate.name = data.name;
    if (data.city !== company.city) companyUpdate.city = data.city;
    if (data.zip_code !== company.zip_code) companyUpdate.zip_code = data.zip_code;
    if (data.country !== company.country.name) companyUpdate.country = { name: data.country };
    if (data.job !== company.job.name) companyUpdate.job = { name: data.job };

    const response = await putData(`enterprise/${company.id}`, companyUpdate);
    console.log("Response from PUT:", response);
    
    onSave();  // Call the onSave callback to update the company list or UI.
    alert("Entreprise modifiée avec succès");
    onClose();  // Close the modal after successful submission.
  };

  return (
    <div className="flex flex-col h-full space-around bg-neutral-800 p-6 rounded-lg">
      <h2 className="text-white text-center text-2xl mb-5">
        Editer Entreprise
      </h2>
      <hr className="w-1/2 my-4 border-t-2 border-gray-400 mx-auto" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col lg:space-y-5 lg:grid lg:grid-cols-2 gap-3"
      >
        <div className="flex flex-col lg:col-span-2 gap-6">
          <div className="relative flex items-center">
            <FaBuilding className="absolute left-3 text-gray-400" />
            <input
              id="name"
              type="text"
              {...register("name", { required: true })}
              placeholder="Nom de l'entreprise"
              className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-green-400 focus:border-green-300"
            />
          </div>
          <div className="relative flex items-center">
            <FaMapMarkerAlt className="absolute left-3 text-gray-400" />
            <input
              id="city"
              type="text"
              {...register("city", { required: true })}
              placeholder="Ville"
              className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-green-400 focus:border-green-300"
            />
          </div>
          <div className="relative flex items-center">
            <FaMapMarkerAlt className="absolute left-3 text-gray-400" />
            <input
              id="zip_code"
              type="text"
              {...register("zip_code", { required: true })}
              placeholder="Code postal"
              className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-green-400 focus:border-green-300"
            />
          </div>
          <div className="relative flex items-center">
            <FaMapMarkerAlt className="absolute left-3 text-gray-400" />
            <select
              id="country"
              {...register("country", { required: true })}
              className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-green-400 focus:border-green-300"
            >
              <option value="">Sélectionnez un pays</option>
              {countryOptions.map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="relative flex items-center">
            <FaIndustry className="absolute left-3 text-gray-400" />
            <select
              id="job"
              {...register("job", { required: true })}
              className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-green-400 focus:border-green-300"
            >
              <option value="">Sélectionnez un secteur</option>
              {jobOptions.map((job) => (
                <option key={job.id} value={job.name}>
                  {job.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-span-2 flex justify-center mt-6">
          <button
            className="flex w-full dark:bg-gradient-to-r dark:from-green-200 dark:to-green-400 bg-gradient-to-r from-green-400 to-green-800 text-transparent bg-clip-text items-center justify-center border border-gray-500 font-bold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 hover:border-green-200 transition duration-300 ease-in-out"
            type="submit"
          >
            Sauvegarder
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCompanyForm;
