import {createContext} from "react"

interface IAuth {
  token: string | null;
  setToken: Function;
  login: Function;
  logout: Function;
}

const authContext = createContext<IAuth>({
  login: async () => {},
  logout: async () => {},
  token: null,
  setToken: () => {},
});

export default authContext;

