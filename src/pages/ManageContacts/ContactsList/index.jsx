import React, { useContext, useEffect, useState, useRef } from 'react'
import axios from "axios";
import {
	Grid,
	Paper,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	Button,
	TableRow,
	TextField,
	DialogContentText,
	Tooltip,
	FormHelperText
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Autocomplete from '@material-ui/lab/Autocomplete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { withSnackbar } from "notistack";


//Context
import { ContextCreate } from "../../../Auth/Context";
import DeleteContact from '../../../components/Contacts/DeleteContact';
import AddContact from '../../../components/Contacts/AddContact'
import Modal from '../../../components/Modal';
import UpdateContact from '../../../components/Contacts/UpdateContact'

import { getContactsList, getContacts, createContactList, deleteContactList, updateContactList } from '../../../services/contactsService'

const infoStyles = makeStyles({
	paper: {
		padding: '20px',
		marginLeft: "250px",
		marginTop: "110px",
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
		backgroundColor: "#196844"
	},
	table: {
		marginTop: "20px",
		marginBottom: "10px"
	},
});


const ContactList = ({ enqueueSnackbar }) => {
	const classes = infoStyles();
	const { infoUser } = useContext(ContextCreate);
	const [data, setData] = useState([])
	const [flagCreateList, setFlagCreateList] = useState(false); //Change information of Modal between create and update contact list
	const [dataContacts, setDataContact] = useState([]);
	const [refresh, setRefresh] = useState(false)
	const [modal, setModal] = useState(false);
	const [addModal, setAddModal] = useState(false)
	const [updateModal, setUpdateModal] = useState(false)
	const [deleteModal, setDeleteModal] = useState(false)
	const [open, setOpen] = useState(false);
	const [alertError, setAlertError] = useState(false)

	const enqueueSnackbarRef = useRef(enqueueSnackbar);

	const [dataContactList, setDataContactList] = useState({
		name: "",
		description: "",
		mg_contacts: []
	})

	const [idContactList, setIdContactList] = useState({
		id: ""
	})
	const dataContactsOfList = []

	const clean = () => {
		setDataContactList({
			...dataContactList,
			name: "",
			description: "",
			mg_contacts: [""]
		})
	}
	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};
	const refreshPage = () => {
		setRefresh(!refresh)
	}
	let getContactsInfo = () => {
		getContacts(infoUser.mg_contact_lists)
			.then((res) => {
				setDataContact(res.data.mg_contacts)
			})
			.catch((error) => {
				if (!axios.isCancel(error)) {
					console.log("ererererer")
					console.error(error);
				}
			})
	}

	let getContactsListInfo = () => {
		getContactsList(infoUser._id)
			.then((res) => {
				setData(res.data.mg_contact_lists)
			})
			.catch((error) => {
				if (!axios.isCancel(error)) {
					console.log("ererererer")
					console.error(error);
				}
			})

	}
	const closeContactModal = () => {
		setAddModal(false)
		setDeleteModal(false)
		setUpdateModal(false)
		setRefresh(!refresh)
	}
	const closeModal = () => {
		setDataContactList({ ...dataContactList, mg_contacts: [] })
		clean()
		setModal(false)
	}

	const btnAddContact = () => {
		handleClose()
		setAddModal(true)
	}
	const btnUpdateContact = () => {
		setUpdateModal(true)
		handleClose()
	}
	const btnDeleteContact = () => {
		handleClose()
		setDeleteModal(true)
	}
	const createCL = () => {
		if (dataContactList.name) {
			const mgContacts = []
			dataContactList.mg_contacts.map((item) => {
				mgContacts.push(item._id)
			})
			setDataContactList({ ...dataContactList, mg_contacts: mgContacts })
			const infoSend = {
				id_user: infoUser._id,
				mg_contact_lists: dataContactList
			}
			createContactList(infoSend)
				.then(res => {
					setRefresh(!refresh)
					enqueueSnackbarRef.current(res.data.msg, {
						variant: "success",
					});
				})
				.catch((error) => {
					if (!axios.isCancel(error)) {
						console.error(error);
					}
				})
			setFlagCreateList(false)
			setModal(false)
			clean()
		} else {
			setAlertError(true)
		}
	}

	const updateCL = () => {
		if (dataContactList.name) {
			updateContactList(dataContactList, idContactList)
				.then(res => {
					if (!res.data.error) {
						setRefresh(!refresh)
						enqueueSnackbarRef.current(res.data.msg, {
							variant: "success",
						});
					}
				})
				.catch((res) => {
					if (res.data.error) {
						enqueueSnackbarRef.current(res.data.msg, {
							variant: "error",
						});
					}
				})
			setAlertError(false)
			setModal(false)
			clean()
		} else {
			setAlertError(true)
		}
	}

	const deleteCL = (idContactList) => {
		deleteContactList(idContactList)
			.then(res => {
				enqueueSnackbarRef.current(res.data.msg, {
					variant: "success",
				});
				setRefresh(!refresh)
			})
			.catch((error) => {
				if (!axios.isCancel(error)) {
					console.error(error);
				}
			})
	}

	const onClickGetContactList = (contactList) => {
		setIdContactList(contactList._id)
		getContacts(contactList._id)
			.then((res) => {
				res.data.mg_contacts.map((item) => {
					dataContactsOfList.push(item)
				})
				console.log(dataContactsOfList)
				setDataContactList({
					...dataContactList,
					name: contactList.name,
					description: contactList.description,
					mg_contacts: dataContactsOfList
				})
				setModal(true)
			})
			.catch((error) => {
				if (!axios.isCancel(error)) {
					console.error(error);
				}
			})
	}

	const onClickCreateContactList = () => {
		setFlagCreateList(true)
		setModal(true)
	}

	useEffect(() => {
		getContactsListInfo()
		getContactsInfo()
	}, [refresh])
	return (
		<>
			<UpdateContact dataContact={dataContacts} open={updateModal} close={closeContactModal} refresh={refreshPage} />
			<AddContact dataContactList={data} open={addModal} close={closeContactModal} refresh={refreshPage} />
			<DeleteContact dataContactList={dataContacts} open={deleteModal} close={closeContactModal} refresh={refreshPage} />
			<Modal open={modal} textOk="Guardar" close={closeModal} title={flagCreateList ? ("Crear lista") : ("Actualizar lista")} clickOk={() => { flagCreateList ? createCL() : updateCL() }} >
				<DialogContentText>
					{flagCreateList ? ("Integrese el nombre, la descripción y los contactos que pertenecerán a la lista.") :
						("Puede cambiar el nombre, la descripción y los contactos que pertenecerán a la lista.")}
				</DialogContentText>
				<TextField margin="normal" name="txt_nameList" value={dataContactList.name} error={alertError && !dataContactList.name}
					onChange={(event) => { setDataContactList({ ...dataContactList, name: event.target.value }) }}
					autoFocus type="text" id="nameList" label="Nombre de la lista" variant="outlined" fullWidth /> <br />
				<TextField margin="normal" name="txt_description" value={dataContactList.description} type="text" id="description"
					onChange={(event) => { setDataContactList({ ...dataContactList, description: event.target.value }) }}
					label="Descripción" variant="outlined" fullWidth /> <p />
				<Autocomplete multiple id="listContact" options={dataContacts}
					onChange={(event, newValue) => { setDataContactList({ ...dataContactList, mg_contacts: ((newValue === null) ? "" : newValue) }) }}
					getOptionLabel={(option) => option.c_name} getOptionSelected={(option, value) => option.c_name === value.c_name}
					filterSelectedOptions value={dataContactList.mg_contacts}
					renderInput={(params) => (
						<TextField
							{...params}
							variant="outlined"
							label="Contactos"
						/>
					)}
				/>
				{alertError && <FormHelperText>Debes asignarle un nombre a la lista.</FormHelperText>}<p />
			</Modal>
			<Grid>
				<Typography variant="h3" component="h2" gutterBottom align="center" style={{ color: "#196844" }}>Lista de Contactos</Typography>
			</Grid>

			<Grid container direction="column">
				<Grid container>
					<Tooltip title="Contactos" placement="left">
						<SpeedDial ariaLabel="Contacto" icon={<PermContactCalendarIcon />} onClose={handleClose} onClick={handleOpen} open={open} direction='right'>
							<SpeedDialAction key='AddContact' icon={<AddCircleIcon />} tooltipTitle='Agregar contacto' placement="top" onClick={() => { btnAddContact() }} />
							<SpeedDialAction key='UpdateContact' icon={<SystemUpdateAltIcon />} tooltipTitle='Actualizar contacto' placement="top" onClick={() => { btnUpdateContact() }} />
							<SpeedDialAction key='DeleteContact' icon={<DeleteForeverIcon />} tooltipTitle='Eliminar contacto' placement="top" onClick={() => { btnDeleteContact() }} />
						</SpeedDial>
					</Tooltip>
				</Grid>
				<br />
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>
									<Button variant="contained" color="primary" onClick={() => onClickCreateContactList()} startIcon={<AddCircleIcon />}>Crear lista</Button>
								</TableCell>
								<TableCell />
								<TableCell />
								<TableCell />
								<TableCell />
							</TableRow>
							<TableRow>
								<TableCell><Typography>Nombre de la lista</Typography></TableCell>
								<TableCell><Typography>Descripción</Typography></TableCell>
								<TableCell><Typography>Fecha de creación</Typography></TableCell>
								<TableCell />
								<TableCell />
							</TableRow>
						</TableHead>
						<TableBody>
							{data.length === 0 ? (null) : (
								data.map((item) => (
									<TableRow key={item._id} style={{ cursor: 'pointer' }}>
										<TableCell>{item.name}</TableCell>
										<TableCell>{item.description}</TableCell>
										<TableCell>{item.createdAt}</TableCell>
										<TableCell><Button startIcon={<VisibilityIcon />} onClick={() => onClickGetContactList(item)} /></TableCell>
										<TableCell><Button startIcon={<DeleteForeverIcon style={{ color: '#A93226' }} />} onClick={() => deleteCL(item._id)} /></TableCell>
									</TableRow>))
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
		</>
	)
}

export default withSnackbar(ContactList);
