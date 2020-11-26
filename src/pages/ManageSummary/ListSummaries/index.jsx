import React from 'react'
import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { format } from 'date-fns'
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  formControl: {
    width: '100%'
  }
}));

export default function ListSummaries({ listSummariesKeywords = [] }){
  const classes = useStyles();
  const history = useHistory();

  const seeArticles = (idSummary) => {
    localStorage.setItem('id_summary', idSummary)
    history.push('/summaries/articles')
  }
  return (
    <>
      <h1>Summaries</h1>
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
            {listSummariesKeywords.map((row) => (
              <TableRow key={row._id} style={{ cursor: 'pointer' }} >
                <TableCell align="left"> {row.name}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="center">{row.favorite ? 'SI' : 'NO'}</TableCell>
                <TableCell align="center">{format(new Date(row.createdAt), 'yyyy-MM-dd K:m aaaa')}</TableCell>
                <TableCell> <VisibilityIcon onClick={() => seeArticles(row._id)} titleAccess="Ver articulos" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}