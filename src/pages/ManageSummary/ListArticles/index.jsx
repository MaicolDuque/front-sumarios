import React from 'react'
import { Button, Checkbox, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SendIcon from '@material-ui/icons/Send';
import { Link } from 'react-router-dom'


const infoStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(2)
  },
  buttonSummary: {
    marginRight: '30px'
  }
}));

export default function ListArticles({ articles, keywords, crearSumario, handleArticlesSelected }) {
  const classes = infoStyles();
  return (
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
            {articles.map((item) => (
              <TableRow key={item._id} >
                <TableCell>
                  <Checkbox color="primary" value={item._id} name="listArticles" onChange={handleArticlesSelected}></Checkbox>
                </TableCell>
                <TableCell>
                  <Typography style={{ color: "#196844" }} >{item.title}</Typography>
                  <Typography variante="subtitle1" className={classes.nested} >{item.authors}</Typography>
                  <a target="_blank" rel="noopener noreferrer" href={item.urlHtml} className={classes.nested} >{item.urlHtml}</a>
                  <Typography variante="subtitle1" className={classes.nested} >
                    Keywords: &nbsp;
                        {keywords.split(",")[0] &&
                      `${keywords.split(",")[0]}:  ${item.list_keywords[keywords.split(",")[0]?.toUpperCase().trim()] ?
                        item.list_keywords[keywords.split(",")[0]?.toUpperCase().trim()] : 0} `
                    }
                    {keywords.split(",")[1] &&
                      `${keywords.split(",")[1]}:  ${item.list_keywords[keywords.split(",")[1]?.toUpperCase().trim()] ?
                        item.list_keywords[keywords.split(",")[1]?.toUpperCase().trim()] : 0} `
                    }
                    {keywords.split(",")[2] &&
                      `${keywords.split(",")[2]}:  ${item.list_keywords[keywords.split(",")[2]?.toUpperCase().trim()] ?
                        item.list_keywords[keywords.split(",")[2]?.toUpperCase().trim()] : 0} `
                    }
                  </Typography>
                </TableCell>
              </TableRow>))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  )
}