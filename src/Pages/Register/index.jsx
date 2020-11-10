import React, { useState } from 'react'
import { TextField, Grid, Paper, Typography, Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const infoCorpStyles = makeStyles({
  paper: {
    padding: "20px",
    marginLeft: "350px",
    marginRight: "350px",
    marginTop: "155px",
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
  const [data, setData] = useState({
    mg_name: "",
    email: "",
    mg_urlMagazine: "",
  })
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }
  const submitData = () => {
    axios(
      {
        method: "POST",
        baseURL: `${process.env.REACT_APP_PROTOCOL_BACKEND}://${process.env.REACT_APP_HOST_BACKEND}${process.env.REACT_APP_PORT_BACKEND}`,
        url: `${process.env.REACT_APP_API_CREATE_USER}`,
        data,
      }
    )
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log("error")
      });

    axios(
      {
        method: "POST",
        baseURL: `${process.env.REACT_APP_PROTOCOL_BACKEND}://${process.env.REACT_APP_HOST_BACKEND}${process.env.REACT_APP_PORT_BACKEND}`,
        url: `${process.env.REACT_APP_API_SEND_EMAIL}`,
        data,
      }
    )
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log("error")
      });
  }

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
            id="txt_magazine_name"
            name="mg_name"
            label="Nombre de la Revista"
            variant="outlined"
            fullWidth
            value={data.mg_name}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={4} className={classes.margin}>
        <Grid item sm={12} md={6} lg={6} xl={6}>
          <TextField
            required
            id="txt_magazine_email"
            name="email"
            label="Correo de la Revista"
            variant="outlined"
            fullWidth
            value={data.email}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={4} className={classes.margin}>
        <Grid item sm={12} md={6} lg={6} xl={6}>
          <TextField
            required
            id="txt_magazine_url"
            name="mg_urlMagazine"
            label="URL de la Revista"
            variant="outlined"
            fullWidth
            value={data.mg_urlMagazine}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={4} className={classes.margin}>
        <Grid item sm={12} md={6} lg={6} xl={6}>
          <Button
            type="submit"
            className={classes.color}
            variant="contained"
            id="btn_send"
            name="send"
            fullWidth
            color="primary"
            onClick={submitData}
          >
            Enviar
            </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}