import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

function PrivateRoute(props: RouteProps) {
  // const user = useAppSelector(selectUser);

  const user = localStorage.getItem('user');

  return <Route {...props}>{user ? props.children : <Redirect to="/" />}</Route>;
}

export default PrivateRoute;
