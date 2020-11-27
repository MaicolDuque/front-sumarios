import React, { useEffect, useRef, useState, useContext } from 'react'
import {
	Grid,
	Paper,
	TextField,
	Typography,
	Button,
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
		align: "center",
		maxWidth: '100%'
	},
	contentInfo: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		wordBreak: 'break-all'
	}
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

	const changeInformation = () => {
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
						<Grid container >
							<Grid item xs={12} sm={6} className={classes.contentInfo}>
								{showEditInfo ? (
									<div >
										<br />
										<TextField
											margin="normal"
											variant={"outlined"} label="Nombre de la revista" id={"txt_nameMagazine"} value={dataChange.mg_name} error={alertError && !dataChange.mg_name}
											onChange={(event) => { setDataChange({ ...dataChange, mg_name: event.target.value }) }} name={"mg_name"} fullWidth required /> <br />
										<TextField variant={"outlined"} margin="normal" label="Correo electrónico" id={"txt_email"} value={dataChange.email} error={alertError && !dataChange.email}
											onChange={(event) => { setDataChange({ ...dataChange, email: event.target.value }) }} name={"email"} fullWidth required /> <br />
										<TextField variant={"outlined"} margin="normal" label="Url de la revista" id={"txt_urlMagazine"} value={dataChange.mg_urlMagazine} error={alertError && !dataChange.mg_urlMagazine}
											onChange={(event) => { setDataChange({ ...dataChange, mg_urlMagazine: event.target.value }) }} name={"mg_urlMagazine"} fullWidth required /> <br />
										{alertError && <FormHelperText>Todos los campos son requeridos.</FormHelperText>}<br />
										<Button color={"secondary"} size="medium" variant="contained" startIcon={<CancelIcon />} onClick={() => { setShowEditInfo(false) }}>Cancelar</Button>
										<Button color={"primary"} size="medium" variant="contained" startIcon={<SaveIcon />} onClick={() => { saveInformation() }}>Guardar información</Button>
									</div>) : (
										<div>
											<br />
											<Typography variant="h4" component="h2" gutterBottom>{data.mg_name}</Typography> <br />
											<Typography gutterBottom >{data.email}</Typography> <br />
											<Typography gutterBottom >{data.mg_urlMagazine}</Typography> <br />
											<Button color={"primary"} size="medium" variant="contained" startIcon={<EditIcon />} onClick={() => { changeInformation() }}>Editar perfil</Button>
										</div>)
								}
							</Grid>
							<Grid item align="center" xs={12} sm={6}>
								<img src={require("../../../Images/publisher.jpg")} alt="Profile user" className={classes.large} />
							</Grid>
						</Grid>
					</Box>
				</center>
			</Grid>
		</>
	)
}

export default withSnackbar(PersonalInfo)