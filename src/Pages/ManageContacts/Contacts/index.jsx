import React, { useContext, useEffect, useState, useCallback } from 'react'
import axios from "axios";
import {
    Grid,
    Paper,
    Tooltip,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    DialogContentText,
    TextField,
    Checkbox,
    TableRow,
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import DeleteIcon from '@material-ui/icons/Delete';
import Autocomplete from '@material-ui/lab/Autocomplete';

//Context
import { ContextCreate } from "../../../Auth/Context";
import Modal from '../../../components/Modal';
import { getContacts, getContactsList, addContact, deleteContact } from '../../../services/contactsService'

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
        background: "#196844"
    },
    table: {
        marginTop: "20px",
        marginBottom: "10px"
    },
});


export default function Contacts() {
    const classes = infoStyles();
    const [resultAddContac, setResultAddContact] = useState()
    const [resultDeleteContac, setResultDeleteContact] = useState()
    const { infoUser } = useContext(ContextCreate);
    const [data, setData] = useState([]);
    const [dataContactList, setDataContactList] = useState([])
    const [modal, setModal] = useState(false);
    const [idContact, setIdContact] = useState({
        id: ""
    })
    const [infoContact, setInfoContact] = useState({
        c_name: "",
        c_email: "",
        id_lista: ""
    })

    const handleContactSelect = (event) => {
        const value = event.target.value
        const isChecked = event.target.checked
        const valueIdContact = isChecked ? value : ""
        setIdContact({ id: value })
    }

    let getContactsInfo = () => {
        getContacts(infoUser.mg_contact_lists)
            .then((res) => {
                setData(res.data)
            })
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    console.log("ererererer")
                    console.error(error);
                }
            })
    }

    let getContactsListName = () => {
        getContactsList(infoUser.mg_contact_lists)
            .then((res) => {
                setDataContactList(res.data)
            })
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    console.log("ererererer")
                    console.error(error);
                }
            })
    }

    useEffect(() => {
        getContactsInfo()
        getContactsListName()
    }, [resultAddContac])
    
    const addContacts = () => {
        setModal(true)
    }
    const cerrarModal = () => {
        setModal(false)
    }
    const saveContact = () => {
        addContact(infoContact)
            .then(res => setResultAddContact(res))
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    console.error(error);
                }
            })
        setInfoContact({ ...infoContact, c_name: "", c_email: "", id_lista: "" })
        setModal(false)
    }
    const deleteC = () => {
        deleteContact(idContact)
            .then(res => setResultAddContact(res))
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    console.error(error);
                }
            })
    }

    return (
        <>
            <Modal open={modal} textOk="Guardar" close={cerrarModal} title="Agregar Contacto" clickOk={saveContact} >
                <DialogContentText>
                    Ingrese el nombre completo, correo electrónico y lista de distribución para agregar el contacto.
                </DialogContentText>
                <TextField margin="normal"
                    name="name" value={infoContact.name}
                    onChange={(event) => {
                        setInfoContact({ ...infoContact, c_name: event.target.value })
                    }}
                    autoFocus type="text" id="name" label="Nombre" variant="outlined" fullWidth /> <br />
                <TextField margin="normal"
                    name="email"
                    value={infoContact.email}
                    type="text" id="description"
                    onChange={(event) => {
                        setInfoContact({ ...infoContact, c_email: event.target.value })
                    }}
                    label="Correo electrónico" variant="outlined" fullWidth /> <br />
                <Autocomplete
                    freeSolo
                    id='autoC_ContactsList'
                    onChange={(event, newValue) => {
                        setInfoContact({ ...infoContact, id_lista: ((newValue === null) ? "" : newValue.id) })
                    }}
                    options={dataContactList}
                    getOptionLabel={(result) => result.name}
                    renderInput={(params) => (
                        <TextField margin="normal"
                            {...params}
                            name="contactList"
                            value={infoContact.id_lista}
                            type="text" id="contactList"
                            label="Lista de distribución" variant="outlined" fullWidth
                        />
                    )}
                />
            </Modal>
            <Paper elevation={3} className={classes.paper}>
                <Grid
                    item
                    direction="column"
                    container>
                    <Grid>
                        <Typography variant="h3" component="h2" gutterBottom align="center" style={{ color: "#196844" }}>Mis Contactos</Typography>
                    </Grid>
                    <Grid
                        container
                        direction="colum"
                        justify="flex-end">
                        <Tooltip title="Agregar contacto" arrow>
                            <AddCircleIcon name = {'AddContact'} id={'btn_AddContat'} style={{ color: "#196844" }} fontSize="large" onClick={addContacts} />
                        </Tooltip>
                        <Tooltip title="Importar contactos" arrow>
                            <ImportExportIcon name = {'importContact'} id={'btn_ImportContat'} fontSize="large" />
                        </Tooltip>
                        <Tooltip title="Eliminar" arrow>
                            <DeleteIcon name = {'deleteContact'} id={'btn_DeleteContat'} style={{ color: "#A93226" }} fontSize="large" onClick={deleteC}/>
                        </Tooltip>
                    </Grid>
                    <Grid item style={{ height: 400, width: '100%' }} className={classes.table}>
                        {data.length === 0 ? null : (
                            <Grid container>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography>Nombre completo</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography>Correo electrónico</Typography>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data.map((item) => (
                                                <TableRow key={item.id} >
                                                    <TableCell>
                                                        <Checkbox color="primary" value={item.id} name="listArticles" onChange={(event) => {
                                                            setIdContact({ id: event.target.value })
                                                            console.log(idContact)
                                                        }}></Checkbox>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography >{item.name}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography style={{ color: "#196844" }}>{item.email}</Typography>
                                                    </TableCell>
                                                </TableRow>))
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>)}
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}