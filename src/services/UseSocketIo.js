import { useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../store/user";
import { io } from "socket.io-client";

export function useSocketIo() {
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    const socket = io("http://localhost:8080", {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    socket.on("enterpriseValidated", (data) => {
      setUser((prev) => {
        const updatedEnterprise = prev.enterprises.map((enterprise) =>
          enterprise.id === data.id
            ? { ...enterprise, isValidate: data.isValidate === "true" }
            : enterprise,
        );
        const newState = { ...prev, enterprises: updatedEnterprise };
        return newState;
      });
    });
    return () => {
      socket.off("enterpriseValidated");
      socket.disconnect();
    };
  }, [setUser]);
  return null;
}
