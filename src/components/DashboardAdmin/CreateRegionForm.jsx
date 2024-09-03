import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { postData } from "../../services/data-fetch";
import { toast } from "react-toastify";

const CreateRegionForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmitRegion = async (data) => {
    try {
      const regionResponse = await postData("admin/country", { name: data.regionName });

      if (regionResponse) {
        toast.success("Région créée avec succès !");
        reset();
      } else {
        toast.error("Erreur lors de la création de la région.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors de la création de la région.");
    }
  };

  return (
    <div className="flex flex-col h-full space-around bg-neutral-800 p-6 rounded-lg">
      <h2 className="dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] bg-gradient-to-r from-black to-[#67FFCC] font-bold text-transparent bg-clip-text text-center text-2xl mb-5">
        Création de Nouvelle Région
      </h2>
      <hr className="w-1/2 my-4 border-t-2 border-gray-400 mx-auto" />
      <form onSubmit={handleSubmit(onSubmitRegion)} className="flex flex-col lg:space-y-5 lg:grid lg:grid-cols-2 gap-3">
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

export default CreateRegionForm;