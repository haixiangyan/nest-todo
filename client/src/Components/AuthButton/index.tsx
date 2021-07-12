import * as React from "react"
import {FC} from "react"
import {useHistory} from "react-router-dom"
import useAuth from "../../hooks/useAuth"

interface Props {
}

const AuthButton: FC<Props> = () => {
  const history = useHistory();
  const auth = useAuth();

  if (!auth.token) {
    return <p>你还没有登录</p>
  }

  return (
    <p>
      Welcome!{" "}
      <button onClick={() => auth.login(() => history.push("/"))}>
        登出
      </button>
    </p>
  )
}

export default AuthButton
