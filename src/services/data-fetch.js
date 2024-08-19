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
    if (error.response) {
      const errorText = await error.response.text();
      console.log("Error Response Text:", errorText);
    } else {
      console.log("Error Message:", error.message);
    }
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

export async function putData(object, data, options = {}) {
  try {
    console.log("Data to PUT:", data);

    // Préparer les options pour la requête
    const requestOptions = {
      method: 'PUT',
      body: data,
      ...options,
    };

    // Si on n'a pas déjà défini les headers, on les ajoute
    if (!requestOptions.headers) {
      requestOptions.headers = setHeaders(); // Ensure setHeaders() does not set Content-Type for FormData
    }

    // Pour FormData, ne pas inclure `Content-Type` dans les headers
    // car `ky` le gère automatiquement
    const response = await ky(BASE_URL + object, requestOptions).json();
    return response;
  } catch (error) {
    console.log("Error:", error);

    // Check if error has response property for detailed error messages
    if (error.response) {
      try {
        const errorText = await error.response.text();
        console.log("Error Response Text:", errorText);
      } catch (e) {
        console.log("Failed to get error response text:", e);
      }
    } else {
      console.log("Error Message:", error.message);
    }

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
