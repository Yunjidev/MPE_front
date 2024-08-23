import { BASE_URL, kyInstance } from "./config-fetch";

// Fonction pour récupérer les données
export async function getData(object, timeout = 50000) {
  try {
    const response = await kyInstance.get(BASE_URL + object , { timeout }).json();
    return response;
  } catch (error) {
    const errorData = error.response ? await error.response.json() : error.message;
    throw new Error(errorData);
  }
}

export async function postData(object, data) {
  try {
    const options = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await kyInstance.post(BASE_URL + object, options);
    return await response.json();
  } catch (error) {
    // Vérifiez si l'objet de réponse existe et contient des erreurs
    if (error.response) {
      const errorData = await error.response.json();
      throw new Error(JSON.stringify(errorData.errors || errorData));
    } else {
      // Si l'objet de réponse n'existe pas, enregistrez le message d'erreur général
      throw new Error(error.message);
    }
  }
}

export async function putData(object, data) {
  try {
    const options = {
      body: data,
    };
    if (!(data instanceof FormData)) {
      options.headers["Content-Type"] = "application/json";
    }
    const response = await kyInstance.put(BASE_URL + object, options);
    return response.json();
  } catch (error) {
    let errorData = await error.responseData;
    console.log(errorData);
    throw new Error(errorData);
  }
}

// Fonction pour supprimer les données
export async function deleteData(object) {
  try {
    await kyInstance.delete(BASE_URL + object);
    return null;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
}
