import React, { useContext, useState, useRef } from 'react'
import axios from "axios";
import {
    DialogContentText,
    TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withSnackbar } from "notistack";

//Context
import { ContextCreate } from "../../Auth/Context";
import Modal from '../../components/Modal';
import { addContact } from '../../services/contactsService'


const AddContact = ({ dataContactList, open, close, enqueueSnackbar }) => {
    const enqueueSnackbarRef = useRef(enqueueSnackbar);

    const { infoUser } = useContext(ContextCreate);
    const [infoContact, setInfoContact] = useState({
        c_name: "",
        c_email: "",
        id_lista: "",
        id_lista_default: infoUser.mg_contact_lists
    })

    const saveContact = () => {
        addContact(infoContact)
            .then(res => {
                if (res.data.caution) {
                    enqueueSnackbarRef.current(res.data.msg, {
                        variant: "warning",
                    });
                }
                else {
                    enqueueSnackbarRef.current(res.data.msg, {
                        variant: "success",
                    });
                }
            })
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    console.error(error);
                }
            })
        close()
    }

    return (
        <>
            <Modal open={open} textOk="Guardar" close={() => close()} title="Agregar Contacto" clickOk={saveContact} >
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
                        setInfoContact({ ...infoContact, id_lista: ((newValue === null) ? "" : newValue._id) })
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
        </>

    )
}
export default withSnackbar(AddContact)