import { useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../store/user";
import { io } from "socket.io-client";

export function useSocketIo() {
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    console.log("Tentative de connexion a Socket.io");
    const socket = io("http://localhost:8080", {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      console.log("Connected to server");
      console.log("Id de Socket.io", socket.id);
    });
    socket.on("connect_error", (error) => {
      console.log("Erreur de connexion", error);
    });

    socket.on("enterpriseValidated", (data) => {
      console.log("Données reçues", data);
      setUser((prev) => {
        console.log("Etat precedent", prev);
        const updatedEnterprise = prev.enterprises.map((enterprise) =>
          enterprise.id === data.id
            ? { ...enterprise, isValidate: data.isValidate === "true" }
            : enterprise,
        );
        const newState = { ...prev, enterprises: updatedEnterprise };
        console.log("Etat après", newState);
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
