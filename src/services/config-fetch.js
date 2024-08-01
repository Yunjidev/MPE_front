import Cookies from "js-cookie";

export const BASE_URL = import.meta.env.VITE_API_URL;

export function setHeaders() {
  const token = Cookies.get("mpe-auth");
  const headers = {};
  if (token) {
    headers.Authorization = `${token}`;
  }
  return headers;
}
