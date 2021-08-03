import React, { FC, useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import Todo from "./pages/Todo"
import Login from "./pages/Login"
import AuthContext from "./contexts/AuthContext"
import useAuth from "./hooks/useAuth"
import AuthButton from "./Components/AuthButton"
import PrivateRoute from "./Components/PrivateRoute"
import Admin from './pages/Admin';
import AdminRoute from './Components/AdminRoute';
import http from './http';
import { CountRsp } from './types/Common';
import ChatRoom from './Components/ChatRoom';
import styles from './styles.module.scss';

const App: FC = () => {
  const auth = useAuth();

  const [count, setCount] = useState(0);
  const [chatVisible, setChatVisible] = useState<boolean>(false);

  const updateAndGetCount = async () => {
    http.post('/count').then();

    const { data } = await http.get<CountRsp>('/count');
    setCount(data.count);
  }

  useEffect(() => {
    updateAndGetCount().then();
  }, []);

  return (
    <AuthContext.Provider value={auth}>
      <Router>
        {auth.isAdmin && (
          <header>
            <Link to="/admin">管理员页面</Link>
          </header>
        )}
        <div>
          <header>访问量：{count}</header>

          <AuthButton />

          <Switch>
            <PrivateRoute exact path="/">
              <Todo />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
            <AdminRoute path="/admin">
              <Admin />
            </AdminRoute>
          </Switch>

          {!chatVisible && (
            <button
              className={styles.startChat}
              onClick={() => setChatVisible(true)}
            >
              我要聊天
            </button>
          )}
          {chatVisible && <ChatRoom onCancel={() => setChatVisible(false)} />}
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
