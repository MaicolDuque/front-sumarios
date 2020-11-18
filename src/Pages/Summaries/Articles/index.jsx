import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import UpdateIcon from '@material-ui/icons/Update';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Button, Checkbox, DialogContentText, TextField, Typography } from '@material-ui/core';
import axios from "axios";

import { ContextCreate } from '../../../Auth/Context';
import { createSummary, getAllArticlesBySummary, updatesArticlesBySummary } from '../../../services/summaryService';
import Spinner from '../../../components/Spinner';
import Modal from '../../../components/Modal';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  button: {
    marginRight: '20px'
  }
}));

export default function Articles() {
  const classes = useStyles();
  const [cargando, setCargando] = useState(false);
  const { infoUser, token } = useContext(ContextCreate);
  const [articles, setArticles] = useState([])
  const [resfresh, setRefresh] = useState(false)
  const [idsArticles, setIdsArticles] = useState([])
  const [modal, setModal] = useState(false)
  const [infoSumario, setInfoSumario] = useState({ name: '', description: '', list_articles: [], list_keywords: [], favorite: false, user_id: '', errorNombre: false })
  const idSummary = localStorage.getItem('id_summary')

  const handleArticlesSelected = (event) => {
    const value = event.target.value
    const isChecked = event.target.checked
    const newArticlesId = isChecked ? [...idsArticles, value] : idsArticles.filter(data => data !== value)
    setIdsArticles(newArticlesId)
    console.log(idsArticles)
  }

  const updateArticles = () => {
    setCargando(true)
    updatesArticlesBySummary(idSummary, { list_articles: idsArticles }, token)
      .then(data => { setCargando(false); setRefresh(!resfresh) })
      .catch(error => console.log(error))
  }

  const handleChangeInfoSumario = (event) => {
    const value = event.target.value
    const name = event.target.name
    setInfoSumario({ ...infoSumario, [name]: value, errorNombre: false })
  }

  const modalCreateSummary = () => {
    setInfoSumario({ ...infoSumario, list_articles: idsArticles, user_id: infoUser._id })
    setModal(true)
    console.log(idsArticles)
  }

  const saveSummary = () => {
    if (infoSumario.name) {
      setInfoSumario({ ...infoSumario, name: '', description: '', errorNombre: false })
      setModal(false)
      setCargando(true)
      createSummary(infoSumario, token)
        .then(res => setCargando(false) )
        .catch((error) => {
            if (!axios.isCancel(error)) {
              console.error(error);
            }
          })
    }else{
      setInfoSumario({ ...infoSumario, errorNombre: true })
    }
  }

  useEffect(() => {
    setCargando(true)
    getAllArticlesBySummary(idSummary, token)
      .then(info => {
        if (info.data) {
          setArticles(info.data.list_articles)
          const idsArticles = info.data.list_articles.map(article => article._id)
          setIdsArticles(idsArticles)
        }
        setCargando(false)
      })
      .catch(error => console.log(error))
  }, [resfresh])

  return (
    <>
      { cargando && <Spinner />}
      <Modal open={modal} textOk='Guardar' close={() => setModal(false)} title='Crear sumario' clickOk={saveSummary} >
        <DialogContentText>
          Ingrese nombre y descripción para crear el sumario.
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
      </Modal>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  onClick={updateArticles}
                  className={classes.button}
                  startIcon={<UpdateIcon />}>
                  Actualizar
                 </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  onClick={modalCreateSummary}
                  className={classes.button}
                  startIcon={<AddCircleIcon />}>
                  Crear sumario
                 </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <Checkbox color="primary" checked={idsArticles.includes(item._id)} value={item._id} name="listArticles" onChange={handleArticlesSelected} ></Checkbox>
                </TableCell>
                <TableCell>
                  <Typography style={{ color: "#196844" }} gutterBottom>{item.title}</Typography>
                  <Typography variante="subtitle1" className={classes.nested} gutterBottom>{item.authors}</Typography>
                  <a target="_blank" rel="noopener noreferrer" href={item.urlHtml} variante="subtitle1" className={classes.nested}>{item.urlHtml}</a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}