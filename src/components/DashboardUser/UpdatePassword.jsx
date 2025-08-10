/* eslint-disable no-unused-vars */
import { useState } from "react";
import { putData } from "../../services/data-fetch";
import { FaLock, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";

export default function UpdatePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showNew2, setShowNew2] = useState(false);

  const onSubmitHandler = async (data) => {
    setError(null);
    setSuccess(null);

    if (data.password !== data.passwordConfirmation) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      setSubmitting(true);

      // IMPORTANT: multipart/form-data
      const fd = new FormData();
      fd.append("current_password", data.current_password.trim());
      fd.append("password", data.password.trim());
      fd.append("passwordConfirmation", data.passwordConfirmation.trim());

      // ⚠️ ne force surtout pas le Content-Type ici,
      // laisse fetch/XHR le définir avec le boundary
      const response = await putData("user/update", fd);

      if (response?.error) {
        setError(response.error.message || "Erreur lors du changement de mot de passe.");
      } else {
        setSuccess("Mot de passe mis à jour avec succès !");
        reset();
      }
    } catch (err) {
      console.error("Error changing password:", err);
      setError("Erreur lors du changement de mot de passe.");
    } finally {
      setSubmitting(false);
    }
  };

  const baseInput =
    "w-full pl-10 pr-12 h-12 rounded-xl bg-neutral-900/80 text-white placeholder:text-neutral-500 " +
    "border border-neutral-800 outline-none ring-0 " +
    "focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/30 transition";

  const eyeBtn =
    "absolute top-1/2 -translate-y-1/2 right-3 h-8 w-8 flex items-center justify-center rounded-lg text-neutral-400 " +
    "hover:text-white hover:bg-neutral-700/60 transition";

  const field = ({ id, icon, type, show, setShow, placeholder, reg }) => (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">{icon}</span>
      <input
        id={id}
        type={show ? "text" : type}
        placeholder={placeholder}
        className={baseInput}
        {...reg}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className={eyeBtn}
        aria-label={show ? "Masquer" : "Afficher"}
      >
        {show ? <FaEyeSlash /> : <FaEye />}
      </button>
    </div>
  );

  return (
    <div className="mt-12 mb-6 flex items-center justify-center">
      <div className="w-full max-w-xl rounded-2xl border border-neutral-800/80 bg-neutral-900/80 backdrop-blur-sm shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]">
        <div className="px-6 py-6">
          <h2 className="text-white text-center text-2xl font-semibold">Changer le mot de passe</h2>
          <p className="text-center text-sm text-neutral-400 mt-1">
            Entrez l’ancien mot de passe, puis votre nouveau mot de passe (deux fois).
          </p>

          <hr className="my-6 border-neutral-800" />

          <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col gap-4">
            {/* Ancien mot de passe */}
            {field({
              id: "current_password",
              icon: <FaLock />,
              type: "password",
              show: showOld,
              setShow: setShowOld,
              placeholder: "Ancien mot de passe",
              reg: register("current_password", { required: "L’ancien mot de passe est requis" }),
            })}
            {errors.current_password && (
              <span className="text-red-400 text-xs">{errors.current_password.message}</span>
            )}

            {/* Nouveau mot de passe */}
            {field({
              id: "password",
              icon: <FaLock />,
              type: "password",
              show: showNew,
              setShow: setShowNew,
              placeholder: "Nouveau mot de passe",
              reg: register("password", {
                required: "Le mot de passe est requis",
                minLength: { value: 8, message: "Minimum 8 caractères" },
              }),
            })}
            {errors.password && <span className="text-red-400 text-xs">{errors.password.message}</span>}

            {/* Confirmation */}
            {field({
              id: "passwordConfirmation",
              icon: <FaKey />,
              type: "password",
              show: showNew2,
              setShow: setShowNew2,
              placeholder: "Confirmer le nouveau mot de passe",
              reg: register("passwordConfirmation", {
                required: "La confirmation du mot de passe est requise",
              }),
            })}
            {errors.passwordConfirmation && (
              <span className="text-red-400 text-xs">{errors.passwordConfirmation.message}</span>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className={`w-full h-12 rounded-2xl border ${
                  submitting ? "border-neutral-700" : "border-neutral-700 hover:border-neutral-600"
                } bg-neutral-800 text-neutral-200 hover:bg-neutral-700 hover:text-white active:scale-[0.98] font-medium transition-all duration-200 ${
                  submitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {submitting ? "En cours…" : "Changer le mot de passe"}
              </button>
            </div>

            {error && <div className="text-red-400 text-center mt-2 text-sm">{error}</div>}
            {success && <div className="text-emerald-400 text-center mt-2 text-sm">{success}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
