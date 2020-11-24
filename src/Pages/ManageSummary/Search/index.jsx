import React, { useContext, useState, } from 'react'
import axios from "axios";
import {
  Grid,
  InputAdornment,
  Button,
  FormControl,
  OutlinedInput,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  Typography,
  makeStyles,
  Link,
  Select,
  FormHelperText,
  Tooltip,
} from '@material-ui/core';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SendIcon from '@material-ui/icons/Send';
import InfoIcon from '@material-ui/icons/Info';

import { ContextCreate } from "../../../Auth/Context"; //Context
import { getArticlesByKeyword, createSummary, sendEmailSummary } from '../../../services/summaryService'
import Modal from '../../../components/Modal';
import Spinner from '../../../components/Spinner';
import useContactLists from '../../../hooks/useContactLists';
import { useSnackbar } from 'notistack';


const infoStyles = makeStyles((theme) => ({
  title: {
    marginBottom: "30px",
    marginTop: '20px',
    minWidth: '210px',
    maxWidth: '100%',
    marginRight: 'auto',
    marginLeft: 'auto'
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
  nested: {
    paddingLeft: theme.spacing(2)
  },
  buttonSummary: {
    marginRight: '30px'
  },
  formControl: {
    width: '100%'
  }
}));


export default function Search() {
  const classes = infoStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [groupKey, setGroupKey] = useState([]);
  const [listKeywords, setListKeywords] = useState([]);
  const [data, setData] = useState({ keyword: "" })
  const [modal, setModal] = useState(false);
  const [cargando, setCargando] = useState(false);
  const { infoUser, token } = useContext(ContextCreate);
  const [infoSumario, setInfoSumario] = useState({ userId: '', name: '', description: '', list_articles: [], list_keywords: [], favorite: false, user_id: '', errorNombre: false })
  const [infoSendSummary, setInfoSendSummary] = useState({ listaId: '', error: false, show: false })
  const { contactLists } = useContactLists()

  const handleSearchChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  const handleChangeList = (event) => {
    const { value, name } = event.target
    setInfoSendSummary({ ...infoSendSummary, [name]: value, error: false })
  }

  const handleArticlesSelected = (event) => {
    const value = event.target.value
    const isChecked = event.target.checked
    const newArticles = isChecked ? [...infoSumario.list_articles, value] : infoSumario.list_articles.filter(data => data !== value)
    setInfoSumario({ ...infoSumario, list_articles: newArticles })
  }

  let getArticlesList = () => {
    setCargando(true)
    setGroupKey([])
    getArticlesByKeyword(data)
      .then((res) => {
        setCargando(false)
        setListKeywords(data.keyword.trim().toUpperCase().split(","))
        setGroupKey(res.data.slice(0, 30))
      })
      .catch((error) => {
        if (!axios.isCancel(error)) {
          console.log("ererererer")
          console.error(error);
        }
      })
  }

  const crearSumario = (isToSend = false) => {
    setInfoSendSummary({ ...infoSendSummary, show: isToSend })
    setInfoSumario({ ...infoSumario, list_keywords: listKeywords, user_id: infoUser._id, userId: infoUser._id })
    setModal(true)
  }

  const saveSummary = () => {
    let mensaje = 'Sumario creado exitosamente!'
    console.log(infoSumario)
    if (infoSendSummary.show && !infoSendSummary.listaId) {
      setInfoSendSummary({ ...infoSendSummary, error: true })
      return false
    }
    if (infoSumario.name) {
      setData({ keyword: '' })
      setGroupKey([])
      setInfoSumario({ ...infoSumario, name: '', description: '', errorNombre: false })
      setModal(false)
      setCargando(true)
      createSummary(infoSumario, token)
        .then(res => {
          setCargando(false);
          const { name, description } = infoSumario
          const data = { summaryId: res.data._id, name, description, name_magazine: infoUser.name_magazine, listaId: infoSendSummary.listaId, userId: infoUser._id }
          if (infoSendSummary.show) {
            mensaje = 'Sumario creado y enviado exitosamente!'
            return sendEmailSummary(data, token)
          }
        })
        .then((res) => { setCargando(false); enqueueSnackbar(mensaje, { variant: 'success' }) })
        .catch((error) => {
          if (!axios.isCancel(error)) {
            console.error(error);
          }
        })
    } else {
      setInfoSumario({ ...infoSumario, errorNombre: true })
    }
  }

  const handleChangeInfoSumario = (event) => {
    const value = event.target.value
    const name = event.target.name
    setInfoSumario({ ...infoSumario, [name]: value, errorNombre: false })
  }

  const cerrarModal = () => {
    setModal(false)
  }

  return (
    <>
      { cargando && <Spinner />}
      <Modal open={modal} textOk={infoSendSummary.show ? 'Guardar y enviar' : 'Guardar'}
        close={cerrarModal} title={infoSendSummary.show ? 'Crear y enviar sumario' : 'Crear sumario'}
        clickOk={saveSummary} >
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
        {infoSendSummary.show &&
          <FormControl variant="outlined" className={classes.formControl} error={infoSendSummary.error}>
            <InputLabel htmlFor="outlined-age-native-simple">Seleccione lista</InputLabel>
            <Select
              autoWidth={true}
              native
              value={infoSendSummary.listaId}
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
            {infoSendSummary.error && <FormHelperText>Debe seleccionar una lista</FormHelperText>}
          </FormControl>}
      </Modal>
      <Grid container style={{ marginTop: '60px'}}>
        <Grid container xs={11} direction="row-reverse" >
          <FormControl variant="outlined" fullWidth>
            <OutlinedInput
              id="txt_keyword"
              name="keyword"
              value={data.keyword}
              onChange={handleSearchChange}
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon edge="end" />
                </InputAdornment>
              }>
            </OutlinedInput>
            <InputLabel>Buscar</InputLabel>
          </FormControl>
          <Button
            id="btn_search"
            name="search"
            variant="contained"
            color="primary"
            onClick={getArticlesList}
            className={classes.title}
          >
            Buscar
            </Button>
        </Grid>
        <Grid container xs={1}>
          <Tooltip color="primary" title="Para buscar por varias palabras, se deben separar con una coma (,). Solo se permite un máximo de 3 palabras por búsqueda." placement="top" arrow>
            <InfoIcon fontSize="large" style={{ marginTop: '10px', marginLeft: '10px' }} />
          </Tooltip>
        </Grid>
      </Grid>

      {groupKey.length === 0 ? null : (
        <Grid container>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="medium"
                      className={classes.buttonSummary}
                      onClick={() => crearSumario(false)}
                      startIcon={<AddCircleIcon />}>
                      Crear sumario
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="medium"
                      className={classes.buttonSummary}
                      onClick={() => crearSumario(true)}
                      startIcon={<SendIcon />}>
                      Crear y enviar
                    </Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groupKey.map((item) => (
                  <TableRow key={item._id} >
                    <TableCell>
                      <Checkbox color="primary" value={item._id} name="listArticles" onChange={handleArticlesSelected}></Checkbox>
                    </TableCell>
                    <TableCell>
                      <Typography style={{ color: "#196844" }} >{item.title}</Typography>
                      <Typography variante="subtitle1" className={classes.nested} >{item.authors}</Typography>
                      <Link target="_blank" href={item.urlHtml} variante="subtitle1" className={classes.nested} >{item.urlHtml}</Link>
                      <Typography variante="subtitle1" className={classes.nested} >
                        Keywords: &nbsp;
                        {data.keyword.split(",")[0] &&
                          `${data.keyword.split(",")[0]}:  ${item.list_keywords[data.keyword.split(",")[0]?.toUpperCase().trim()] ? 
                          item.list_keywords[data.keyword.split(",")[0]?.toUpperCase().trim()] : 0} `
                        }
                        {data.keyword.split(",")[1] &&
                          `${data.keyword.split(",")[1]}:  ${item.list_keywords[data.keyword.split(",")[1]?.toUpperCase().trim()] ?
                          item.list_keywords[data.keyword.split(",")[1]?.toUpperCase().trim()] : 0} `
                        }
                        {data.keyword.split(",")[2] &&
                          `${data.keyword.split(",")[2]}:  ${item.list_keywords[data.keyword.split(",")[2]?.toUpperCase().trim()] ? 
                          item.list_keywords[data.keyword.split(",")[2]?.toUpperCase().trim()] : 0} `
                        }
                      </Typography>
                    </TableCell>
                  </TableRow>))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>)}
    </>
  )
}