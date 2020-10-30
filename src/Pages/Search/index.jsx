import React from 'react'
import { Grid, InputAdornment, Button, FormControl, OutlinedInput, InputLabel } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';

const infoCorpStyles = makeStyles({
  paper: {
    padding: '20px',
    marginLeft: "350px",
    marginTop: "150px",
  },
  title: {
    paddingBottom: "30px"
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
  }
});

export default function Search() {
  const classes = infoCorpStyles();
  return (
    <Grid className={classes.paper}>
      <Grid container direction="row" spacing={4} className={classes.margin}>
        <Grid item sm={12} md={6} lg={6} xl={6} >
          <FormControl variant="outlined" fullWidth>
            <InputLabel variant="filled">Buscar</InputLabel>
            <OutlinedInput
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon
                    edge="end"
                  >
                  </SearchIcon>
                </InputAdornment>
              }>
            </OutlinedInput>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={4} className={classes.margin}>
        <Grid item sm={12} md={6} lg={6} xl={6} justifyContent="center">
          <Button
            variant="contained"
            color="default">
            Búsqueda avanzada
            </Button>
          <Button
            className={classes.color}
            variant="contained"
            color="primary">
            Buscar
            </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}