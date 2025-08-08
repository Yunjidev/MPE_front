import Cookies from "js-cookie";
import { BASE_URL, kyInstance } from "./config-fetch";

export async function authSignInUp(object, data) {
  try {
    let response = await kyInstance.post(BASE_URL + object, {
      json: data,
    });
    Cookies.set("mpe-auth", response.headers.get("Authorization"), {
      secure: true,
      sameSite: "strict",
    });
    const userData = await response.json();
    const refreshToken = userData.refreshToken;
    Cookies.set("mpe-refresh", refreshToken, {
      secure: true,
      sameSite: "strict",
    });
    return await userData;
  } catch (error) {
    let errorData = await error.responseData;
    throw new Error(JSON.stringify(errorData));
  }
}

export async function authSignOut() {
  try {
    const accessToken = Cookies.get("mpe-auth");
    const refreshToken = Cookies.get("mpe-refresh");
    if (!accessToken || !refreshToken) {
      throw new Error("Aucun token d'authentification trouvé.");
    }
    let response = await kyInstance.post(`${BASE_URL}signout`, {});
    Cookies.remove("mpe-auth");
    Cookies.remove("mpe-refresh");
    return response;
  } catch (error) {
    const errorData = await error.responseData.errors;
    throw new Error(errorData);
  }
}
