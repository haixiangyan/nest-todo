import {useState} from "react"
import http from "../http"

const useAuth = () => {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token') || null;
  });

  const login = async (data: any) => {
    try {
      const response = await http.post('/auth/login', data);

      localStorage.setItem('token', response.data.access_token);
      setToken(response.data.user);

      return true;
    } catch (e) {
      return false;
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
  };

  return { setToken, token, login, logout };
}

export default useAuth;
