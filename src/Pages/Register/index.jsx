import React, { useState, useRef } from 'react'
import { TextField, Grid, Paper, Typography, Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";

import { postSolicitude } from "../../services/usersService"
import { createContactList } from "../../services/contactsService"

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



const Register = ({ enqueueSnackbar }) => {
  const enqueueSnackbarRef = useRef(enqueueSnackbar);
  const classes = infoCorpStyles();
  const [data, setData] = useState({
    mg_name: "",
    email: "",
    mg_urlMagazine: "",
  })
  const [dataContactList, setDataContactList] = useState({
    name: "Todos",
    description: "Lista que contiene todos los contactos",
    mg_contacts: []
  })
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }
  const submitData = () => {
    postSolicitude(data)
      .then((res) => {
        const idUser = res.data.result._id
        const infoSend = {
          id_user: idUser,
          mg_contact_lists: dataContactList
        }
        if (res.data.caution) {
          enqueueSnackbarRef.current(res.data.msg, {
            variant: "warning",
          });
        } else {
          createContactList(infoSend)
            .then((contactList) => {
              enqueueSnackbarRef.current(res.data.msg, {
                variant: "success",
              });
            })
            .catch(result => {
              enqueueSnackbarRef.current("No se pudo enviar la solicitud.", {
                variant: "error",
              });
            })
        }
      })
      .catch(result => {
        enqueueSnackbarRef.current("No se pudo enviar la solicitud.", {
          variant: "error",
        });
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

export default withSnackbar(Register)