import React, { useContext } from 'react';
import { makeStyles, Typography, Paper, Box, Button, GridList, GridListTile, GridListTileBar, } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import 'animate.css'

import { ContextCreate } from '../../Auth/Context';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(50),
    height: theme.spacing(55),
  },
  gridList: {
    flexWrap: 'wrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    animation: 'bounce',
    justifyContent: 'center'
  },
  item: {
    minWidth: '300px',
    width: '50%',
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
}));

export default function Elements() {
  const { token, validationRegister } = useContext(ContextCreate);
  const classes = useStyles();
  const action = (
    <Button color="secondary" size="small">
      Busca artículos científicos
    </Button>
  );
  return (
    <>
      {
        token || validationRegister || window.location.pathname === "/register" ?
          null
          :
          <Grid container spacing={3} direction="column">
            <Grid item xs={12}>
              <Typography variant="h3" component="h2" gutterBottom align="center" style={{ color: "#196844" }}>Gestión de sumarios</Typography>
              <Typography variant="subtitle1" component="h2" gutterBottom align="center" style={{ color: "#196844" }}>Aplicación para revistas en la que podrás...</Typography>
            </Grid>
            <div className={classes.root}>
              <GridList cellHeight={250} className={classes.gridList}>
                <GridListTile className={classes.item}>
                  <img src={require("../../Images/contact.jpg")} alt="Contactos" />
                  <GridListTileBar title={"Gestionar contactos"} />
                </GridListTile>
                <GridListTile className={classes.item}>
                  <img src={require("../../Images/search.jpg")} alt="Articulos científicos" />
                  <GridListTileBar title={"Buscar artículos científicos"} />
                </GridListTile>
              </GridList>
              <br />
              <GridList cellHeight={250} className={classes.gridList}>
                <GridListTile className={classes.item}>
                  <img src={require("../../Images/summary.jpg")} alt="Sumarios" />
                  <GridListTileBar title={"Crear sumarios"} />
                </GridListTile>
                <GridListTile className={classes.item}>
                  <img src={require("../../Images/fav.jpg")} alt="Enviar sumarios" />
                  <GridListTileBar title={"Enviar sumarios"} />
                </GridListTile>
              </GridList>
            </div>
          </Grid>
      }
    </>
  )
}