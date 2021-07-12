import * as React from "react"
import {FC, useContext} from "react"
import {useHistory} from "react-router-dom"
import authContext from "../../contexts/authContext"

interface Props {
}

const AuthButton: FC<Props> = () => {
  let history = useHistory();
  let auth = useContext(authContext);

  if (!auth.user) {
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
