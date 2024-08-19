/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { putData, getData } from "../../services/data-fetch";
import { FaUser, FaEnvelope, FaIdBadge } from "react-icons/fa";

const EditUserForm = ({ user, onClose, onSave }) => {
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      isAdmin: false,
      isEntrepreneur: false,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username || "",
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        isAdmin: user.isAdmin || false,
        isEntrepreneur: user.isEntrepreneur || false,
      });

      setValue("username", user.username || "");
      setValue("firstname", user.firstname || "");
      setValue("lastname", user.lastname || "");
      setValue("email", user.email || "");
      setValue("isAdmin", user.isAdmin || false);
      setValue("isEntrepreneur", user.isEntrepreneur || false);
    }
  }, [user, reset, setValue]);

  const onSubmit = async (data) => {
    const userUpdate = {};
    
    if (data.username !== user.username) userUpdate.username = data.username;
    if (data.firstname !== user.firstname) userUpdate.firstname = data.firstname;
    if (data.lastname !== user.lastname) userUpdate.lastname = data.lastname;
    if (data.email !== user.email) userUpdate.email = data.email;
    if (data.isAdmin !== user.isAdmin) userUpdate.isAdmin = data.isAdmin;
    if (data.isEntrepreneur !== user.isEntrepreneur) userUpdate.isEntrepreneur = data.isEntrepreneur;
  
    try {
      const response = await putData(`admin/user/${user.id}`, userUpdate);
      onSave({ ...user, ...userUpdate }); // Passez l'utilisateur mis à jour ici
      alert("User updated successfully");
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user");
    }
  };

  return (
    <div className="flex flex-col h-full space-around bg-neutral-800 p-6 rounded-lg">
      <h2 className="dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] bg-gradient-to-r from-black to-[#67FFCC] font-bold text-transparent bg-clip-text text-center text-2xl mb-5">Edition Utilisateur</h2>
      <hr className="w-1/2 my-4 border-t-2 border-gray-400 mx-auto" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col lg:space-y-5 lg:grid lg:grid-cols-2 gap-3"
      >
        <div className="flex flex-col lg:col-span-2 gap-6">
          <div className="relative flex items-center">
            <FaUser className="absolute left-3 text-gray-400" />
            <input
              id="username"
              type="text"
              {...register("username", { required: true })}
              placeholder="Username"
              className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-[#67FFCC] focus:border-[#67FFCC]"
            />
          </div>
          <div className="relative flex items-center">
            <FaIdBadge className="absolute left-3 text-gray-400" />
            <input
              id="firstname"
              type="text"
              {...register("firstname", { required: true })}
              placeholder="First Name"
              className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-[#67FFCC] focus:border-[#67FFCC]"
            />
          </div>
          <div className="relative flex items-center">
            <FaIdBadge className="absolute left-3 text-gray-400" />
            <input
              id="lastname"
              type="text"
              {...register("lastname", { required: true })}
              placeholder="Last Name"
              className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-[#67FFCC] focus:border-[#67FFCC]"
            />
          </div>
          <div className="relative flex items-center">
            <FaEnvelope className="absolute left-3 text-gray-400" />
            <input
              id="email"
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
              className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-[#67FFCC] focus:border-[#67FFCC]"
            />
          </div>
          <div className="relative flex items-center">
            <input
              id="isAdmin"
              type="checkbox"
              {...register("isAdmin")}
              className="mr-2"
            />
            <label htmlFor="isAdmin" className="text-white">Admin</label>
          </div>
          <div className="relative flex items-center">
            <input
              id="isEntrepreneur"
              type="checkbox"
              {...register("isEntrepreneur")}
              className="mr-2"
            />
            <label htmlFor="isEntrepreneur" className="text-white">Entrepreneur</label>
          </div>
        </div>
        <div className="col-span-2 flex justify-center mt-6">
          <button
            className="flex w-full dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] bg-gradient-to-r from-black to-[#67FFCC] text-transparent bg-clip-text items-center justify-center border border-gray-500 font-bold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 hover:border-[#67FFCC] transition duration-300 ease-in-out"
            type="submit"
          >
            Sauvegarder
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;
