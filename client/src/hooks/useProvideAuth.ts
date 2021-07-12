import {useState} from "react"
import {IUser} from "../contexts/authContext"
import http from "../http"

const useProvideAuth = () => {
  const [user, setUser] = useState<IUser | null>(null);

  const login = async (data: any) => {
    try {
      const response = await http.post('/auth/login', data);

      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setUser(response.data.user);

      return true;
    } catch (e) {
      return false;
    }
  };

  const logout = async () => {
    localStorage.removeItem('token');
  };

  return { setUser, user, login, logout };
}

export default useProvideAuth;
