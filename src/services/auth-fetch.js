import Cookies from "js-cookie";
import { BASE_URL, kyInstance } from "./config-fetch";

export async function authSignInUp(object, data, setUser) {
  try {
    let response = await kyInstance.post(BASE_URL + object, {
      json: data,
    });
    console.log("Authorization", response.headers.get("Authorization"));
    Cookies.set("mpe-auth", response.headers.get("Authorization"));
    const userData = await response.json();
    console.log("userData", userData);
    setUser({
      ...userData.user,
      enterprises: userData.enterprises,
      isLogged: true,
    });
    return await response;
  } catch (error) {
    let errorData = await error.responseData.errors;
    throw new Error(JSON.stringify(errorData));
  }
}

export async function authSignOut() {
  try {
    const token = Cookies.get("mpe-auth");
    // Récupérer le token JWT depuis les cookies
    if (!token) {
      throw new Error("Aucun token d'authentification trouvé.");
    }
    let response = await kyInstance.post(`${BASE_URL}signout`, {});
    console.log("response", response);
    Cookies.remove("mpe-auth"); // Supprimer le token JWT des cookies après la déconnexion
    return response;
  } catch (error) {
    console.log("error", error);
    let errorData = await error.responseData.message;
    throw new Error(errorData);
  }
}
