import * as React from 'react';
import { useRef } from "react";
import LockOutlinedIcon from "@mui/icons-material/Lock";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { RoutePaths } from "../App";
import GoogleButton from "react-google-button";
import { useAuth } from "../hooks/userController/userContext";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const Signup = () => {
  const email: React.MutableRefObject<any> = useRef(null);
  const password: React.MutableRefObject<any> = useRef(null);
  const { signUp } = useAuth();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      signUp(
        data.get('email') as string, data.get('username') as string, 
        data.get('firstName') as string, data.get('lastName') as string,
        data.get('password') as string
        )
        enqueueSnackbar("Successful sign up!", { variant: "success" });
        navigate("/");
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main"  sx={{ height: '100vh' }} >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/c5_eQi4rrjA)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}  square
         sx={{
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[100] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              m: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h1>Lets Start The Party !</h1>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                id="username"
                label="Username"
                name="username"
                placeholder="Enter username"
                autoComplete="username"
                autoFocus
              />
              <Grid container spacing={2}>
                <Grid item xs>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="First name"
                    placeholder="Enter first name"
                    autoComplete="first name"
                    autoFocus
                  />
                </Grid>
                <Grid item>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    placeholder="Enter last name"
                    autoComplete="last name"
                    autoFocus
                  />
                </Grid>
              </Grid>
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
              
              <GoogleButton
                type="light"
                style={{ width: "100%", margin: "4px 0", color:"inherit" }}
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
              <Grid item xs>
                  <Link href="#" variant="body1" underline="hover" color="inherit">
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/Login" underline="hover" color="inherit" variant="body1">
                    {"Already have an account? Sign In"}
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

export default Signup;