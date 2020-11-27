import React, { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SendIcon from '@material-ui/icons/Send';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { DialogContentText, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import axios from "axios";
import { format } from 'date-fns'
import { useSnackbar } from 'notistack';

import { sendEmailSummary, updatesInfoSummaryById } from '../../services/summaryService'
import { ContextCreate } from '../../Auth/Context';
import Spinner from '../../components/Spinner';
import Modal from '../../components/Modal';
import useContactLists from '../../hooks/useContactLists';
import useSummaries from '../../hooks/useSummaries';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  formControl: {
    width: '100%'
  }
}));

export default function Summaries() {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [cargando, setCargando] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [infoEnvio, setInfoEnvio] = useState({ userId: '', listaId: '', summaryId: '', name: '', description: '', error: false });
  const { infoUser, token } = useContext(ContextCreate);
  const [infoSumario, setInfoSumario] = useState({ name: '', description: '', favorite: false, errorNombre: false, id: '' })
  const { contactLists } = useContactLists()
  const { resfresh, setRefresh, summaries, cargandoSummaries } = useSummaries(infoUser._id)

  const seeArticles = (idVolumen) => {
    localStorage.setItem('id_summary', idVolumen)
    history.push('/summaries/articles')
  }

  const handleChangeList = (event) => {
    const { value, name } = event.target
    setInfoEnvio({ ...infoEnvio, [name]: value })
  }

  const enviarSumario = () => {
    setInfoEnvio({ ...infoEnvio, error: false })
    if (!infoEnvio.listaId) {
      setInfoEnvio({ ...infoEnvio, error: true })
    } else {
      const { error, ...data } = infoEnvio
      sendEmailSummary(data, token)
        .then((res) => { setModal(false); enqueueSnackbar("Sumario enviado exitosamente!", { variant: 'success' }) })
        .catch((error) => {
          if (!axios.isCancel(error)) {
            console.log("ererererer")
            console.error(error);
          }
        })
    }
  }

  const showModal = ({ name, description, _id }) => {
    setModal(true)
    setInfoEnvio({ ...infoEnvio, name, description, summaryId: _id, name_magazine: infoUser.name_magazine, userId: infoUser._id })
  }

  const showModalEdit = (summary) => {
    setModalEdit(true)
    setInfoSumario({ ...infoSumario, name: summary.name, description: summary.description, id: summary._id, favorite: summary.favorite })
  }

  const handleChangeInfoSumario = (event) => {
    const value = event.target.value
    const name = event.target.name
    setInfoSumario({ ...infoSumario, [name]: value, errorNombre: false })
  }

  const updateSummary = () => {
    if (infoSumario.name) {
      setInfoSumario({ ...infoSumario, name: '', description: '', errorNombre: false })
      setModalEdit(false)
      setCargando(true)
      updatesInfoSummaryById(infoSumario.id, infoSumario, token)
        .then(res => { setCargando(false); setRefresh(!resfresh) })
        .catch((error) => {
          if (!axios.isCancel(error)) {
            console.error(error);
          }
        })
    } else {
      setInfoSumario({ ...infoSumario, errorNombre: true })
    }
  }

  return (
    <>
      { cargando || cargandoSummaries ? <Spinner /> : null}
      <Grid>
        <Typography variant="h3" component="h2" gutterBottom align="center" style={{ color: "#196844" }}>Mis sumarios</Typography>
      </Grid>
      <Modal open={modal} textOk="Enviar" close={() => setModal(false)} title="Enviar sumario" clickOk={enviarSumario} >
        <DialogContentText>
          Seleccione la lista de contactos para enviar el sumario
        </DialogContentText>
        <FormControl variant="outlined" className={classes.formControl} error={infoEnvio.error}>
          <InputLabel htmlFor="outlined-age-native-simple">Seleccione lista</InputLabel>
          <Select
            autoWidth={true}
            native
            value={infoEnvio.listaId}
            required
            onChange={handleChangeList}
            label="Seleccione lista"
            inputProps={{
              name: 'listaId',
              id: 'outlined-age-native-simple',
            }}>
            <option aria-label="None" value="" />
            {
              contactLists.map(list => {
                return <option key={list._id} value={list._id}>{list.name}</option>
              })
            }
          </Select>
          {infoEnvio.error && <FormHelperText>Debe seleccionar una lista</FormHelperText>}
        </FormControl>
      </Modal>

      <Modal open={modalEdit} textOk='Guardar' close={() => setModalEdit(false)} title='Editar sumario' clickOk={updateSummary} >
        <DialogContentText>
          Ingrese nombre y descripción para editar el sumario.
          </DialogContentText>
        <TextField margin="normal"
          error={infoSumario.errorNombre}
          onChange={handleChangeInfoSumario} name="name" value={infoSumario.name}
          helperText={infoSumario.errorNombre ? 'Debe ingresar un nombre' : ''}
          autoFocus type="text" id="name" label="Nombre" variant="outlined" fullWidth /> <br />
        <TextField margin="normal"
          onChange={handleChangeInfoSumario} name="description"
          value={infoSumario.description}
          type="text" id="description"
          label="Descripción" variant="outlined" fullWidth />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Favorito</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={infoSumario.favorite}
            name="favorite"
            onChange={handleChangeInfoSumario}
            label="Favorito"
          >
            <MenuItem value={true}>SI</MenuItem>
            <MenuItem value={false}>NO</MenuItem>
          </Select>
        </FormControl>
      </Modal>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Descripcion</TableCell>
              <TableCell align="center">Favorito</TableCell>
              <TableCell align="center">Fecha creación</TableCell>
              <TableCell align="center" colSpan={3}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {summaries.map((row) => (
              <TableRow key={row._id} style={{ cursor: 'pointer' }} >
                <TableCell align="left"> {row.name}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="center">{row.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}</TableCell>
                <TableCell align="center">{format(new Date(row.createdAt), 'yyyy-MM-dd K:m aaaa')}</TableCell>
                <TableCell> <VisibilityIcon onClick={() => seeArticles(row._id)} titleAccess="Ver articulos" /></TableCell>
                <TableCell> <EditIcon onClick={() => showModalEdit(row)} titleAccess="Editar sumario" /> </TableCell>
                <TableCell> <SendIcon onClick={() => showModal(row)} titleAccess="Enviar sumario" /> </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}