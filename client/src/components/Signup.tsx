import React, { useEffect, useRef, useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/Lock";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { RoutePaths } from "../App";
import { loginUserWithGoogle } from "./Login";
import { useAuth } from "../controller/userController/userContext"
import { last } from "lodash";


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
    height: "52vh",
    width: "40vh",
    margin: "auto",
    backgroundColor: theme.palette.background.paper,
  };

  const avatarStyle = { backgroundColor: theme.palette.primary.main };
  const btnstyle = { margin: "8px 0" };

  const signUpUser = async (
    email: React.MutableRefObject<any>,
    password: React.MutableRefObject<any>,
    username: React.MutableRefObject<any>,
    lastName: React.MutableRefObject<any>,
    firstName: React.MutableRefObject<any>,
    enqueueSnackbar: any,
    navigate: any
  ) => {
    try {
      console.log("-------------------------------")
  
      console.log(email.current.value.trim())
      console.log(password.current.value.trim())
      console.log("-------------------------------")
      // await createUserWithEmailAndPassword(
      //   auth,
      //   email.current.value,
      //   password.current.value
      // );
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
      <Paper elevation={10} style={paperStyle}>
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
          inputRef={firstName}
          label="FirstName"
          placeholder="Enter first name"
          fullWidth
          required
        />
        <TextField
          sx={{ margin: "8px 0" }}
          inputRef={lastName}
          label="LastName"
          placeholder="Enter last name"
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
                navigate(RoutePaths.HOME);
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
