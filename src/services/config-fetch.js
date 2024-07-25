import Cookies from "js-cookie";

export const BASE_URL = "http://localhost:8080/api/";

export function setHeaders() {
  const token = Cookies.get("mpe-auth");
  const headers = {};
  if (token) {
    headers.Authorization = `${token}`;
  }
  return headers;
}
