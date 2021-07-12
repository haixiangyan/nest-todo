import * as React from "react"
import {FC, useContext} from "react"
import {RouteProps, Redirect, Route} from "react-router-dom"
import authContext from "../../contexts/authContext"

interface Props extends RouteProps{
}

const PrivateRoute: FC<Props> = (props) => {
  const { children, ...rest } = props;

  let auth = useContext(authContext);

  const renderRoute = ({location}: any) => {
    if (auth.user) {
      return children;
    }
    return <Redirect to={{ pathname: "/login", state: { from: location } }} />
  }

  return (
    <Route {...rest} render={renderRoute} />
  );
}

export default PrivateRoute
