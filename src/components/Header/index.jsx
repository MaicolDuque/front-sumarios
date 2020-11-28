import React, { useContext } from 'react';
import { AppBar, Box, Button, IconButton, makeStyles, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useGoogleLogout } from 'react-google-login';
import { useHistory } from "react-router-dom";

import config from '../../config'
import Login from '../../pages/Login';
import { ContextCreate } from '../../Auth/Context';

const useStyles = makeStyles((theme) => ({
  customHeader: {
    zIndex: 2000
  },
  toolbarHeader: {
    minHeight: "45px",
    background: "#196844"
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
}));
export default function Header({toggle}) {
  const { token, cerrarSesion, enableImgInit } = useContext(ContextCreate);
  const classes = useStyles()
  const history = useHistory()
  const onLogoutSuccess = (res) => {
    cerrarSesion()
  }

  const onFailure = () => {
    console.log('Handle failure cases');
  }

  const { signOut } = useGoogleLogout({
    clientId: config.google.clientID,
    onLogoutSuccess,
    onFailure
  })

  const changeActionUrl = ()=>{
    if(token){
      history.push("/home")
    }else{
      history.push("/")
      enableImgInit()
    }
  }

  const buttonHome = () => {
    return (
      <Button color="inherit" onClick={() => signOut()}>Cerrar sesión</Button>
    )
  }
  return (
    <AppBar position="fixed" className={classes.customHeader}>
      <Toolbar className={classes.toolbarHeader}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => toggle()}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Box paddingRight={1} className={classes.title} onClick={() => {changeActionUrl()}}>
          <img
            src={require("../../Images/logo.png")}
            alt="Poli"
            width="300px"
          />
        </Box>
        {token ? (buttonHome()) : <Login />}
      </Toolbar>
    </AppBar>
  )
}