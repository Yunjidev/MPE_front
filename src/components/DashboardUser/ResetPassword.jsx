import React from "react";
import { useForm, Controller } from "react-hook-form";
import { FaLock, FaKey } from "react-icons/fa";
import { putData } from "../../services/data-fetch";

const ResetPasswordForm = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const newPassword = watch("newPassword", "");

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await putData(
        `users/reset-password/${data.resetToken}`,
        {
          newPassword: data.newPassword,
        }
      );

      if (response) {
        alert("Votre mot de passe a été mis à jour avec succès !");
      }
    } catch (error) {
      alert(
        "Une erreur est survenue lors de la réinitialisation du mot de passe."
      );
    }
  };

  return (
    <div className="flex flex-col h-full justify-center items-center bg-neutral-800 p-6 rounded-lg">
      <h2 className="text-white text-center text-2xl mb-5">
        Réinitialiser le mot de passe
      </h2>
      <hr className="w-1/2 my-4 border-t-2 border-gray-400 mx-auto" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col lg:space-y-5 w-full max-w-lg"
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
                className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-green-400 focus:border-green-300"
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
                className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-green-400 focus:border-green-300"
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
                className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-green-400 focus:border-green-300"
              />
            )}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm absolute right-3">
              {errors.confirmPassword.message}
            </span>
          )}
          {newPassword && newPassword !== watch("confirmPassword") && (
            <span className="text-red-500 text-sm absolute right-3">
              Les mots de passe ne correspondent pas
            </span>
          )}
        </div>

        <div className="flex justify-center">
          <button
            className="flex w-full dark:bg-gradient-to-r dark:from-green-200 dark:to-green-400 bg-gradient-to-r from-green-400 to-green-800 text-transparent bg-clip-text items-center justify-center border border-gray-500 font-bold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 hover:border-green-200 transition duration-300 ease-in-out"
            type="submit"
          >
            Réinitialiser le mot de passe
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
