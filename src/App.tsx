import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { useAppDispatch, useAppSelector } from './app/hooks';
import PrivateRoute from './components/Common/PrivateRoute';
import AdminPage from './components/Layout/AdminPage';
import { authActions, selectUser } from './features/auth/authSlice';
import LoginPage from './features/auth/pages/LoginPage';

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  useEffect(() => {
    // Check localStorage to know whether has User or not
    const user = localStorage.getItem('user');
    if (user) {
      const { email } = JSON.parse(user);
      dispatch(
        authActions.setUser({
          email,
          token: '1227217332',
          isLoggedIn: true,
        })
      );
    }
  }, [dispatch]);

  return (
    <Switch>
      <Route path="/" exact>
        {user ? <Redirect to="/admin" /> : <LoginPage />}
      </Route>
      <PrivateRoute path="/admin">
        <AdminPage />
      </PrivateRoute>
    </Switch>
  );
}

export default App;
