import ky from "ky";
import Cookies from "js-cookie";
import { BASE_URL, setHeaders } from "./config-fetch";

export async function authSignInUp(object, data) {
  try {
    let response = await ky.post(BASE_URL + object, {
      headers: setHeaders(),
      json: data,
    });
    Cookies.set("mpe-auth", response.headers.get("Authorization"));
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function authSignOut() {
  try {
    const token = Cookies.get("mpe-auth"); 
    // Récupérer le token JWT depuis les cookies
    if (!token) {
      throw new Error("Aucun token d'authentification trouvé.");
    }
    let response = await ky.post(`${BASE_URL}signout`, { // Assurez-vous que l'URL est correctement formatée
      headers: {
        ...setHeaders(),
        
        'Authorization': `${token}`  // Ajouter le token JWT dans l'en-tête d'autorisation
      
      },
    });
    Cookies.remove("mpe-auth"); // Supprimer le token JWT des cookies après la déconnexion
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}