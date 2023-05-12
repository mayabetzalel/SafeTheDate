/* eslint-disable no-debugger */
import * as React from "react";
import { useRef, useState, useEffect } from "react";
import LockOutlinedIcon from "@mui/icons-material/Lock";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { RoutePaths } from "../App";
import { useAuth } from "../hooks/userController/userContext";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const email: React.MutableRefObject<any> = useRef(null);
  const password: React.MutableRefObject<any> = useRef(null);
  const { signIn } = useAuth();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { logWithGoogle } = useAuth();

  const loginUserWithGoogle = useGoogleLogin({
    onSuccess: (codeResponse: any) => {
      logWithGoogle(codeResponse.access_token);
      enqueueSnackbar("Successful login!", { variant: "success" });
      navigate(RoutePaths.EVENTS);
    },
    onError: (error: any) => {
      navigate("/Login");
      enqueueSnackbar(error.message, { variant: "error" });
      console.log("Login Failed:", error);
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    try {
      await signIn(data.get("email") as string, data.get("password") as string);
      console.log("here again");
      enqueueSnackbar("Successful log in!", { variant: "success" });
      navigate("/");
    } catch (error: any) {
      enqueueSnackbar("Could not log in " + error.message, {
        variant: "error",
      });
      navigate("/login");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/PgP9L5CWI38)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1>The Party Begins Here!</h1>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                inputRef={email}
                label="Email Address"
                name="email"
                placeholder="Enter email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                inputRef={password}
                name="password"
                label="Password"
                type="password"
                placeholder="Enter password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <GoogleLogin onSuccess={() => loginUserWithGoogle()} />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link
                    href="#"
                    variant="body1"
                    underline="hover"
                    color="inherit"
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="/Signup"
                    underline="hover"
                    color="inherit"
                    variant="body1"
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
