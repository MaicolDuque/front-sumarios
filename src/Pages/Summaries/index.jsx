import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { getAllSummaries } from '../../services/summaryService'
import { ContextCreate } from '../../Auth/Context';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  }
}));

export default function Summaries() {
  const classes = useStyles();
  const { infoUser, token } = useContext(ContextCreate);
  const [summaries, setSummaries] = useState([])

  useEffect(() => {
    getAllSummaries(infoUser._id, token)
      .then(info => setSummaries(info.data))
      .catch(error => console.log(error))
  }, [])

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Descripcion</TableCell>
              <TableCell align="center">Favorito</TableCell>
              <TableCell align="center">Fecha creación</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {summaries.map((row) => (
              <TableRow key={row._id}>
                <TableCell align="left"> {row.name}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="center">{row.favorite ? 'SI' : 'NO'}</TableCell>
                <TableCell align="center">{row.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}