import React, { useState, useContext } from "react"
import {
    AppBar,
    Toolbar,
    Box,
    makeStyles,
    Button,
    Container,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
} from '@material-ui/core';
import { useHistory, Link } from "react-router-dom";
import { useGoogleLogout } from "react-google-login"

import FaceIcon from '@material-ui/icons/Face';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import DraftsIcon from '@material-ui/icons/Drafts';
import SubjectIcon from '@material-ui/icons/Subject';
import CreateIcon from '@material-ui/icons/Create';
import ListAltIcon from '@material-ui/icons/ListAlt';

import Login from '../Login/index'

//Context
import { ContextCreate } from "../../Auth/Context";

const drawerWidth = 240;
const barStyles = makeStyles((theme) => ({
    rootList: {
        width: '100%',
        maxWidth: 360,
        marginTop: "90px"
    },
    root: {
        flexGrow: 1,
    },
    toolbarHeader: {
        minHeight: "45px",
        background: "#196844"
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        zIndex: theme.zIndex.drawer + 1,
    },
    nested: {
        paddingLeft: theme.spacing(4),
        paddingBottom: theme.spacing(2)
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
}));


const clientId = "647394978025-7tqu3po55pvko2aguma5iihggf05k8ms.apps.googleusercontent.com";



const Menu = ({ children }) => {
    const classes = barStyles();
    const history = useHistory();
    const [openMenu] = useState(false);
    const { token } = useContext(ContextCreate);
    const { cerrarSesion } = useContext(ContextCreate);

    const onLogoutSuccess = (res) => {
        cerrarSesion()
    }

    const onFailure = () => {
        console.log('Handle failure cases');
    }

    const { signOut } = useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onFailure
    })

    const buttonHome = () => {
        return (
            <>
                <Button color="inherit"
                    onClick={() => {
                        signOut();
                    }}>Cerrar sesión</Button>
            </>
        )
    }

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolbarHeader}>
                    <Box paddingRight={1} className={classes.title}
                        onClick={() => {
                            history.push("/home");
                        }}>
                        <img
                            src={require("../../Images/logo.png")}
                            alt="Poli"
                            width="300px"
                        />
                    </Box>
                    {token ? (buttonHome()) : <Login />}
                </Toolbar>
            </AppBar>
            {token ? (<Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerContainer}>
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        className={classes.rootList}
                    >
                        <ListItem button className={classes.listTitle}>
                            <ListItemText primary="Sumarios" />
                        </ListItem>
                        <List component="div" disablePadding className={classes.listTitle}>
                            <Link to="summaries" style={{textDecoration: "none"}}>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <SubjectIcon />
                                    </ListItemIcon>
                                    <ListItemText secondary="Mis sumarios" />
                                </ListItem>
                            </Link>
                            <ListItem
                                button
                                className={classes.nested}
                                onClick={() => {
                                    history.push("/search");
                                }}>
                                <ListItemIcon>
                                    <CreateIcon />
                                </ListItemIcon>
                                <ListItemText secondary="Crear sumarios" />
                            </ListItem>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText secondary="Historial de envíos" />
                            </ListItem>
                        </List>
                        <Divider />
                        <ListItem button className={classes.listTitle}>
                            <ListItemText primary="Contactos" />
                        </ListItem>
                        <List component="div" disablePadding className={classes.listTitle}>
                            <ListItem button className={classes.nested}
                                onClick={() => {
                                    history.push("/contact");
                                }}>
                                <ListItemIcon>
                                    <PermContactCalendarIcon />
                                </ListItemIcon>
                                <ListItemText secondary="Mis contactos" />
                            </ListItem>
                            <ListItem button className={classes.nested}
                                onClick={() => {
                                    history.push("/contactList");
                                }}>
                                <ListItemIcon>
                                    <ListAltIcon />
                                </ListItemIcon>
                                <ListItemText secondary="Listas de contactos" />
                            </ListItem>
                        </List>
                        <Divider />
                        <ListItem button className={classes.listTitle}>
                            <ListItemText primary="Perfil" />
                        </ListItem>
                        <List component="div" disablePadding className={classes.listTitle}>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <FaceIcon />
                                </ListItemIcon>
                                <ListItemText secondary="Información de perfil" />
                            </ListItem>
                        </List>
                    </List>
                </div>

            </Drawer>) : null}

            <main className={!openMenu ? classes.main : classes.mainMenuActive}>
                <Container>{children}</Container>
            </main>
        </div>
    );
}

export default Menu;