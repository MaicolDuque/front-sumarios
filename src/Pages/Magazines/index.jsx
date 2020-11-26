import React, { useContext, useEffect, useState, useRef } from 'react'
import { Button, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, DialogContentText, TextField, FormHelperText } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';

import { ContextCreate } from '../../Auth/Context';
import { getAllUsersMagazine } from '../../services/usersService'
import { format } from 'date-fns'
import { useHistory } from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Spinner from '../../components/Spinner';
import { withSnackbar } from "notistack";

import Modal from '../../components/Modal';
import { postSolicitude } from "../../services/usersService"
import { createContactList } from "../../services/contactsService"

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  formControl: {
    width: '100%'
  }
}));

const Magazines = ({ enqueueSnackbar }) => {
  const enqueueSnackbarRef = useRef(enqueueSnackbar);
  const classes = useStyles();
  const history = useHistory();
  const [cargando, setCargando] = useState(false);
  const [refresh, setRefresh] = useState(false)
  const { token } = useContext(ContextCreate);
  const [usersMagazine, setUsersMagazine] = useState([])
  const [modal, setModal] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [addMagazine, setAddMagazine] = useState({
    mg_name: "",
    email: "",
    mg_urlMagazine: "",
    mg_status: true
  })
  const [dataContactList, setDataContactList] = useState({
    name: "Todos",
    description: "Lista que contiene todos los contactos",
    mg_contacts: []
  })

  useEffect(() => {
    setCargando(true)
    getAllUsersMagazine(token)
      .then(info => { setUsersMagazine(info.data); setCargando(false) })
      .catch(error => console.log(error))
  }, [refresh])

  const verVolumes = (id, name, url) => {
    localStorage.setItem('info_magazine', JSON.stringify({ id, name, url }))
    history.push('/magazines/volumes')
  }
  const openModal = () => {
    setModal(true)
  }
  const cerrarModal = () => {
    setModal(false)
    setAlertError(false)
  }
  const saveMagazine = () => {
    if (addMagazine.mg_name && addMagazine.email && addMagazine.mg_urlMagazine) {
      postSolicitude(addMagazine)
        .then(res => {
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
                setRefresh(!refresh)
                setAlertError(false)
              })
              .catch(result => {
                enqueueSnackbarRef.current("No se pudo enviar la solicitud.", {
                  variant: "error",
                });
              })
          }
        })
        .catch(res => {

        })
        cerrarModal()
    }else{
      setAlertError(true)
    }
  }


  const seeSummaries = (id, name, url) => {
    localStorage.setItem('info_magazine', JSON.stringify({ id, name, url }))
    history.push('/magazines/summaries')
  }

  return (
    <>
      { cargando && <Spinner />}
      <Modal open={modal} textOk={"Agregar"} title={"Agregar revista"} close={cerrarModal} clickOk={saveMagazine}>
        <DialogContentText>
          Ingrese nombre, correo electrónico y URL de la revista.
      </DialogContentText>
        <TextField id={"txt_nameMagazine"} name={"mg_name"} variant="outlined" label="Nombre de la revista" autoFocus type="text" fullWidth
          onChange={(event) => { setAddMagazine({ ...addMagazine, mg_name: event.target.value }) }} error={alertError && !addMagazine.mg_name} required/><p />
        <TextField id={"txt_emailMagazine"} name={"email"} variant="outlined" label="Correo electrónico" type="text" fullWidth
          onChange={(event) => { setAddMagazine({ ...addMagazine, email: event.target.value }) }} error={alertError && !addMagazine.email} required/><p />
        <TextField id={"txt_urlMagazine"} name={"mg_urlMagazine"} variant="outlined" label="Url de la revista" type="text" fullWidth
          onChange={(event) => { setAddMagazine({ ...addMagazine, mg_urlMagazine: event.target.value }) }} error={alertError && !addMagazine.mg_urlMagazine} required/>
          {alertError && <FormHelperText>Todos los campos son requeridos.</FormHelperText>}
      </Modal>
      <Grid>
        <Typography variant="h3" component="h2" gutterBottom align="center" style={{ color: "#196844" }}>Lista de Revistas</Typography>
      </Grid>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Button variant="contained" color="primary" size="medium" className={classes.buttonSummary}
                  onClick={() => { openModal() }} startIcon={<AddCircleIcon />}>Agregar revista</Button>
              </TableCell>
              <TableCell />
              <TableCell />
              <TableCell />
              <TableCell />
            </TableRow>
            <TableRow>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Fecha</TableCell>
              <TableCell align="center">Cantidad volúmenes</TableCell>
              <TableCell align="center">Ver volúmenes</TableCell>
              <TableCell align="center">Ver sumarios</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersMagazine.map((row) => (
              <TableRow key={row._id} style={{ cursor: 'pointer' }} >
                <TableCell align="left">
                  <a href={row.mg_urlMagazine} target="_blank" rel="noopener noreferrer">
                    {row.mg_name}
                  </a>
                </TableCell>
                <TableCell align="center">{format(new Date(row.createdAt), 'yyyy-MM-dd K:m aaaa')}</TableCell>
                <TableCell align="center">{row.mg_list_volumes.length}</TableCell>
                <TableCell align="center">
                  <Button startIcon={<VisibilityIcon />} onClick={() => verVolumes(row._id, row.mg_name, row.mg_urlMagazine)} />
                </TableCell>
                <TableCell align="center">
                  <Button startIcon={<VisibilityIcon />} onClick={() => seeSummaries(row._id, row.mg_name, row.mg_urlMagazine)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default withSnackbar(Magazines)