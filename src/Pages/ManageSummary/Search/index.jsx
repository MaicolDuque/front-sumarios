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
  TablePagination,
  TableRow,
  Checkbox,
  Paper,
  Typography,
  makeStyles,
  Link,
} from '@material-ui/core';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { ContextCreate } from "../../../Auth/Context"; //Context
import { getArticlesByKeyword, createSummary } from '../../../services/summaryService'
import Modal from '../../../components/Modal';
import Spinner from '../../../components/Spinner';


const infoStyles = makeStyles((theme) => ({
  title: {
    marginBottom: "30px"
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
    paddingLeft: theme.spacing(4)
  },
}));



export default function Search() {
  const classes = infoStyles();
  const [groupKey, setGroupKey] = useState([]);
  const [listKeywords, setListKeywords] = useState([]);
  const [data, setData] = useState({ keyword: "" })
  const [modal, setModal] = useState(false);
  const [cargando, setCargando] = useState(false);
  const { infoUser, token } = useContext(ContextCreate);
  const [infoSumario, setInfoSumario] = useState({ name: '', description: '', list_articles: [], list_keywords: [], favorite: false, user_id: '' })

  const handleSearchChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  const handleArticlesSelected = (event) => {
    const value = event.target.value
    const isChecked = event.target.checked
    const newArticles = isChecked ? [...infoSumario.list_articles, value] : infoSumario.list_articles.filter(data => data !== value)
    setInfoSumario({ ...infoSumario, list_articles: newArticles })
  }

  let getArticlesList = () => {
    setCargando(true)
    getArticlesByKeyword(data)
      .then((res) => {
        setCargando(false)
        setListKeywords(Object.keys(res.data[0].list_keywords))
        setGroupKey(res.data)
      })
      .catch((error) => {
        if (!axios.isCancel(error)) {
          console.log("ererererer")
          console.error(error);
        }
      })
  }

  const crearSumario = () => {
    setInfoSumario({ ...infoSumario, list_keywords: listKeywords, user_id: infoUser._id })
    setModal(true)
  }

  const guardarSumario = () => {
    console.log(infoSumario)
    setModal(false)
    setInfoSumario({ ...infoSumario, name: '', description: '' })
    setGroupKey([])
    setData({ keyword: '' })
    setCargando(true)
    createSummary(infoSumario, token)
      .then(res => setCargando(false))
      .catch((error) => {
        if (!axios.isCancel(error)) {
          console.error(error);
        }
      })
  }

  const handleChangeInfoSumario = (event) => {
    const value = event.target.value
    const name = event.target.name
    setInfoSumario({ ...infoSumario, [name]: value })
  }

  const cerrarModal = () => {
    setModal(false)
  }

  return (
    <>
      { cargando && <Spinner />}
      <Modal open={modal} textOk="Guardar" close={cerrarModal} title="Crear sumario" clickOk={guardarSumario} >
        <DialogContentText>
          Ingrese nombre y descripción para crear el sumario.
          </DialogContentText>
        <TextField margin="normal"
          onChange={handleChangeInfoSumario} name="name" value={infoSumario.name}
          autoFocus type="text" id="name" label="Nombre" variant="outlined" fullWidth /> <br />
        <TextField margin="normal"
          onChange={handleChangeInfoSumario} name="description"
          value={infoSumario.description}
          type="text" id="description"
          label="Descripción" variant="outlined" fullWidth />
      </Modal>
      <Grid>
        <Grid container
          direction="row-reverse"
        >
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
      </Grid>

      {groupKey.length === 0 ? null : (
        <Grid container>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <AddCircleIcon onClick={crearSumario} fontSize="large" style={{ cursor: "pointer" }} titleAccess="Crear sumario" />
                  </TableCell>
                  <TableCell>
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
                      <Typography style={{ color: "#196844" }} gutterBottom>{item.title}</Typography>
                      <Typography variante="subtitle1" className={classes.nested} gutterBottom>{item.authors}</Typography>
                      <Link target="_blank" href={item.urlHtml} variante="subtitle1" className={classes.nested} gutterBottom>{item.urlHtml}</Link>
                      <Typography variante="subtitle1" className={classes.nested} gutterBottom>Keywords: {data.keyword}: {item.list_keywords[data.keyword.toUpperCase()]}</Typography>
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