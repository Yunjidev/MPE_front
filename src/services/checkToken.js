import Cookies from "js-cookie";
import { kyInstance } from "./config-fetch";

export const validateRefreshToken = async () => {
  const refreshToken = Cookies.get("mpe-refresh");
  if (!refreshToken) {
    return { isLogged: false };
  }
  try {
    const response = await kyInstance.post(
      "validate-refresh-token",
      refreshToken,
    );
    Cookies.set("mpe-auth", response.headers.get("Authorization"), {
      secure: true,
      sameSite: "strict",
    });
    return { isLogged: true };
  } catch (error) {
    Cookies.remove("mpe-refresh");
    Cookies.remove("mpe-auth");
    localStorage.removeItem("user");
  }
};
