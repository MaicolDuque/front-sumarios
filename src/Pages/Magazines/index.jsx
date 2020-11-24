import React, { useContext, useEffect, useState } from 'react'
import { Button, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';

import { ContextCreate } from '../../Auth/Context';
import { getAllUsersMagazine } from '../../services/usersService'
import { format } from 'date-fns'
import { useHistory } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  formControl: {
    width: '100%'
  }
}));

export default function Magazines() {
  const classes = useStyles();
  const history = useHistory();
  const [cargando, setCargando] = useState(false);
  const { token } = useContext(ContextCreate);
  const [usersMagazine, setUsersMagazine] = useState([])

  useEffect(() => {
    setCargando(true)
    getAllUsersMagazine(token)
      .then(info => { setUsersMagazine(info.data); setCargando(false) })
      .catch(error => console.log(error))
  }, [])

  const verVolumes = (id, name, url) => {
    localStorage.setItem('info_magazine', JSON.stringify({ id, name, url }))
    history.push('/magazines/volumes')
  }

  const seeSummaries = (id, name, url) => {
    localStorage.setItem('info_magazine', JSON.stringify({ id, name, url }))
    history.push('/magazines/summaries')
  }

  return (
    <>
      { cargando && <Spinner />}
      <Grid>
        <Typography variant="h3" component="h2" gutterBottom align="center" style={{ color: "#196844" }}>Lista de Revistas</Typography>
      </Grid>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
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