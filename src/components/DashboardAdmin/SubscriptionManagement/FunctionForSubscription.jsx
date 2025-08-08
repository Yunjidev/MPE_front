import { getData, postData, putData, deleteData } from "../../../services/data-fetch";
import { toast } from "react-toastify";

// Fonction pour voir des souscription
export const getSubscription = async () => {
    try {
        const data = await getData("admin/subscriptions");
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des souscriptions:", error);
    }
}

// Fonction pour ajouter une subscription
export const addSubscription = async (data) => {
    try {
        // console.log("Ajout de la souscription");
        await postData("admin/subscriptions", data);
        // console.log("La souscription a été ajoutée avec succès");
        toast.success("La souscription a été ajoutée avec succès");
    } catch (error) {
        console.error("Erreur lors de l'ajout de la souscription:", error);
        toast.error("Une erreur est survenue lors de l'ajout de la souscription");
    }
}

// Fonction pour supprimer une souscription
export const deleteSubscription = async (id) => {
      
      try {
        // console.log(`Suppression de la souscription ${id}`);
        await deleteData(`subscription/${id}`);
        // console.log(`La souscription ${id} a été supprimée avec succès`);
        toast.success("La souscription a été supprimée avec succès");
      } catch (error) {
        console.error(`Erreur lors de la suppression de la souscription ${id}:`, error);
        toast.error("Une erreur est survenue lors de la suppression de la souscription");
      }
    };

// Fonction pour modifier une souscription
export const updateSubscription = async (id, data) => {
    try {
        // console.log(`Modification de la souscription ${id}`);
        await putData(`admin/subscriptions/${id}`, data);
        // console.log(`La souscription ${id} a été modifiée avec succès`);
        toast.success("La souscription a été modifiée avec succès");
    } catch (error) {
        console.error(`Erreur lors de la modification de la souscription ${id}:`, error);
        toast.error("Une erreur est survenue lors de la modification de la souscription");
    }
}   

