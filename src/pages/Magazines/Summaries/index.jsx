import React, { useEffect, useState } from 'react'
import { Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import { format } from 'date-fns'

import Spinner from '../../../components/Spinner'
import useSummaries from '../../../hooks/useSummaries'


const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  formControl: {
    width: '100%'
  }
}));

export default function SummariesMagazine() {
  const classes = useStyles();
  const { summaries, cargandoSummaries, setUserId } = useSummaries(null)
  const [ name, setName ] = useState('')
  
  useEffect(() => {
    const { id, name } = JSON.parse(localStorage.getItem('info_magazine'))
    setName(name)
    setUserId(id)
  }, [])

  return (
    <>
      { cargandoSummaries ? <Spinner /> : null}
      <Grid>
        <Typography variant="h3" component="h2" gutterBottom align="center" style={{ color: "#196844" }}>Sumarios de {name}</Typography>
      </Grid>
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
              <TableRow key={row._id} style={{ cursor: 'pointer' }} >
                <TableCell align="left"> {row.name}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="center">{row.favorite ? 'SI' : 'NO'}</TableCell>
                <TableCell align="center">{format(new Date(row.createdAt), 'yyyy-MM-dd K:m aaaa')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}