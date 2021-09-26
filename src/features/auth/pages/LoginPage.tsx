import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react';
import { useHistory } from 'react-router';
import { useAppDispatch } from '../../../app/hooks';
import { authActions } from '../authSlice';
import LoginForm, { LoginUser } from '../components/LoginForm';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
}));

function LoginPage() {
  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleLoginSubmission = async (
    isLoggedIn: boolean,
    user: LoginUser,
    callback: (error: string) => void
  ) => {
    let url = '';
    if (isLoggedIn) {
      // Handle Login
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCe51mqcx5tZ-LwAi9N7oOWVN2CRbKW1nk';
    } else {
      // Handle Sign up
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCe51mqcx5tZ-LwAi9N7oOWVN2CRbKW1nk';
    }
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
        returnSecureToken: true,
      }),
    });
    if (res.ok) {
      const data = await res.json();

      const expirationDuration = +data.expiresIn;
      const expirationTime = new Date(new Date().getTime() + expirationDuration * 1000).toISOString();
      dispatch(
        authActions.setUser({
          token: data.idToken,
          isLoggedIn: true,
          expirationTime: expirationTime,
        })
      );
    } else {
      const data = await res.json();
      let error = 'Failed to sign up';
      if (data && data.error && data.error.message) {
        error = data.error.message;
        callback(error);
      }
      throw Error('Failed to sign up.');
    }

    // Redirect to admin page when signIn/signUp successfully!!!
    history.push('/admin');
  };

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <LoginForm onSubmit={handleLoginSubmission} initialValues={initialValues} />
    </Box>
  );
}

export default LoginPage;
