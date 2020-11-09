import React, { useState, } from 'react'
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
  Link
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";

const infoStyles = makeStyles((theme) => ({
  paper: {
    padding: '20px',
    marginLeft: "250px",
    marginTop: "100px",
  },
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
  const [data, setData] = useState({ keyword: "" })
  const [articles, setArticles] = useState({ listArticles: [] })

  const handleSearchChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  const handleArticlesSelected = (event) => {
    const value = event.target.value
    const isChecked = event.target.checked
    const newArticles = isChecked ? [...articles.listArticles, value] : articles.listArticles.filter(data => data !== value)
    setArticles({
      ...articles,
      listArticles: newArticles
    })
  }

  let getArticlesList = () => {
    axios(
      {
        method: "POST",
        baseURL: `${process.env.REACT_APP_PROTOCOL_BACKEND}://${process.env.REACT_APP_HOST_BACKEND}${process.env.REACT_APP_PORT_BACKEND}`,
        url: `${process.env.REACT_APP_API_ARTICLES}`,
        data,
      }
    )
      .then((res) => {
        console.log(res.data)
        setGroupKey(res.data)
      })
      .catch((error) => {
        if (!axios.isCancel(error)) {
          console.error(error);
        }
      })
  }

  const validar = () => {
    console.log(articles.listArticles)
  }

  return (
    <Grid className={classes.paper} >
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
                  <SearchIcon
                    edge="end"
                  >
                  </SearchIcon>
                </InputAdornment>
              }>
            </OutlinedInput>
            <InputLabel
            >Buscar
            </InputLabel>
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
        <button onClick={validar}>Oeeeeee</button>
      </Grid>

      {groupKey.length === 0 ? null : (
        <Grid container>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox value="todos"></Checkbox>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groupKey.map((item) => (
                  <TableRow key={item._id} >
                    <TableCell>
                      <Checkbox value={item._id} name="listArticles" onChange={handleArticlesSelected}></Checkbox>
                    </TableCell>
                    <TableCell>
                      <Typography style={{ color: "#196844" }} gutterBottom>{item.title}</Typography>
                      <Typography variante="subtitle1" className={classes.nested} gutterBottom>{item.authors}</Typography>
                      <Link target="_blank" href={item.urlHtml} variante="subtitle1" className={classes.nested} gutterBottom>{item.urlHtml}</Link>
                      <Typography variante="subtitle1" className={classes.nested} gutterBottom>Keywords: {data.keyword}: {item.list_keywords[data.keyword]}</Typography>
                    </TableCell>
                  </TableRow>))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>)}
    </Grid>
  )
}