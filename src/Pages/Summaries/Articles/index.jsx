import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { ContextCreate } from '../../../Auth/Context';
import Spinner from '../../../components/Spinner';
import { getAllArticlesBySummary } from '../../../services/summaryService';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  }
}));

export default function Articles() {
  const classes = useStyles();
  const [cargando, setCargando] = useState(false);
  const { token } = useContext(ContextCreate);
  const [articles, setArticles] = useState([])

  useEffect(() => {
    setCargando(true)
    const idSummary = localStorage.getItem('id_summary')
    console.log(idSummary)
    getAllArticlesBySummary(idSummary, token)
      .then(info => {
        if (info.data) {
          setArticles(info.data.list_articles)
        }
        setCargando(false)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <>
      { cargando && <Spinner />}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Título</TableCell>
              <TableCell align="center">Autores</TableCell>
              <TableCell align="center">URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.map((row) => (
              <TableRow key={row._id}>
                <TableCell align="left"> {row.title}</TableCell>
                <TableCell align="left">{row.authors}</TableCell>
                <TableCell align="center">
                  <a href={row.urlHtml} target="_blank" rel="noopener noreferrer">
                    {row.urlHtml}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}