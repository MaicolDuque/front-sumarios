import React, { useContext, useEffect, useState } from 'react';
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
import { DialogContentText, FormControl, FormHelperText, InputLabel, Select } from '@material-ui/core';
import axios from "axios";

import { getAllSummaries, sendEmailSummary } from '../../services/summaryService'
import { getListsByEditor } from '../../services/contactsService';
import { ContextCreate } from '../../Auth/Context';
import Spinner from '../../components/Spinner';
import Modal from '../../components/Modal';

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
  const [cargando, setCargando] = useState(false);
  const [modal, setModal] = useState(false);
  const [infoEnvio, setInfoEnvio] = useState({ listaId: '', summaryId: '', name: '', description: '', error: false });
  const [contactLists, setContactLists] = useState([])
  const { infoUser, token } = useContext(ContextCreate);
  const [summaries, setSummaries] = useState([])

  const seeArticles = (idVolumen) => {
    localStorage.setItem('id_summary', idVolumen)
    history.push('/summaries/articles')
  }

  const getSummaries = () => {
    setCargando(true)
    getAllSummaries(infoUser._id, token)
      .then(info => {
        setSummaries(info.data)
        setCargando(false)
      })
      .catch(error => console.log(error))
  }

  const handleChangeList = (event) => {
    const { value, name } = event.target
    setInfoEnvio({ ...infoEnvio, [name]: value })
  }

  const getLists = () => {
    getListsByEditor(infoUser._id, token)
      .then((res) => setContactLists(res.data.mg_contact_lists))
      .catch((error) => {
        if (!axios.isCancel(error)) {
          console.log("ererererer")
          console.error(error);
        }
      })
  }

  const enviarSumario = () => {
    setInfoEnvio({ ...infoEnvio, error: false })
    if (!infoEnvio.listaId) {
      setInfoEnvio({ ...infoEnvio, error: true })
    } else {
      const { error, ...data } = infoEnvio
      sendEmailSummary(data, token)
        .then((res) => setModal(false))
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
    setInfoEnvio({ ...infoEnvio, name, description, summaryId: _id, name_magazine: infoUser.name_magazine })
  }

  useEffect(() => {
    getSummaries()
    getLists()
  }, [])




  return (
    <>
      { cargando && <Spinner />}
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
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Descripcion</TableCell>
              <TableCell align="center">Favorito</TableCell>
              <TableCell align="center">Fecha creación</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {summaries.map((row) => (
              <TableRow key={row._id} style={{ cursor: 'pointer' }} >
                <TableCell align="left"> {row.name}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="center">{row.favorite ? 'SI' : 'NO'}</TableCell>
                <TableCell align="center">{row.createdAt}</TableCell>
                <TableCell> <VisibilityIcon onClick={() => seeArticles(row._id)} titleAccess="Ver articulos" /></TableCell>
                <TableCell> <SendIcon onClick={() => showModal(row)} titleAccess="Enviar sumario" /> </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}