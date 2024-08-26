import { useEffect } from "react";
import { useAtom } from "jotai";
import { enterprisesAtom } from "../store/enterprises";
import { io } from "socket.io-client";

export const initSocket = () => {
  const socket = io("http://localhost:8080", {
    withCredentials: true,
    transports: ["websocket", "polling"],
  });
  return socket;
};

export function useSocketIo() {
  const [, setEnterprises] = useAtom(enterprisesAtom);

  useEffect(() => {
    const socket = initSocket();

    const handleEnterpriseValidated = (data) => {
      setEnterprises((prev) =>
        prev.map((enterprise) =>
          enterprise.id === data.id
            ? { ...enterprise, isValidate: data.isValidate === "true" }
            : enterprise,
        ),
      );
    };
    const handleEnterpriseDeleted = (data) => {
      setEnterprises((prev) =>
        prev.filter((enterprise) => enterprise.id !== data.enterprises),
      );
    };

    socket.on("enterpriseValidated", handleEnterpriseValidated);
    socket.on("enterpriseDeleted", handleEnterpriseDeleted);

    return () => {
      socket.off("enterpriseValidated");
      socket.off("enterpriseDeleted");
      socket.disconnect();
    };
  }, [setEnterprises]);

  return null;
}
