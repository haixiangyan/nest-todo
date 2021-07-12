import {createContext} from "react"

export interface IUser {
  username: string;
  email?: string;
}

interface IAuth {
  user: IUser | null;
  login: Function;
  logout: Function;
}

const authContext = createContext<IAuth>({
  login: async () => {},
  logout: async () => {},
  user: null,
});

export default authContext;

