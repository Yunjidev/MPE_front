import { FaExclamationTriangle } from "react-icons/fa";
import { deleteData } from "../../services/data-fetch";

const DeleteAccount = () => {
  const handleDeleteAccount = async () => {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.",
    );
    if (confirmation) {
      try {
        // Suppression du compte
        await deleteData("users/delete");
        alert("Votre compte a été supprimé avec succès.");
        window.location.href = "/logout";
      } catch (error) {
        console.error("Erreur lors de la suppression du compte:", error);
        alert(
          "Une erreur est survenue lors de la suppression de votre compte.",
        );
      }
    }
  };

  return (
    <div className="flex flex-col h-full justify-center items-center bg-neutral-800 p-6 rounded-lg">
      <h2 className="text-white text-center text-2xl mb-5">
        Supprimer mon compte
      </h2>
      <hr className="w-1/2 my-4 border-t-2 border-gray-400 mx-auto" />
      <div className="flex flex-col items-center text-center lg:space-y-5 space-y-4">
        <FaExclamationTriangle className="text-red-500 text-6xl" />
        <p className="text-gray-300">
          Cette action est irréversible. Toutes vos données seront supprimées de
          manière permanente. Voulez-vous vraiment continuer ?
        </p>
        <button
          onClick={handleDeleteAccount}
          className="flex w-full max-w-xs bg-gradient-to-r from-red-400 to-red-600 text-transparent bg-clip-text items-center justify-center border border-gray-500 font-bold py-3 px-6 rounded-2xl shadow-lg transform hover:scale-105 hover:border-red-400 transition duration-300 ease-in-out"
        >
          Supprimer mon compte
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;
