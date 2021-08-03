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
import { Quote } from './types/Quote';

const App: FC = () => {
  const auth = useAuth();

  const [count, setCount] = useState(0);
  const [chatVisible, setChatVisible] = useState<boolean>(false);
  const [quote, setQuote] = useState<Quote | null>(null);

  const updateAndGetCount = async () => {
    http.post('/count').then();

    const { data } = await http.get<CountRsp>('/count');
    setCount(data.count);
  }

  const fetchQuote = async () => {
    const { data } = await http.get<Quote>('/quote/random')
    setQuote(data)
  }

  useEffect(() => {
    Promise.all([updateAndGetCount(), fetchQuote()]).then();
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
          <header>
            <div>访问量：{count}</div>
            {quote && <p>今日金句: <i>{quote.content} -- {quote.author}</i> </p>}
          </header>

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

          {!chatVisible && auth.token && (
            <button
              className={styles.startChat}
              onClick={() => setChatVisible(true)}
            >
              我要聊天
            </button>
          )}
          {chatVisible && auth.token && (
            <ChatRoom onCancel={() => setChatVisible(false)} />
          )}
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
