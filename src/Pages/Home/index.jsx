import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import Header from '../../components/Header';
import Menu from '../../components/Menu';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    maxWidth: '100%'
  },
  paper: {
    marginLeft: '100px',
    marginRight: '100px',
    marginTop: "40px",
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px',
      marginRight: '10px',
    },
  },
}));

function Home({ children }) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header toggle={handleDrawerToggle} />
      <Menu mobileOpen={mobileOpen} toggle={handleDrawerToggle} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid  className={classes.paper}>
          {children}
        </Grid>
      </main>
    </div>
  );
}


export default Home;
