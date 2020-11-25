import React, { useEffect, useRef, useState, useContext } from 'react'
import {
    Grid,
    Paper,
    TextField,
    Typography,
    TableCell,
    Button,
    TableRow,
    makeStyles,
    Box,
    InputBase
} from '@material-ui/core'
import { withSnackbar } from "notistack";
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';

import { getPerfil, updatePerfil } from "../../../services/usersService"
import { ContextCreate } from '../../../Auth/Context';

const useStyles = makeStyles((theme) => ({
    background: {
        background: '#196844',
    },
    typography: {
        color: '#ffffff',
    },
    large: {
        width: theme.spacing(40),
        height: theme.spacing(45),
        align: "center",
    },
}));


const PersonalInfo = ({ enqueueSnackbar }) => {
    const classes = useStyles();
    const { token, infoUser } = useContext(ContextCreate);
    const [showEditInfo, setShowEditInfo] = useState(false)
    const [data, setData] = useState({})
    const [refresh, setRefresh] = useState(false)
    const enqueueSnackbarRef = useRef(enqueueSnackbar);

    const saveInformation = () => {
        updatePerfil(infoUser._id, token, data)
            .then((res) => {
                if (!res.data.error) {
                    enqueueSnackbarRef.current(res.data.msg, {
                        variant: "success",
                    });
                    setRefresh(!refresh)
                }
            })
            .catch(res => {
                enqueueSnackbarRef.current("No se logró actualizar la información.", {
                    variant: "error",
                });
            })
        console.log(data)
        setShowEditInfo(false)
    }
    useEffect(() => {
        getPerfil(infoUser._id, token)
            .then((res) => {
                setData(res.data)
                if (data) {
                    setRefresh(true)
                }
                console.log(data.mg_name)
            }
            )
            .catch(res => console.log(res))
    }, [refresh])
    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h3" component="h2" gutterBottom align="center" style={{ color: "#196844" }}>Información de perfil</Typography>
            </Grid>
            <Grid>
                <center>
                    <Box component={Paper}>
                        {
                            refresh ? (<TableRow >
                                <TableCell >
                                    {
                                        showEditInfo ? (
                                            <>
                                                <p />
                                                <TextField
                                                    variant={"outlined"}
                                                    label="Nombre de la revista"
                                                    id={"txt_nameMagazine"}
                                                    value={data.mg_name}
                                                    onChange={(event) => { setData({ ...data, mg_name: event.target.value }) }}
                                                    name={"mg_name"} fullWidth /> <p />
                                                <TextField
                                                    variant={"outlined"}
                                                    label="Correo electrónico"
                                                    id={"txt_email"}
                                                    value={data.email}
                                                    onChange={(event) => { setData({ ...data, email: event.target.value }) }}
                                                    name={"email"} fullWidth /> <p />
                                                <TextField
                                                    variant={"outlined"}
                                                    label="Url de la revista"
                                                    id={"txt_urlMagazine"}
                                                    value={data.mg_urlMagazine}
                                                    onChange={(event) => { setData({ ...data, mg_urlMagazine: event.target.value }) }}
                                                    name={"mg_urlMagazine"} fullWidth /> <p />
                                                <Button
                                                    color={"primary"}
                                                    size="medium"
                                                    variant="contained"
                                                    startIcon={<SaveIcon />}
                                                    onClick={() => { saveInformation() }}
                                                >Guardar información</Button>
                                            </>) : (
                                                <>
                                                    <p />
                                                    <Typography variant="h4" component="h2" gutterBottom>{data.mg_name}</Typography> <p />
                                                    <Typography gutterBottom >{data.email}</Typography> <p />
                                                    <Typography gutterBottom >{data.mg_urlMagazine}</Typography> <p />
                                                    <Button
                                                        color={"primary"}
                                                        size="medium"
                                                        variant="contained"
                                                        startIcon={<EditIcon />}
                                                        onClick={() => { setShowEditInfo(true) }}
                                                    >Editar perfil</Button>
                                                </>)
                                    }
                                </TableCell>
                                <TableCell align="right">
                                    <img src={require("../../../Images/publisher.jpg")} className={classes.large} />
                                </TableCell>
                            </TableRow>) : null
                        }

                    </Box>
                </center>

            </Grid>
        </>
    )
}

export default withSnackbar(PersonalInfo)