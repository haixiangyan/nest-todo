import * as React from "react"
import {FC, useContext} from "react"
import {useHistory, useLocation} from "react-router-dom"
import authContext from "../../contexts/authContext"

const Login: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const auth = useContext(authContext);

  // @ts-ignore
  const { from } = location.state || { from: { pathname: "/" } };

  const login = async () => {
    const isLogin = await auth.login();
    if (isLogin) {
      history.replace(from)
    }
  };

  return (
    <div>
      <p>要先登录，才能访问 {from.pathname} 哦</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}

export default Login
