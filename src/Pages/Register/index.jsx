import React from 'react'
import { TextField, Grid, Paper, Typography, Button } from '@material-ui/core';
import { makeStyles, ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { green } from '@material-ui/core/colors';

const infoCorpStyles = makeStyles({
  paper: {
    padding: "20px",
    marginLeft: "350px",
    marginRight: "350px",
    marginTop: "70px",
  },
  title: {
    paddingBottom: "30px"
  },
  margin: {
    marginLeft: "132px",
    marginRight: "135px",
  },
  marginButton: {
    marginLeft: "200px",
    marginRight: "200px",
  },
  color: {
    background: "#196844"
  }
});



export default function Register() {
  const classes = infoCorpStyles();
  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid className={classes.title} item xs={12} direction="row">
        <Typography variant="h4" align="center">
          ¡Regístrate!
          </Typography>
      </Grid>
      <Grid container direction="row" spacing={4} className={classes.margin}>
        <Grid item sm={12} md={6} lg={6} xl={6} >
          <TextField
            required
            label="Nombre de la Revista"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={4} className={classes.margin}>
        <Grid item sm={12} md={6} lg={6} xl={6}>
          <TextField
            required
            label="Correo de la Revista"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={4} className={classes.margin}>
        <Grid item sm={12} md={6} lg={6} xl={6}>
          <TextField
            required
            label="URL de la Revista"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={4} className={classes.margin}>
        <Grid item sm={12} md={6} lg={6} xl={6}>
            <Button
              className={classes.color}
              variant="contained"
              fullWidth
              color="primary">
              Enviar
            </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}