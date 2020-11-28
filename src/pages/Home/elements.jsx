import React, { useContext } from 'react';
import { makeStyles, Typography, Paper, Box, Button, withStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import 'animate.css'
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ImgContact from '../../Images/contact.jpg'
import ImgSearch from '../../Images/search.jpg'
import ImgFav from '../../Images/fav.jpg'
import ImgSummary from '../../Images/summary.jpg'

import { ContextCreate } from '../../Auth/Context';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(50),
        height: theme.spacing(55),
    },
    snackbarSearch: {
        backgroundColor: "#ffffff",
        color: "black",
        backgroundImage: `url(${ImgSearch})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain, cover",
        height:"80px",
        width:"100%",
        backgroundPosition: "right center"
    },
    snackbarContact: {
        backgroundColor: "#ffffff",
        color: "black",
        backgroundImage: `url(${ImgContact})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain, cover",
        height:"80px",
        width:"100%",
        backgroundPosition: "right center"
    },
    snackbarSummary: {
        backgroundColor: "#ffffff",
        color: "black",
        backgroundImage: `url(${ImgSummary})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain, cover",
        height:"80px",
        width:"100%",
        backgroundPosition: "right center"
    },
    snackbarFavorite: {
        backgroundColor: "#ffffff",
        color: "black",
        backgroundImage: `url(${ImgFav})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain, cover",
        height:"80px",
        width:"100%",
        backgroundPosition: "right center"
    },
}));

export default function Elements() {
    const { token, validationRegister } = useContext(ContextCreate);
    const classes = useStyles();
    const action = (
        <Button color="secondary" size="small">
            Busca artículos científicos
        </Button>
    );
    return (
        <>
            {
                token || validationRegister || window.location.pathname === "/register"?
                    null
                    :
                    <Grid container spacing={3} className="animate__animated animate__backInLeft" direction="column">
                        <Grid item xs={12} sm={12} lg={12}>
                            <SnackbarContent className={classes.snackbarSearch}
                                message={<Typography variant="h5" style={{ color: "#196844" }}> Busca artículos científicos</Typography>}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={12}>
                            <SnackbarContent className={classes.snackbarSummary}
                                message={<Typography variant="h5" style={{ color: "#196844" }}>Gestiona sumarios</Typography>}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={12}>
                            <SnackbarContent className={classes.snackbarFavorite}
                                message={<Typography variant="h5" style={{ color: "#196844" }}>Agrega sumarios a favoritos</Typography>}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} lg={12}>
                            <SnackbarContent className={classes.snackbarContact}
                                message={<Typography variant="h5" component="h2" style={{ color: "#196844" }}>Gestiona contactos</Typography>}
                            />
                        </Grid>
                    </Grid>
            }
        </>
    )
}