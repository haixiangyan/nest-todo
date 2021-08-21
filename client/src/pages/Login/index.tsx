import * as React from "react"
import {FC, useContext, useState} from "react"
import {useHistory} from "react-router-dom"
import authContext from "../../contexts/AuthContext"

const Login: FC = () => {
  const history = useHistory();
  const auth = useContext(authContext);

  const [authForm, setAuthForm] = useState({
    username: '',
    password: '',
  });
  const [msg, setMsg] = useState('');

  const login = async () => {
    const isLogin = await auth.login({...authForm});
    if (isLogin) {
      setMsg('登录成功');
      history.push('/')
    } else {
      setMsg('登录失败');
    }
  };

  return (
    <div>
      <h1>登录页</h1>

      {msg && <p style={{ color: 'red' }}>{msg}</p>}

      <div>
        <label htmlFor="username">
          用户名
          <input
            value={authForm.username}
            onChange={(e) => setAuthForm({...authForm, username: e.target.value})}
            type="text"
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          密码
          <input
            value={authForm.password}
            onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
            type="text"
          />
        </label>
      </div>
      <button onClick={login}>登录</button>
    </div>
  );
}

export default Login
