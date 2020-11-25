import React, { useContext, useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom';
import { ContextCreate } from '../../Auth/Context';

export default function CustomRoute(props) {
  const [returnedRoute, setReturnedRoute] = useState(null);
  const { infoUser } = useContext(ContextCreate);

  useEffect(() => {
    switch (props.condition) {
      case "admin":
        return setReturnedRoute(
          infoUser.mg_role === "admin" ? (
            <Route {...props} />
          ) : (
              <Redirect to="/" />
            )
        );
      case "editor":
        return setReturnedRoute(
          infoUser.mg_role === "editor" ? (
            <Route {...props} />
          ) : (
              <Redirect to="/" />
            )
        );
      default:
        return setReturnedRoute(<Route {...props} />);
    }
  }, [infoUser]);
  return <>{returnedRoute}</>;
};