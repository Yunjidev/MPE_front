import { jwtDecode as realJwtDecode } from "jwt-decode";
import realCookies from "js-cookie";

export default function checkTokenExpiration(dependencies = { jwtDecode: realJwtDecode, Cookies: realCookies }) {
  let token = dependencies.Cookies.get("mpe-auth");
  if (token) {
    token = token.replace("Bearer ", ""); // remove "Bearer " from the token
    try {
      const decodedToken = dependencies.jwtDecode(token); // Use dependency injection
      const dateNow = new Date();

      if (decodedToken.exp < dateNow.getTime() / 1000) {
        return { isValid: false, reason: "expired" };
      }
    } catch (e) {
      return { isValid: false, reason: "invalid" };
    }
    return { isValid: true };
  } else {
    return { isValid: false, reason: "notFound" };
  }
}