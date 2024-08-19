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
    const options = {
      headers: setHeaders(),
      body: data,
    };
    if (!(data instanceof FormData)) {
      options.headers["Content-Type"] = "application/json";
    }
    const response = await ky.post(BASE_URL + object, options);
    return response.json();
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
}

export async function putData(object, data) {
  try {
    const options = {
      headers: setHeaders(),
      body: data,
    };
    if (!(data instanceof FormData)) {
      options.headers["Content-Type"] = "application/json";
    }
    const response = await ky.put(BASE_URL + object, options);
    return response.json();
  } catch (error) {
    console.log("Error:", error);
    if (error.response) {
      const errorText = await error.response.text();
      console.log("Error Response Text:", errorText);
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
