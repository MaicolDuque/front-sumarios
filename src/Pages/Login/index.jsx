import React, { useState, useEffect, useCallback, useContext } from "react"
import axios from "axios";
import {
    AppBar,
    Toolbar,
    Box,
    makeStyles,
    Button,
    Container,
    Link,
} from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { useGoogleLogin } from "react-google-login";

//Context
import { ContextCreate } from "../../Auth/Context";


const barStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    toolbarHeader: {
        minHeight: "45px",
        background: "#196844"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const clientId = "647394978025-7tqu3po55pvko2aguma5iihggf05k8ms.apps.googleusercontent.com";


const Login = ({ children }) => {
    const classes = barStyles();
    const history = useHistory();
    const [openMenu, setOpenMenu] = useState(false);
    const [data, setData] = useState({
        email: ""
    })

    const { token, iniciarSesion } = useContext(ContextCreate);

    const submitData = useCallback(
        async () => {
            await axios(
                {
                    method: "POST",
                    baseURL: "http://localhost:9043",
                    url: "/api/users/verify",
                    data,
                },
            )
                .then((res) => {
                    console.log(res)
                    // if (res.data.msg) {
                    //     throw new Error(res.data.msg);
                    // }
                    // iniciarSesion(res.data.data);
                    // sessionStorage.setItem("token", res.data.data);
                })
                .catch((error) => {
                    if (!axios.isCancel(error)) {
                        console.error(error);
                    }
                });
        },
        [data, iniciarSesion]
    )

    const onSuccess = (res) => {
        console.log('Login Success: currentUser:', res.profileObj.email);
        setData(() => ({
            email: res.profileObj.email,
        }));
        submitData();
    }
    const onFailure = (res) => {
        console.log('Login failed: res:', res);
    }
    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        isSignedIn: true,
        accessType: 'offline',
    })

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolbarHeader}>
                    <Box paddingRight={1} className={classes.title}
                        onClick={() => {
                            history.push("");
                        }}>
                        <img
                            src={require("../../Images/logo.png")}
                            alt="Poli"
                            width="300px"
                        />

                    </Box>
                    <Button color="inherit"
                        onClick={() => {
                            signIn();
                        }}
                    >Iniciar sesión</Button>
                    <Button color="inherit"
                        onClick={() => {
                            history.push("/register");
                        }}>Registro</Button>
                </Toolbar>
            </AppBar>
            <main className={!openMenu ? classes.main : classes.mainMenuActive}>
                <Container>{children}</Container>
            </main>
        </div>
    );
}

export default Login;