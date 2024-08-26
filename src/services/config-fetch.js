import ky from "ky";
import Cookies from "js-cookie";

export const BASE_URL = import.meta.env.VITE_API_URL;

export const kyInstance = ky.create({
  hooks: {
    beforeRequest: [
      (request) => {
        const token = Cookies.get("mpe-auth");
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    beforeError: [
      async (error) => {
        const { response } = error;
        if (response) {
          const errorData = await response.json();
          error.responseData = errorData;
        }
        return error;
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401 && Cookies.get("mpe-auth")) {
          const refreshToken = Cookies.get("mpe-refresh");
          if (refreshToken) {
            try {
              const refreshResponse = await ky.post(
                `${BASE_URL}/refresh-token`,
                {
                  json: { refreshToken },
                },
              );

              const newAccessToken =
                refreshResponse.headers.get("Authorization");
              Cookies.set("mpe-auth", newAccessToken, {
                secure: true,
                sameSite: "strict",
              });
              return kyInstance(request);
            } catch (refreshError) {
              Cookies.remove("mpe-auth");
              Cookies.remove("mpe-refresh");
              localStorage.removeItem("user");
              window.location.href = "/signin";
              throw new Error("Vous devez vous reconnecter");
            }
          } else {
            Cookies.remove("mpe-auth");
            Cookies.remove("mpe-refresh");
            localStorage.removeItem("user");
            window.location.href = "/signin";
            throw new Error("Vous devez vous reconnecter");
          }
        }
        return response;
      },
    ],
  },
});
