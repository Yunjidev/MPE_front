import React, { useState, useEffect } from "react";
import { FaBriefcase } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { postData, putData, deleteData, getData } from "../../services/data-fetch";
import { toast } from "react-toastify";
import Input from "../../components/Utils/Inputs/Input";

const CreateJobForm = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({ photo: null });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getData("jobs");
        setJobs(response);
      } catch (error) {
        console.error("Erreur lors de la récupération des métiers:", error);
      }
    };

    fetchJobs();
  }, []);

  const handlePhotoChange = (file) => {
    setFormData((prevData) => ({
      ...prevData,
      photo: file,
    }));
  };

  const handleDeletePhoto = () => {
    setFormData((prevData) => ({
      ...prevData,
      photo: null,
    }));
  };

  const onSubmitJob = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.jobTitle);
      if (formData.photo) {
        formData.append("picture", formData.photo);
      }

      const jobResponse = await postData("admin/job", formData);

      if (jobResponse) {
        toast.success("Métier créé avec succès !");
        reset();
        setJobs([...jobs, jobResponse]);
      } else {
        toast.error("Erreur lors de la création du métier.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors de la création du métier.");
    }
  };

  const onUpdateJob = async (data) => {
    try {
      console.log(`Updating job: ${selectedJob.id} with data:`, data); // Ajout de console.log
      const updatedFormData = new FormData();
      updatedFormData.append("name", data.jobTitle);
      if (formData.photo) {
        updatedFormData.append("picture", formData.photo);
      } else if (selectedJob.picture) {
        updatedFormData.append("picture", selectedJob.picture);
      }

      console.log('FormData:', updatedFormData.get("name"), updatedFormData.get("picture")); // Ajout de console.log

      const jobResponse = await putData(`admin/job/${selectedJob.id}`, updatedFormData);

      if (jobResponse) {
        toast.success("Métier modifié avec succès !");
        reset();
        setJobs(jobs.map(job => job.id === selectedJob.id ? jobResponse : job));
        setSelectedJob(null);
      } else {
        toast.error("Erreur lors de la modification du métier.");
      }
    } catch (error) {
      console.error("Erreur lors de la modification du métier:", error);
      toast.error("Erreur lors de la modification du métier.");
    }
  };


  const onDeleteJob = async () => {
    try {
      console.log(`Deleting job: ${selectedJob.id}`); // Ajout de console.log
      const jobResponse = await deleteData(`admin/job/${selectedJob.id}`);
      console.log('Delete response:', jobResponse); // Ajout de console.log

      if (jobResponse && jobResponse.message === "job supprimée") {
        toast.success("Métier supprimé avec succès !");
        reset();
        setJobs(jobs.filter(job => job.id !== selectedJob.id));
        setSelectedJob(null);
      } else {
        toast.error("Erreur lors de la suppression du métier.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors de la suppression du métier.");
    }
  };

  const handleJobSelect = (event) => {
    const selectedJobTitle = event.target.value;
    const selectedJob = jobs.find(job => job.name === selectedJobTitle);
    if (selectedJob) {
      setSelectedJob(selectedJob);
      setValue("jobTitle", selectedJob.name);
      console.log("Job selected:", selectedJob); // Ajout de console.log
    } else {
      setSelectedJob(null);
      reset();
      console.log("No job selected"); // Ajout de console.log
    }
  };

  return (
    <div className="flex flex-col h-full space-around bg-neutral-800 p-6 rounded-lg">
      <h2 className="dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] bg-gradient-to-r from-black to-[#67FFCC] font-bold text-transparent bg-clip-text text-center text-2xl mb-5">
        Gestion des Métiers
      </h2>
      <hr className="w-1/2 my-4 border-t-2 border-gray-400 mx-auto" />
      <div className="flex flex-col lg:space-y-5 lg:grid lg:grid-cols-2 gap-3">
        <div className="flex flex-col lg:col-span-2 gap-6">
          <label htmlFor="jobSelect" className="text-white">Sélectionner un métier</label>
          <select
            id="jobSelect"
            onChange={handleJobSelect}
            className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-[#67FFCC] focus:border-[#67FFCC]"
          >
            <option value="">Nouveau Métier</option>
            {jobs.map(job => (
              <option key={job.id} value={job.name}>{job.name}</option>
            ))}
          </select>
        </div>
      </div>
      <form onSubmit={handleSubmit(selectedJob ? onUpdateJob : onSubmitJob)} className="flex flex-col lg:space-y-5 lg:grid lg:grid-cols-2 gap-3 mt-6">
        <div className="flex flex-col lg:col-span-2 gap-6">
          <div className="relative flex items-center">
            <FaBriefcase className="absolute left-3 text-gray-400" />
            <input
              id="jobTitle"
              type="text"
              {...register("jobTitle", { required: true })}
              placeholder="Titre du métier"
              className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-[#67FFCC] focus:border-[#67FFCC]"
            />
          </div>
          <Input.SingleUpload
            placeholder="Sélectionnez une image"
            onFileUpload={handlePhotoChange}
            onFileDelete={handleDeletePhoto}
            url={formData.photo}
            isEditMode={isEditMode}
          />
        </div>
        <div className="col-span-2 flex justify-center mt-6">
          <button
            className="flex w-full dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] bg-gradient-to-r from-black to-[#67FFCC] text-transparent bg-clip-text items-center justify-center border border-gray-500 font-bold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 hover:border-[#67FFCC] transition duration-300 ease-in-out"
            type="submit"
          >
            {selectedJob ? "Modifier Métier" : "Créer Métier"}
          </button>
        </div>
      </form>
      {selectedJob && (
        <div className="col-span-2 flex justify-center mt-6">
          <button
            className="flex w-full bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
            onClick={onDeleteJob}
          >
            Supprimer Métier
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateJobForm;
