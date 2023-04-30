import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SnackbarProvider } from "notistack";
import theme from "./overrieds/MuiTheme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { UserProvider } from "./hooks/userController/userProvider";
import GraphqlClientProvider from "./hooks/GraphqlClientProvider/GraphqlClientProvider";
import "./index.css";
import EventProvider from "./hooks/context/EventContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <GraphqlClientProvider>
    <EventProvider>
      <UserProvider>
        <SnackbarProvider maxSnack={3}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </SnackbarProvider>
      </UserProvider>
    </EventProvider>
    </GraphqlClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
