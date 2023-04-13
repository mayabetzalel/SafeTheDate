import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/Lock";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { RoutePaths } from "../App";
import { loginUserWithGoogle } from "./Login";
import {useAuth} from "../hooks/userController/userContext";


const Signup = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const email: React.MutableRefObject<any> = useRef(null);
  const password: React.MutableRefObject<any> = useRef(null);
  const username: React.MutableRefObject<any> = useRef(null);
  const lastName: React.MutableRefObject<any> = useRef(null);
  const firstName: React.MutableRefObject<any> = useRef(null);
  const theme = useTheme();
  const paperStyle = {
    padding: 20,
    height: "57vh",
    width: "40vh",
    margin: "auto",
    backgroundColor: theme.palette.background.paper,
  };

  const avatarStyle = { backgroundColor: theme.palette.primary.main };
  const btnstyle = { margin: "8px 0" };

  const signUpUser = async (
    email: React.MutableRefObject<any>,
    username: React.MutableRefObject<any>,
    firstName: React.MutableRefObject<any>,
    lastName: React.MutableRefObject<any>,
    password: React.MutableRefObject<any>,

    enqueueSnackbar: any,
    navigate: any
  ) => {
    try {
      console.log("-------------------------------")

      console.log("email: " +email.current.value.trim())
      console.log("user: " + username.current.value.trim())
      console.log("pass: " +password.current.value.trim())
      console.log("-------------------------------")

      signUp(email.current.value.trim(), username.current.value.trim(), firstName.current.value.trim(),
      lastName.current.value.trim(), password.current.value.trim())
      enqueueSnackbar("Successful sign up!", { variant: "success" });
      navigate("/");
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <Grid>
      <Paper elevation={14} style={paperStyle}>
        <Grid>
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign Up</h2>
        </Grid>
        <TextField
          sx={{ margin: "8px 0" }}
          inputRef={email}
          label="Email"
          placeholder="Enter email"
          fullWidth
          required
        />
        <TextField
          sx={{ margin: "8px 0" }}
          inputRef={username}
          label="Username"
          placeholder="Enter username"
          fullWidth
          required
        />
        <TextField
          sx={{ margin: "8px 0" }}
          inputRef={firstName}
          label="First name"
          placeholder="Enter first name"
          fullWidth
          required
        />
        <TextField
          sx={{ margin: "8px 0" }}
          inputRef={lastName}
          label="Last name"
          placeholder="Enter last name"
          fullWidth
          required
        />
        <TextField
          sx={{ margin: "8px 0" }}
          inputRef={password}
          label="Password"
          placeholder="Enter password"
          type="password"
          fullWidth
          required
        />
        <Button
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={() => signUpUser(email, username, firstName, lastName, password, enqueueSnackbar, navigate)}
        >
          Sign up
        </Button>
        <GoogleButton
          label="Sign up with google"
          color="primary"
          style={{ width: "100%", margin: "8px 0" }}
          onClick={() =>
            loginUserWithGoogle(
              () => {
                enqueueSnackbar("Successful login!", { variant: "success" });
                navigate(RoutePaths.EVENTS);
              },
              (error: { message: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
                enqueueSnackbar(error.message, { variant: "error" });
              }
            )
          }
        />
        <Typography>
          {" "}
          Already have an account ?<Link href="/Login">Login</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Signup;
