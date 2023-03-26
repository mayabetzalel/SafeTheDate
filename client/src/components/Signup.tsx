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

const signUpUser = async (
  email: React.MutableRefObject<any>,
  password: React.MutableRefObject<any>,
  enqueueSnackbar: any,
  navigate: any
) => {
  try {
    // await createUserWithEmailAndPassword(
    //   auth,
    //   email.current.value,
    //   password.current.value
    // );
    enqueueSnackbar("Successful sign up!", { variant: "success" });
    navigate("/");
  } catch (error: any) {
    enqueueSnackbar(error.message, { variant: "error" });
  }
};
const Signup = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const email: React.MutableRefObject<any> = useRef(null);
  const password: React.MutableRefObject<any> = useRef(null);
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
          onClick={() => signUpUser(email, password, enqueueSnackbar, navigate)}
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
              (error) => {
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
