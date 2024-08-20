import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { postData } from "../../services/data-fetch"; // Assurez-vous que cette fonction est bien définie
import { useNavigate } from "react-router-dom";

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialiser useNavigate

  const onSubmit = async (data) => {
    try {
      const response = await postData("forgot-password", { email: data.email });
      setMessage(
        response.message ||
          "Veuillez vérifier votre email pour réinitialiser votre mot de passe."
      );

      // Afficher une alerte
      alert("Un lien de réinitialisation a été envoyé à votre adresse e-mail.");

      // Redirection vers /home
      navigate("/home-client");
    } catch (error) {
      setMessage("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="flex flex-col h-full space-around bg-neutral-800 p-6 rounded-lg">
      <h2 className="text-white text-center text-2xl mb-5">
        Demander une Réinitialisation de Mot de Passe
      </h2>
      <hr className="w-1/2 my-4 border-t-2 border-gray-400 mx-auto" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-5"
      >
        <div className="relative flex items-center">
          <input
            id="email"
            type="email"
            {...register("email", { required: "L'email est requis." })}
            placeholder="Email"
            className="w-full pl-3 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-green-400 focus:border-green-300"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="flex w-full dark:bg-gradient-to-r dark:from-green-200 dark:to-green-400 bg-gradient-to-r from-green-400 to-green-800 text-transparent bg-clip-text items-center justify-center border border-gray-500 font-bold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 hover:border-green-200 transition duration-300 ease-in-out"
          >
            Envoyer le Lien de Réinitialisation
          </button>
        </div>
        {message && <p className="text-center text-white mt-4">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
