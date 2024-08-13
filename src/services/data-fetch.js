import ky from "ky";
import { BASE_URL, setHeaders } from "./config-fetch";

// Fonction pour récupérer les données
export async function getData(object) {
  try {
    const response = await ky
      .get(BASE_URL + object, { headers: setHeaders() })
      .json();
    return response;
  } catch (error) {
    console.log("Error Message:", error.message);
    throw error;
  }
}

export async function postData(object, data) {
  try {
    const response = await ky
      .post(BASE_URL + object, { headers: setHeaders(), json: data })
      .json();
    return response;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
}

export async function putData(object, data) {
  try {
    console.log("Data to PUT:", data);
    const response = await ky
      .put(BASE_URL + object, { headers: setHeaders(), json: data })
      .json();
    return response;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
}
// Fonction pour supprimer les données
export async function deleteData(object) {
  try {
    await ky.delete(BASE_URL + object, { headers: setHeaders() });
    return null;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
}
