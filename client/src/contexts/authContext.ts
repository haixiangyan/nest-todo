import {createContext} from "react"

const authContext = createContext<any>({ auth: { user: {}}});

export default authContext;

