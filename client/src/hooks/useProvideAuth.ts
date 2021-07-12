import {useState} from "react"
import axios from "axios"
import {baseURL} from "../constants"
import {IUser} from "../contexts/authContext"

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

  const login = async (cb: Function) => {
    const response = await axios.request(({
      baseURL,
      url: '/auth/login',
      method: 'POST'
    }))
    cb(response);
  };

  const logout = async (cb: Function) => {
    localStorage.removeItem('token');
    cb();
  };

  return { setUser, user, login, logout };
}

export default useProvideAuth;
