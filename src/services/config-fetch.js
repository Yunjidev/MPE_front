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
  },
});
