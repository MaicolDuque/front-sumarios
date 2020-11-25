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
    FormHelperText
} from '@material-ui/core'
import { withSnackbar } from "notistack";
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';

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
    const [alertError, setAlertError] = useState(false)
    const [data, setData] = useState({})
    const [dataChange, setDataChange] = useState({
        mg_name: "",
        email: "",
        mg_urlMagazine: ""
    })
    const [refresh, setRefresh] = useState(false)
    const enqueueSnackbarRef = useRef(enqueueSnackbar);

    const changeInformation = () =>{
        setShowEditInfo(true)
        setDataChange(data)
        setAlertError(false)
    }

    const saveInformation = () => {
        if (dataChange.mg_name && dataChange.email && dataChange.mg_urlMagazine) {
            updatePerfil(infoUser._id, token, dataChange)
                .then((res) => {
                    if (!res.data.error) {
                        enqueueSnackbarRef.current(res.data.msg, {
                            variant: "success",
                        });
                        setRefresh(!refresh)
                        setShowEditInfo(false)
                    }
                })
                .catch(res => {
                    enqueueSnackbarRef.current("No se logró actualizar la información.", {
                        variant: "error",
                    });
                })
        }
        else {
            setAlertError(true)
        }

    }
    useEffect(() => {
        getPerfil(infoUser._id, token)
            .then((res) => {
                setData(res.data)
                setDataChange(res.data)
                if (data) {
                    setRefresh(true)
                }
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
                        <TableRow >
                            <TableCell >
                                {showEditInfo ? (
                                    <>
                                        <p />
                                        <TextField
                                            variant={"outlined"} label="Nombre de la revista" id={"txt_nameMagazine"} value={dataChange.mg_name} error ={alertError && !dataChange.mg_name}
                                            onChange={(event) => { setDataChange({ ...dataChange, mg_name: event.target.value }) }} name={"mg_name"} fullWidth required/> <p />
                                        <TextField variant={"outlined"} label="Correo electrónico" id={"txt_email"} value={dataChange.email} error ={alertError && !dataChange.email}
                                            onChange={(event) => { setDataChange({ ...dataChange, email: event.target.value }) }} name={"email"} fullWidth required/> <p />
                                        <TextField variant={"outlined"} label="Url de la revista" id={"txt_urlMagazine"} value={dataChange.mg_urlMagazine} error ={alertError && !dataChange.mg_urlMagazine}
                                            onChange={(event) => { setDataChange({ ...dataChange, mg_urlMagazine: event.target.value }) }} name={"mg_urlMagazine"} fullWidth required/> <p />
                                        {alertError && <FormHelperText>Todos los campos son requeridos.</FormHelperText>}<p />
                                        <Button color={"secondary"} size="medium" variant="contained" startIcon={<CancelIcon />} onClick={() => { setShowEditInfo(false) }}>Cancelar</Button>
                                        <Button color={"primary"} size="medium" variant="contained" startIcon={<SaveIcon />} onClick={() => { saveInformation() }}>Guardar información</Button>
                                    </>) : (
                                        <>
                                            <p />
                                            <Typography variant="h4" component="h2" gutterBottom>{data.mg_name}</Typography> <p />
                                            <Typography gutterBottom >{data.email}</Typography> <p />
                                            <Typography gutterBottom >{data.mg_urlMagazine}</Typography> <p />
                                            <Button color={"primary"} size="medium" variant="contained" startIcon={<EditIcon />} onClick={() => {changeInformation()  }}>Editar perfil</Button>
                                        </>)
                                }
                            </TableCell>
                            <TableCell align="right">
                                <img src={require("../../../Images/publisher.jpg")} className={classes.large} />
                            </TableCell>
                        </TableRow>
                    </Box>
                </center>
            </Grid>
        </>
    )
}

export default withSnackbar(PersonalInfo)