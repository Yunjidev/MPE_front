import Cookies from 'js-cookie';

export const BASE_URL = import.meta.env.VITE_API_URL;

// Fonction pour définir les en-têtes avec les cookies
export function setHeaders() {
  const token = Cookies.get('mpe-auth');
  return {
    'Authorization': token ? `Bearer ${token}` : '',
    'Accept': 'application/json',
  };
}