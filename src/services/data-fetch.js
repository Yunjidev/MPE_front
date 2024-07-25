import ky from "ky";
import { BASE_URL, setHeaders } from "./config-fetch";

// Fonction pour recuperer les donnees
export async function getData(object) {
  try {
    let response = await ky.get(BASE_URL + object).json();
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Fonction pour supprimer les donnes
export async function deleteData(object) {
  try {
    await ky.delete(BASE_URL + object, { headers: setHeaders() });
    return null;
  } catch (error) {
    console.log(error);
  }
}
