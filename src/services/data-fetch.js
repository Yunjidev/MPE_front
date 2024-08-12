import ky from 'ky';
import { BASE_URL, setHeaders } from './config-fetch';

// Fonction pour récupérer les données
export async function getData(object) {
  try {
    const headers = setHeaders();
    console.log('Request Headers:', headers); // Afficher les en-têtes pour le débogage

    const response = await ky.get(BASE_URL + object, { headers }).json();
    return response;
  } catch (error) {
    if (error.response) {
      const errorText = await error.response.text();
      console.log('Error Response Text:', errorText);
    } else {
      console.log('Error Message:', error.message);
    }
    throw error;
  }
}

// Fonction pour supprimer les données
export async function deleteData(object) {
  try {
    const headers = setHeaders();
    await ky.delete(BASE_URL + object, { headers });
    return null;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
}

// Fonction pour envoyer des données (créer un like)
export async function postData(object, data) {
  try {
    const headers = setHeaders();
    console.log('Request Headers:', headers); // Afficher les en-têtes pour le débogage

    const response = await ky.post(BASE_URL + object, { headers, json: data }).json();
    return response;
  } catch (error) {
    if (error.response) {
      const errorText = await error.response.text();
      console.log('Error Response Text:', errorText);
    } else {
      console.log('Error Message:', error.message);
    }
    throw error;
  }
}
