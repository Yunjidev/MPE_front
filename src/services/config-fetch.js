import Cookies from "js-cookie";

export const BASE_URL = "http://localhost:8080/api/";

export function setHeaders() {
    let token = Cookies.get("mpe-auth");
    let headers = {};
    if (token) {
        headers.Authorization = `${token}`;
    }
    return headers;
}