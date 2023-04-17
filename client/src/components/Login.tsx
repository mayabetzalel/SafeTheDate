import React, { useRef } from "react";
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
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { RoutePaths } from "../App";
import GoogleButton from "react-google-button";
import {useAuth} from "../hooks/userController/userContext";


export const loginUserWithGoogle = async (
  onSuccess: (user: any) => void,
  onError: (error: any) => void
) => {
  try {
    // const user = await signInWithGoogle();
    // onSuccess(user);
  } catch (error: any) {
    onError(error);
  }
};

const Login = () => {
  const { signIn } = useAuth();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const email: React.MutableRefObject<any> = useRef(null);
  const password: React.MutableRefObject<any> = useRef(null);
  const paperStyle = {
    padding: 20,
    height: "52vh",
    width: "40vh",
    margin: "auto",
    backgroundColor: theme.palette.background.paper,
  };
  const btnstyle = { margin: "8px 0" };

  const loginUser = async (
    email: React.MutableRefObject<any>,
    password: React.MutableRefObject<any>,
    // onSuccess: (user: User) => void,
    onSuccess: (user: any) => void,
    onError: (error: any) => void
  ) => {
    try {
      signIn(email.current.value.trim(), password.current.value.trim())
      // const user = await signInWithEmailAndPassword(
      //   email.current.value,
      //   password.current.value
      // );
      // if (user == null) throw new Error();
      // onSuccess(user);
    } catch (error: any) {
      onError(error);
    }
  };


  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid>
          <Avatar sx={{ backgroundColor: theme.palette.primary.main }}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
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
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          style={btnstyle}
          onClick={() =>
            loginUser(
              email,
              password,
              () => {
                enqueueSnackbar("Successful login!", { variant: "success" });
                navigate(RoutePaths.EVENTS);
              },
              (error) => {
                enqueueSnackbar(error.message, { variant: "error" });
              }
            )
          }
        >
          Sign in
        </Button>
        <GoogleButton
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
          Dont you have an account ?<Link href="/Signup">Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
