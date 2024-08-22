import { BASE_URL, kyInstance } from "./config-fetch";

// Fonction pour récupérer les données
export async function getData(object, timeout = 50000) {
  try {
    const response = await kyInstance.get(BASE_URL + object , { timeout }).json();
    return response;
  } catch (error) {
    let errorData = await error.responseData.message;
    throw new Error(errorData);
  }
}

export async function postData(object, data) {
  try {
    const options = {
      body: data,
    };
    if (!(data instanceof FormData)) {
      options.headers["Content-Type"] = "application/json";
    }
    const response = await kyInstance.post(BASE_URL + object, options);
    return response.json();
  } catch (error) {
    let errorData = await error.responseData.errors;
    throw new Error(JSON.stringify(errorData));
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
