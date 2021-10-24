// Libaray
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

// Global Context
import { UserContext } from "../../context/UserContext";

function PrivateRoute({ component: Component, ...rest }) {
  const [state] = useContext(UserContext);
  return (
    <>
      <Route {...rest} render={(props) => (state.isLogin ? <Component {...props} /> : <Redirect to="/" />)} />
    </>
  );
}
export default PrivateRoute;
