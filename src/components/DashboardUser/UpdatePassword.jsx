import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { putData } from "../../services/data-fetch";
import { FaLock, FaKey } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import Cookies from "js-cookie";

export default function UpdatePassword({ onSubmit }) {
  const { user } = useContext(UserContext);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onSubmitHandler = async (data) => {
    const { currentPassword, newPassword, confirmPassword } = data;

    if (newPassword !== confirmPassword) {
      setError("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await putData("user/update", {
        oldPassword: currentPassword.trim(),
        newPassword: newPassword.trim(),
      });

      if (response.error) {
        setError(
          response.error.message || "Erreur lors du changement de mot de passe."
        );
      } else {
        setSuccess("Mot de passe mis à jour avec succès !");
        setError(null);
        if (onSubmit) {
          onSubmit(response);
        }
      }
    } catch (error) {
      setError("Erreur lors du changement de mot de passe.");
      console.error("Error changing password:", error);
    }
  };

  return (
    <div className="mt-12 mb-6 flex items-center justify-center bg-neutral-900">
      <div className="relative border-form-1 group max-w-8xl w-full">
        <div className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-xl bg-gradient-to-b from-violet-400 via-green-200 to-orange-400 shadow-lg transition-transform duration-500 group-hover:scale-101"></div>
        <div className="bg-neutral-900 p-10 rounded-xl shadow-xl relative z-10 transform transition duration-500 ease-in-out">
          <h2 className="text-white text-center text-2xl mb-5">
            Changer le mot de passe
          </h2>
          <hr className="w-1/2 my-4 border-t-2 border-gray-400 mx-auto" />
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="flex flex-col lg:space-y-5 lg:grid lg:grid-cols-1 gap-5"
          >
            <div className="relative flex items-center">
              <FaLock className="absolute left-3 text-gray-400" />
              <Controller
                name="currentPassword"
                control={control}
                rules={{ required: "Mot de passe actuel requis" }}
                render={({ field }) => (
                  <input
                    type="password"
                    {...field}
                    placeholder="Mot de passe actuel"
                    className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-green-400 focus:border-green-400"
                  />
                )}
              />
              {errors.currentPassword && (
                <span className="text-red-500 text-sm absolute right-3">
                  {errors.currentPassword.message}
                </span>
              )}
            </div>

            <div className="relative flex items-center">
              <FaKey className="absolute left-3 text-gray-400" />
              <Controller
                name="newPassword"
                control={control}
                rules={{ required: "Nouveau mot de passe requis" }}
                render={({ field }) => (
                  <input
                    type="password"
                    {...field}
                    placeholder="Nouveau mot de passe"
                    className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-green-400 focus:border-green-400"
                  />
                )}
              />
              {errors.newPassword && (
                <span className="text-red-500 text-sm absolute right-3">
                  {errors.newPassword.message}
                </span>
              )}
            </div>

            <div className="relative flex items-center">
              <FaKey className="absolute left-3 text-gray-400" />
              <Controller
                name="confirmPassword"
                control={control}
                rules={{ required: "Confirmation du mot de passe requise" }}
                render={({ field }) => (
                  <input
                    type="password"
                    {...field}
                    placeholder="Confirmer le nouveau mot de passe"
                    className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-green-400 focus:border-green-400"
                  />
                )}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm absolute right-3">
                  {errors.confirmPassword.message}
                </span>
              )}
              {errors.confirmPassword &&
                errors.confirmPassword.message ===
                  "Les mots de passe ne correspondent pas" && (
                  <span className="text-red-500 text-sm absolute right-3">
                    Les mots de passe ne correspondent pas
                  </span>
                )}
            </div>

            <div className="flex justify-center">
              <button
                className="flex w-full dark:bg-gradient-to-r dark:from-white dark:to-[#67FFCC] bg-gradient-to-r from-[#67FFCC] to-black text-transparent bg-clip-text items-center justify-center w-44 h-12 mr-2 border border-neutral-300 font-bold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                type="submit"
              >
                Changer le mot de passe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
