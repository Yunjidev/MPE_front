import React, { useState } from "react";
import { FaBriefcase, FaMapMarkerAlt, FaImage } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { postData } from "../../services/data-fetch";
import Input from "../../components/Utils/Inputs/Input";

const CreateJobAndRegionForm = () => {
    const { register, handleSubmit, reset } = useForm();
    const [formData, setFormData] = useState({ photos: [] });
    const [isEditMode, setIsEditMode] = useState(false);
  
    const handlePhotosChange = (files) => {
      setFormData((prevData) => ({
        ...prevData,
        photos: [...prevData.photos, ...files],
      }));
    };
  
    const handleDeletePhoto = (index) => {
      setFormData((prevData) => ({
        ...prevData,
        photos: prevData.photos.filter((_, i) => i !== index),
      }));
    };
  
    const onSubmitJob = async (data) => {
      try {
        const formData = new FormData();
        formData.append("name", data.jobTitle);
        data.photos.forEach((photo) => {
          formData.append("picture", photo);
        });
  
        const jobResponse = await postData("admin/job", formData);
  
        if (jobResponse) {
          alert("Métier créé avec succès !");
          reset();
        } else {
          alert("Erreur lors de la création du métier.");
        }
      } catch (error) {
        console.error("Erreur:", error);
        alert("Erreur lors de la création du métier.");
      }
    };
  
    const onSubmitRegion = async (data) => {
      try {
        const regionResponse = await postData("admin/country", { name: data.regionName });
  
        if (regionResponse) {
          alert("Région créée avec succès !");
          reset();
        } else {
          alert("Erreur lors de la création de la région.");
        }
      } catch (error) {
        console.error("Erreur:", error);
        alert("Erreur lors de la création de la région.");
      }
    };
  
    return (
      <div className="flex flex-col h-full space-around bg-neutral-800 p-6 rounded-lg">
        <h2 className="dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] bg-gradient-to-r from-black to-[#67FFCC] font-bold text-transparent bg-clip-text text-center text-2xl mb-5">Création de Nouveau Métier et Région</h2>
        <hr className="w-1/2 my-4 border-t-2 border-gray-400 mx-auto" />
        <form
          onSubmit={handleSubmit(onSubmitJob)}
          className="flex flex-col lg:space-y-5 lg:grid lg:grid-cols-2 gap-3"
        >
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
            <Input.MultipleUpload
              placeholder="Sélectionnez des images"
              onFileUpload={handlePhotosChange}
              onFileDelete={handleDeletePhoto}
              url={formData.photos}
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
        <form
          onSubmit={handleSubmit(onSubmitRegion)}
          className="flex flex-col lg:space-y-5 lg:grid lg:grid-cols-2 gap-3 mt-6"
        >
          <div className="flex flex-col lg:col-span-2 gap-6">
            <div className="relative flex items-center">
              <FaMapMarkerAlt className="absolute left-3 text-gray-400" />
              <input
                id="regionName"
                type="text"
                {...register("regionName", { required: true })}
                placeholder="Nom de la région"
                className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-[#67FFCC] focus:border-[#67FFCC]"
              />
            </div>
          </div>
          <div className="col-span-2 flex justify-center mt-6">
            <button
              className="flex w-full dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] bg-gradient-to-r from-black to-[#67FFCC] text-transparent bg-clip-text items-center justify-center border border-gray-500 font-bold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 hover:border-[#67FFCC] transition duration-300 ease-in-out"
              type="submit"
            >
              Créer Région
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default CreateJobAndRegionForm;