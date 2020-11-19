import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline } from "@material-ui/core";
import Router from "./Router";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
    <>
        <CssBaseline />
        <SnackbarProvider>
            <Router />
        </SnackbarProvider>

    </>,
    document.getElementById("root")
);

