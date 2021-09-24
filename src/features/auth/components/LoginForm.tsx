import {
  Alert,
  Button,
  CircularProgress,
  Link,
  Snackbar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useState } from "react";
import InputField from "../../../components/FormField/InputField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";

const useStyles = makeStyles({
  root: {},
  form: {
    width: "100%",
    maxWidth: "500px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "100px",
  },
});

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(8)
    .matches(/[a-zA-Z]/),
});

export interface LoginUser {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginFormProps {
  onSubmit: (
    isLoggedIn: boolean,
    user: LoginUser,
    callback: (error: string) => void
  ) => void;
  initialValues: LoginUser;
}

function LoginForm({ onSubmit, initialValues }: LoginFormProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [error, setError] = useState("");
  const classes = useStyles();

  const { handleSubmit, control, reset, watch, formState } = useForm<LoginUser>(
    {
      defaultValues: initialValues,
      resolver: yupResolver(schema),
    }
  );

  const switchLoginMode = () => {
    reset(initialValues);
    setIsLoggedIn((preState) => !preState);
  };

  const handleError = (error: string) => {
    reset({
      ...initialValues,
      firstName: watch("firstName"),
      lastName: watch("lastName"),
    });

    let errorMessage = error;
    if (error === "EMAIL_EXISTS") {
      errorMessage = "Email existed, try again!!";
    }
    if (error === "INVALID_PASSWORD") {
      errorMessage = "Invalid password, try again!!";
    }
    setError(errorMessage);
  };

  const handleLoginFormSubmit = async (data: LoginUser) => {
    const { email, password } = data;
    try {
      if (isLoggedIn) {
        // Login
        await onSubmit(isLoggedIn, { email, password }, handleError);
      } else {
        // Sign up
        await onSubmit(isLoggedIn, data, handleError);
      }
    } catch (error) {}
  };

  return (
    <Box className={classes.form}>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setError("")}
      >
        <Alert
          onClose={() => setError("")}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>

      <Typography align="left" variant="h4" mb={3}>
        {isLoggedIn ? "Login" : "Sign up"}
      </Typography>

      {/* Form */}
      <form onSubmit={handleSubmit(handleLoginFormSubmit)}>
        {!isLoggedIn && (
          <Box sx={{ display: "flex", gap: "20px" }}>
            <InputField name="firstName" control={control} label="First Name" />
            <InputField name="lastName" control={control} label="Last Name" />
          </Box>
        )}
        <Box>
          <InputField name="email" control={control} label="Email" />
        </Box>
        <Box>
          <InputField
            type="password"
            name="password"
            control={control}
            label="Password"
          />
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ marginTop: "15px" }}
        >
          {formState.isSubmitting && <CircularProgress color="success" />}
          {isLoggedIn ? "Login" : "Sign up"}
        </Button>

        <Link
          sx={{
            marginTop: "20px",
            display: "block",
            textAlign: "end",
            cursor: "pointer",
          }}
          onClick={switchLoginMode}
        >
          {isLoggedIn ? "Sign up" : "Login"}
        </Link>
      </form>
    </Box>
  );
}

export default LoginForm;
