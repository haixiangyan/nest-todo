import * as React from "react"
import {FC, useContext} from "react"
import {useHistory, useLocation} from "react-router-dom"
import authContext from "../../contexts/authContext"

interface Props {
}

const Login: FC<Props> = () => {
  let history = useHistory();
  let location = useLocation();
  let auth = useContext(authContext);

  // @ts-ignore
  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>要先登录，才能访问 {from.pathname} 哦</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}

export default Login
