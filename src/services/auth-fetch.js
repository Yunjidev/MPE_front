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
