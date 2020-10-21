import React, { useState } from "react"
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


const Menu = ({ children }) => {
    const classes = barStyles();
    const history = useHistory();
    const [openMenu, setOpenMenu] = useState(false);


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
                    <Button color="inherit">Iniciar sesión</Button>
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

export default Menu;