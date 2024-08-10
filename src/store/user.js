import { atomWithStorage } from 'jotai/utils';

export const userAtom = atomWithStorage("user", {
  id: null,
  username: "",    
  email: "",
  firstname: "",   
  lastname: "",    
  avatar: "",
  isAdmin: false,      
  isLogged: false,
});
