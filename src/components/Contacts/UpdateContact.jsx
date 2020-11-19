import React, { useState, useRef } from 'react'
import axios from "axios";
import {
    DialogContentText,
    TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withSnackbar } from "notistack";

//Context
import Modal from '../../components/Modal';
import { updateContact } from '../../services/contactsService'


const UpdateContact = ({ dataContact, open, close, enqueueSnackbar }) => {
    const enqueueSnackbarRef = useRef(enqueueSnackbar);
    const [infoContact, setInfoContact] = useState({
        c_name: "",
        c_email: ""
    })
    const [idContact, setIdContact] = useState({
        id: ""
    })

    const handleSelectContact = (event, newValue) => {
        setIdContact({ ...idContact, id: ((newValue === null) ? "" : newValue._id) });
        setInfoContact({ ...infoContact, c_name: newValue.c_name, c_email: newValue.c_email })
    }

    const uContact = () => {
        updateContact(infoContact, idContact)
            .then(res => {
                if (!res.data.error) {
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
        close()
    }

    return (
        <>
            <Modal open={open} textOk="Guardar" close={() => close()} title="Actualizar Contacto" clickOk={uContact} >
                <DialogContentText>
                    Seleccione el contacto a actualizar y modifique los campos deseados.
            </DialogContentText>
                <Autocomplete
                    freeSolo
                    id='autoC_ContactsList'
                    onChange={(event, newValue) => {
                        handleSelectContact(event, newValue)
                    }}
                    options={dataContact}
                    getOptionLabel={(result) => result.c_name}
                    renderInput={(params) => (
                        <TextField margin="normal"
                            {...params}
                            name="contactList"
                            value={idContact.id}
                            type="text" id="contactList"
                            label="Buscar contacto" variant="outlined" fullWidth
                        />
                    )}
                /> <br />
                <TextField margin="normal"
                    name="name" value={infoContact.c_name}
                    onChange={(event) => {
                        setInfoContact({ ...infoContact, c_name: event.target.value })
                    }}
                    autoFocus type="text" id="name" label="Nombre" variant="outlined" fullWidth /> <br />
                <TextField margin="normal"
                    name="email"
                    value={infoContact.c_email}
                    type="text" id="description"
                    onChange={(event) => {
                        setInfoContact({ ...infoContact, c_email: event.target.value })
                    }}
                    label="Correo electrónico" variant="outlined" fullWidth /> <br />
            </Modal>
        </>

    )
}
export default withSnackbar(UpdateContact)