import { useState } from "react";
import { useForm } from "react-hook-form";
import { postData } from "../../services/data-fetch";
import { useNavigate } from "react-router-dom";

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await postData("forgot-password", { email: data.email });

      // Assurez-vous que `response.message` existe bien pour éviter des erreurs potentielles
      setMessage(
        response.message ||
          "Veuillez vérifier votre email pour réinitialiser votre mot de passe.",
      );

      // Affichage de l'alerte
      alert("Un lien de réinitialisation a été envoyé à votre adresse e-mail.");

      // Redirection vers /home-client après succès
      navigate("/home-client");
    } catch (error) {
      // Gestion d'erreur améliorée pour afficher le message exact si disponible
      const errorMessage =
        error.message || "Une erreur est survenue. Veuillez réessayer.";
      setMessage(errorMessage);
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
            {...register("email", {
              required: "L'email est requis.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Veuillez entrer un email valide.",
              },
            })}
            placeholder="Email"
            className="w-full pl-3 px-3 py-2 rounded-xl bg-neutral-800 text-white focus:outline-none focus:ring-green-400 focus:border-green-300"
          />
          {errors.email && (
            <span className="text-red-500 text-sm absolute -bottom-5">
              {errors.email.message}
            </span>
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
