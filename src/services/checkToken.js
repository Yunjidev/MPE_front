import Cookies from "js-cookie";
import { authSignInUp } from "./auth-fetch";

export const validateRefreshToken = async () => {
  const refreshToken = Cookies.get("mpe-refresh");
  if (!refreshToken) {
    return { isLogged: false };
  }
  try {
    await authSignInUp("validate-refresh-token", {
      refreshToken: refreshToken,
    });
    return { isLogged: true };
  } catch (error) {
    Cookies.remove("mpe-refresh");
    Cookies.remove("mpe-auth");
    localStorage.removeItem("user");
  }
};
