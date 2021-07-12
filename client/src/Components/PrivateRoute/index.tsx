import * as React from "react"
import {FC} from "react"
import {RouteProps, Redirect, Route} from "react-router-dom"
import useAuth from "../../hooks/useAuth"

interface Props extends RouteProps{
}

const PrivateRoute: FC<Props> = (props) => {
  const { children, ...rest } = props;

  const auth = useAuth();

  const renderRoute = ({location}: any) => {
    if (!auth.token) {
      return <Redirect to={{ pathname: "/login", state: { from: location } }} />
    }

    return children;
  }

  return (
    <Route {...rest} render={renderRoute} />
  );
}

export default PrivateRoute
