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

//Fonction pour créer de nouvelles données
export async function postData(object, data) {
  try {
    let response = await ky
      .post(BASE_URL + object, { headers: setHeaders(), json: data })
      .json();
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}