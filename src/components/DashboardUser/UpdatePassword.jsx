/* eslint-disable no-unused-vars */
import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { putData } from "../../services/data-fetch";
import { FaLock, FaKey } from "react-icons/fa";
import { useForm } from "react-hook-form";

export default function UpdatePassword() {
  const { user } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onSubmitHandler = async (data) => {
    const { password, confirmPassword } = data;

    // Vérifier que les deux mots de passe sont identiques
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await putData("user/update", {
        password: password.trim(),
      });

      if (response.error) {
        setError(
          response.error.message || "Erreur lors du changement de mot de passe."
        );
      } else {
        setSuccess("Mot de passe mis à jour avec succès !");
        setError(null);
      }
    } catch (error) {
      setError("Erreur lors du changement de mot de passe.");
      console.error("Error changing password:", error);
    }
  };

  return (
    <div className="mt-12 mb-6 flex items-center justify-center bg-neutral-900 rounded-xl border border-white">
      <div className="relative border-form-1 group max-w-8xl w-full ">
        <div className="absolute -top-1 -left-1 -right-1 -bottom-1 "></div>
        <div className="bg-neutral-900 p-10 rounded-xl relative z-10 transform transition duration-500 ease-in-out">
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
              <input
                type="password"
                {...register("password", {
                  required: "Le mot de passe est requis",
                })}
                placeholder="Nouveau mot de passe"
                className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-green-400 focus:border-green-400"
              />
              {errors.password && (
                <span className="text-red-500 text-sm absolute right-3">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="relative flex items-center">
              <FaKey className="absolute left-3 text-gray-400" />
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "La confirmation du mot de passe est requise",
                })}
                placeholder="Confirmer le nouveau mot de passe"
                className="w-full pl-10 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-green-400 focus:border-green-400"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm absolute right-3">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <div className="flex justify-center">
              <button
                className="flex w-full bg-gradient-to-r from-white to-[#67FFCC] text-transparent bg-clip-text items-center justify-center w-44 h-12 mr-2 border border-neutral-300 font-bold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                type="submit"
              >
                Changer le mot de passe
              </button>
            </div>

            {/* Afficher les messages d'erreur et de succès */}
            {error && (
              <div className="text-red-500 text-center mt-4">{error}</div>
            )}
            {success && (
              <div className="text-green-500 text-center mt-4">{success}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
