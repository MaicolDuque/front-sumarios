import React, { useState, useRef } from 'react'
import { TextField, Grid, Paper, Typography, Button, Box, TableCell, TableRow, FormHelperText } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";

import { postSolicitude } from "../../services/usersService"
import { createContactList } from "../../services/contactsService"

const infoCorpStyles = makeStyles((theme) => ({
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
  },
  large: {
    width: theme.spacing(50),
    height: theme.spacing(50),
    align: "center",
  },
}));



const Register = ({ enqueueSnackbar }) => {
  const enqueueSnackbarRef = useRef(enqueueSnackbar);
  const classes = infoCorpStyles();
  const [data, setData] = useState({
    mg_name: "",
    email: "",
    mg_urlMagazine: "",
  })
  const [alertError, setAlertError] = useState(false)
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
  const clear = () =>{
    setData({...data, mg_name:"", email:"", mg_urlMagazine:""})
  }
  const submitData = () => {
    if (data.mg_name && data.email && data.mg_urlMagazine) {
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
                clear()
                setAlertError(false)
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

    } else {
      setAlertError(true)
    }
  }

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h3" component="h2" gutterBottom align="center" style={{ color: "#196844" }}>¡Regístrate!</Typography>
      </Grid>

      <Grid>
        <center>
          <Box component={Paper}>
            <TableRow>
              <TableCell>
                <TextField required id="txt_magazine_name" name="mg_name" label="Nombre de la Revista" error={alertError && !data.mg_name}
                  variant="outlined" value={data.mg_name} onChange={handleInputChange} /><p />
                <TextField required id="txt_magazine_email" name="email" label="Correo de la Revista" error={alertError && !data.email}
                  variant="outlined" value={data.email} onChange={handleInputChange} /><p />
                <TextField required id="txt_magazine_url" name="mg_urlMagazine" label="URL de la Revista" error={alertError && !data.mg_urlMagazine}
                  variant="outlined" value={data.mg_urlMagazine} onChange={handleInputChange} /><p />
                {alertError && <FormHelperText>Todos los campos son requeridos.</FormHelperText>}<p />
                <Button type="submit" className={classes.color} variant="contained" id="btn_send"
                  name="send" fullWidth color="primary" onClick={() => { submitData() }}>Enviar</Button>
              </TableCell>
              <TableCell><img src={require("../../Images/register.jpg")} className={classes.large} /></TableCell>
            </TableRow>
          </Box>
        </center>
      </Grid>
    </>
  )
}

export default withSnackbar(Register)