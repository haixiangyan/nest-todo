import React, {FC} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Todo from "./pages/Todo"
import Login from "./pages/Login"
import authContext from "./contexts/authContext"
import useProvideAuth from "./hooks/useProvideAuth"
import AuthButton from "./Components/AuthButton"
import PrivateRoute from "./Components/PrivateRoute"

const App: FC = () => {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      <Router>
        <div>
          <AuthButton />

          <Switch>
            <PrivateRoute exact path="/">
              <Todo />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
    </authContext.Provider>
  );
};

export default App;
