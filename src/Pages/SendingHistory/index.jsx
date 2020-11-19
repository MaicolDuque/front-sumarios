import React, { useContext, useEffect, useState } from 'react'
import { format } from 'date-fns'
import Paper from '@material-ui/core/Paper';
import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'

import { getHistorySendsByUser } from '../../services/summaryService'
import { ContextCreate } from '../../Auth/Context';
import Spinner from '../../components/Spinner';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  formControl: {
    width: '100%'
  }
}));

export default function SendingHistory() {
  const classes = useStyles();
  const [cargando, setCargando] = useState(false);
  const [sends, setSends] = useState([])
  const { infoUser, token } = useContext(ContextCreate);

  useEffect(() => {
    setCargando(true)
    getHistorySendsByUser(infoUser._id, token)
      .then(info => { setSends(info.data); setCargando(false) })
      .catch(error => console.log(error))
  }, [])

  return (
    <>
      { cargando && <Spinner />}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nombre Sumario</TableCell>
              <TableCell align="center">Descripcion Sumario</TableCell>
              <TableCell align="center">Nombre Lista</TableCell>
              <TableCell align="center">Fecha envío</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sends.map((row) => (
              <TableRow key={row._id} style={{ cursor: 'pointer' }} >
                <TableCell align="left"> {row.summary.name}</TableCell>
                <TableCell align="left"> {row.summary.description}</TableCell>
                <TableCell align="left"> {row.contact_list.name}</TableCell>
                <TableCell align="center">{format(new Date(row.createdAt), 'yyyy-MM-dd K:m aaaa')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}