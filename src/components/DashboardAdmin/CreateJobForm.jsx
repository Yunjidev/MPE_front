import React, { useState } from "react";
import { FaBriefcase } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { postData } from "../../services/data-fetch";
import { toast } from "react-toastify";
import Input from "../../components/Utils/Inputs/Input";


const CreateJobForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [formData, setFormData] = useState({ photo: null });
  const [isEditMode, setIsEditMode] = useState(false);

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
      } else {
        toast.error("Erreur lors de la création du métier.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors de la création du métier.");
    }
  };

  return (
    <div className="flex flex-col h-full space-around bg-neutral-800 p-6 rounded-lg">
      <h2 className="dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] bg-gradient-to-r from-black to-[#67FFCC] font-bold text-transparent bg-clip-text text-center text-2xl mb-5">
        Création de Nouveau Métier
      </h2>
      <hr className="w-1/2 my-4 border-t-2 border-gray-400 mx-auto" />
      <form onSubmit={handleSubmit(onSubmitJob)} className="flex flex-col lg:space-y-5 lg:grid lg:grid-cols-2 gap-3">
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
            Créer Métier
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJobForm;