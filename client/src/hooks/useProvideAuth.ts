import {useState} from "react"
import {IUser} from "../contexts/authContext"
import http from "../http"

const fakeAuth = {
  isAuthenticated: false,
  login(cb: Function) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  logout(cb: Function) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const useProvideAuth = () => {
  const [user, setUser] = useState<IUser | null>(null);

  const login = async (data: any) => {
    try {
      const response = await http.post('/auth/login', { data })

      localStorage.setItem('token', response.data.access_token);
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
