import React, { useContext, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack';
import { Button, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import RefreshIcon from '@material-ui/icons/Refresh';

import { ContextCreate } from '../../../Auth/Context';
import { getAllVolumesMagazine } from '../../../services/usersService';
import { indexarVolumeService, refreshVolumesMagazineService } from '../../../services/articleService'
import Spinner from '../../../components/Spinner';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  formControl: {
    width: '100%'
  }
}));

export default function Volumes() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { token } = useContext(ContextCreate);
  const [cargando, setCargando] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [infoMagazine, setInfoMagazine] = useState({})
  const [volumes, setVolumes] = useState([])

  useEffect(() => {
    const { id, name, url } = JSON.parse(localStorage.getItem('info_magazine'))
    setInfoMagazine({ id, name, url })
    setCargando(true)
    getAllVolumesMagazine(id, token)
      .then(info => {
        setCargando(false)
        const sortVolumes = info.data.mg_list_volumes.sort((a, b) => a._id.localeCompare(b._id)) // b.description.localeCompare(a.description)
        setVolumes(sortVolumes)
        console.log(sortVolumes)
      })
      .catch(error => enqueueSnackbar(`Error al cargar los volúmenes: ${error}`, { variant: 'error' }))
  }, [refresh])

  const indexarVolume = (id) => {
    setCargando(true)
    indexarVolumeService(id, token)
      .then(info => {
        setCargando(false);
        enqueueSnackbar('Sumario indexado correctamente!', { variant: 'success' });
      })
      .catch(error => enqueueSnackbar(`Error al indexar: ${error}`, { variant: 'error' }))
  }

  const updateVolumes = () => {
    console.log("oeoeoe")
    const { id, url } = infoMagazine
    setCargando(true)
    refreshVolumesMagazineService({ idEditor: id, urlMagazine: url }, token)
      .then(info => {
        setCargando(false)
        setRefresh(!refresh)
      })
      .catch(error => enqueueSnackbar(`Error al actualizar volúmenes: ${error}`, { variant: 'error' }))
  }

  return (
    <>
      { cargando ? <Spinner /> : null}
      <Grid>
        <Typography variant="h3" component="h2" gutterBottom align="center" style={{ color: "#196844" }}>Volúmenes {infoMagazine.name} </Typography>
      </Grid>
      <Button startIcon={<RefreshIcon />} color="primary" variant="contained" size="large" onClick={() => updateVolumes()}>Actualizar volúmenes</Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Indexar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {volumes.map((row) => (
              <TableRow key={row._id} style={{ cursor: 'pointer' }} >
                <TableCell align="left">
                  <a href={row.url} target="_blank" rel="noopener noreferrer">
                    {row.description}
                  </a>
                </TableCell>
                <TableCell align="center">
                  <Button startIcon={<RefreshIcon />} onClick={() => indexarVolume(row._id)}></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}