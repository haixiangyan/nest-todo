import {createContext} from "react"

export interface Auth {
  token: string | null;
  setToken: Function;
  login: Function;
  logout: Function;
  isAdmin: boolean,
}

const AuthContext = createContext<Auth>({
  login: async () => {},
  logout: async () => {},
  token: null,
  isAdmin: false,
  setToken: () => {},
});

export default AuthContext;

