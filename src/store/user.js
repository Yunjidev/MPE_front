import { atomWithStorage } from "jotai/utils";

export const userAtom = atomWithStorage("user", {
  username: "",
  email: "",
  firstname: "",
  lastname: "",
  avatar: "",
  isAdmin: false,
  isEntrepreneur: false,
  isLogged: false,
  enterprises: [],
});
