import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { postData } from "../../services/data-fetch";

const ResetPassword = () => {
  const { token } = useParams(); // Récupération du token depuis l'URL
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(5);

  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = async (data) => {
    if (newPassword !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await postData(`reset-password/${token}`, {
        newPassword: data.newPassword,
      });

      setMessage(
        response.message ||
          "Votre mot de passe a été réinitialisé avec succès.",
      );

      alert("Votre mot de passe a été réinitialisé avec succès.");

      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      setTimeout(() => {
        window.location.href = "/home-client";
      }, 5000);

      return () => clearInterval(interval);
    } catch (error) {
      setMessage("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  useEffect(() => {
    if (countdown === 0) {
      window.location.href = "/home-client";
    }
  }, [countdown]);

  return (
    <div className="flex flex-col h-full space-around bg-neutral-800 p-6 rounded-lg mt-8">
      <h2 className="text-white text-center text-2xl mb-5">
        Réinitialiser le Mot de Passe
      </h2>
      <hr className="w-1/2 my-4 border-t-2 border-gray-400 mx-auto" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-5"
      >
        <div className="relative flex items-center">
          <input
            id="newPassword"
            type="password"
            {...register("newPassword", {
              required: "Le nouveau mot de passe est requis.",
            })}
            placeholder="Nouveau Mot de Passe"
            className="w-full pl-3 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-green-400 focus:border-green-300"
          />
          {errors.newPassword && (
            <span className="text-red-500 text-sm">
              {errors.newPassword.message}
            </span>
          )}
        </div>
        <div className="relative flex items-center">
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: "La confirmation du mot de passe est requise.",
            })}
            placeholder="Confirmer le Nouveau Mot de Passe"
            className="w-full pl-3 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-green-400 focus:border-green-300"
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="flex w-full dark:bg-gradient-to-r dark:from-green-200 dark:to-green-400 bg-gradient-to-r from-green-400 to-green-800 text-transparent bg-clip-text items-center justify-center border border-gray-500 font-bold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 hover:border-green-200 transition duration-300 ease-in-out"
          >
            Réinitialiser le Mot de Passe
          </button>
        </div>
        {message && (
          <div>
            <p className="text-center text-white mt-4">{message}</p>
            <p className="text-center text-white mt-2">
              Redirection dans {countdown} secondes...
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
