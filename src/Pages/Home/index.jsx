import React, { useState } from "react"
import {
    AppBar,
    Toolbar,
    Box,
    makeStyles,
    Button,
    Container,
    IconButton,
    Drawer,
    useTheme,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from "react-router-dom";
import { useGoogleLogout } from "react-google-login"
import clsx from 'clsx';
import { grey } from '@material-ui/core/colors';

import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import DraftsIcon from '@material-ui/icons/Drafts';
import SubjectIcon from '@material-ui/icons/Subject';
import CreateIcon from '@material-ui/icons/Create';
import ListAltIcon from '@material-ui/icons/ListAlt';

const drawerWidth = 240;
const barStyles = makeStyles((theme) => ({
    rootList: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: "#196844",
        marginTop: "13.5px"
    },
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
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        width: drawerWidth,
        background: "#196844",
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
        background: "#196844",
    },
    nested: {
        paddingLeft: theme.spacing(4),
        paddingBottom: theme.spacing(2)
    },
    listTitle: {
        backgroundColor: "#FFFFFF",
    },
    listSubtitle: {
        backgroundColor: "#E1E7E2",
    },
}));

const clientId = "647394978025-7tqu3po55pvko2aguma5iihggf05k8ms.apps.googleusercontent.com";

const Menu = ({ children }) => {
    const classes = barStyles();
    const history = useHistory();
    const [openMenu, setOpenMenu] = useState(false);
    const onLogoutSuccess = (res) => {
        alert('Logged out Successfully');
    }

    const onFailure = () => {
        console.log('Handle failure cases');
    }

    const { signOut } = useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onFailure
    })
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const theme = useTheme();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}>
                <Toolbar className={classes.toolbarHeader}>
                    <IconButton
                        color="inherit"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}>
                        <MenuIcon />
                    </IconButton>
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
                    <Button color="inherit"
                    >Maria Camila Corrales</Button>
                    <Button color="inherit"
                        onClick={() => {
                            signOut();
                            history.push("/");
                        }}>Cerrar sesión</Button>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <IconButton
                    style={{ color: grey[50] }}
                    onClick={handleDrawerClose}
                    className={classes.rootList}
                >
                    <MenuIcon color="#FFFFFF" />
                </IconButton>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    className={classes.rootList}
                >
                    <ListItem button className={classes.listTitle}>
                        <ListItemText primary="Sumarios" />
                    </ListItem>
                    <List component="div" disablePadding className={classes.listTitle}>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <SubjectIcon />
                            </ListItemIcon>
                            <ListItemText secondary="Mis sumarios" />
                        </ListItem>
                        <ListItem button className={classes.nested}>
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
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <PermContactCalendarIcon />
                            </ListItemIcon>
                            <ListItemText secondary="Mis contactos" />
                        </ListItem>
                        <ListItem button className={classes.nested}>
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
                                <AccountBoxIcon />
                            </ListItemIcon>
                            <ListItemText secondary="Información del usuario" />
                        </ListItem>
                    </List>
                </List>
            </Drawer>
            <main className={!openMenu ? classes.main : classes.mainMenuActive}>
                <Container>{children}</Container>
            </main>
        </div>
    );
}

export default Menu;