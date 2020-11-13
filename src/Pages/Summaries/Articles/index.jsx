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

import { ContextCreate } from '../../../Auth/Context';
import Spinner from '../../../components/Spinner';
import { getAllArticlesBySummary } from '../../../services/summaryService';
import { Button, Checkbox, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
  const [idsArticles, setIdsArticles] = useState([])

  const handleArticlesSelected = (event) => {
    const value = event.target.value
    const isChecked = event.target.checked
    const newArticlesId = isChecked ? [...idsArticles, value] : idsArticles.filter(data => data !== value)
    setIdsArticles(newArticlesId)
    console.log(idsArticles)
  }

  useEffect(() => {
    setCargando(true)
    const idSummary = localStorage.getItem('id_summary')
    console.log(idSummary)
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
  }, [])

  return (
    <>
      { cargando && <Spinner />}
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
                  className={classes.button}
                  startIcon={<UpdateIcon />}>
                  Actualizar
                 </Button>
              </TableCell>
              {/* <TableCell align="center">Título</TableCell>
              <TableCell align="center">Autores</TableCell>
              <TableCell align="center">URL</TableCell> */}
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