import { useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { deleteData } from "../../services/data-fetch";

const DeleteAccount = () => {
  const [deleting, setDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible."
    );
    if (!confirmation) return;

    try {
      setDeleting(true);
      await deleteData("users/delete");
      alert("Votre compte a été supprimé avec succès.");
      window.location.href = "/logout";
    } catch (error) {
      console.error("Erreur lors de la suppression du compte:", error);
      alert("Une erreur est survenue lors de la suppression de votre compte.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      className="
        flex flex-col h-full justify-center items-center
        rounded-2xl border border-neutral-800/80
        bg-neutral-900/80 backdrop-blur-sm
        p-6 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]
      "
    >
      <h2 className="text-white text-center text-2xl font-semibold">Supprimer mon compte</h2>
      <p className="text-neutral-400 text-sm mt-1 text-center">
        Cette action est définitive et supprimera toutes vos données.
      </p>

      <hr className="w-1/2 my-6 border-neutral-800" />

      <div className="flex flex-col items-center text-center space-y-4">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-500/10 ring-1 ring-red-500/30">
          <FaExclamationTriangle className="text-red-400 text-3xl" />
        </div>

        <p className="text-neutral-300 max-w-md">
          Cette action est irréversible. Toutes vos données seront supprimées de manière
          permanente. Voulez-vous vraiment continuer ?
        </p>

        <button
          onClick={handleDeleteAccount}
          disabled={deleting}
          className={`
            w-full max-w-xs h-12
            rounded-2xl
            border ${deleting ? "border-red-700" : "border-red-700 hover:border-red-600"}
            bg-neutral-900 text-red-300 hover:text-red-200
            hover:bg-neutral-800 active:scale-[0.98]
            font-semibold
            transition-all duration-200
            ${deleting ? "opacity-70 cursor-not-allowed" : ""}
          `}
        >
          {deleting ? "Suppression en cours…" : "Supprimer mon compte"}
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;
