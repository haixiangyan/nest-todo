import * as React from "react"
import { FC, useContext } from 'react';
import {RouteProps, Redirect, Route} from "react-router-dom"
import AuthContext from '../../contexts/AuthContext';

interface Props extends RouteProps{
}

const PrivateRoute: FC<Props> = (props) => {
  const { children, ...rest } = props;

  const { token } = useContext(AuthContext);

  const renderRoute = ({location}: any) => {
    if (!token) {
      return <Redirect to={{ pathname: "/login", state: { from: location } }} />
    }

    return children;
  }

  return (
    <Route {...rest} render={renderRoute} />
  );
}

export default PrivateRoute
