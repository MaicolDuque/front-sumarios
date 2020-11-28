import React, { useState, useRef } from 'react'
import {
    DialogContentText,
    TextField,
    FormHelperText
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withSnackbar } from "notistack";

//Context
import Modal from '../../components/Modal';
import { updateContact } from '../../services/contactsService'


const UpdateContact = ({ dataContact, open, close, enqueueSnackbar }) => {
    const enqueueSnackbarRef = useRef(enqueueSnackbar);
    const [alertError, setAlertError] = useState(false)
    const [infoContact, setInfoContact] = useState({
        c_name: "",
        c_email: ""
    })
    const [idContact, setIdContact] = useState({
        id: ""
    })

    const clear = ()=>{
        setInfoContact({
            c_name:"",
            c_email:""
        })
        setIdContact({
            id:""
        })
    }

    const handleSelectContact = (event, newValue) => {
        setIdContact({ ...idContact, id: ((newValue === null) ? "" : newValue._id) });
        setInfoContact({ ...infoContact, c_name: newValue.c_name, c_email: newValue.c_email })
    }

    const closeAll = () => {
        setAlertError(false)
        clear()
        close()
    }
    const uContact = () => {
        if (idContact.id && infoContact.c_email && infoContact.c_name) {
            updateContact(infoContact, idContact)
                .then(res => {
                    if (!res.data.error) {
                        enqueueSnackbarRef.current(res.data.msg, {
                            variant: "success",
                        });
                        setAlertError(false)
                    }
                })
                .catch((res) => {
                    if (res.data.error) {
                        enqueueSnackbarRef.current(res.data.msg, {
                            variant: "error",
                        });
                    }
                })
            clear()
            close()
        } else {
            setAlertError(true)
        }

    }

    return (
        <>
            <Modal open={open} textOk="Guardar" close={() => closeAll()} title="Actualizar Contacto" clickOk={uContact} >
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
                            autoFocus name="contactList" value={idContact.id} type="text" id="contactList"
                            label="Buscar contacto" variant="outlined" fullWidth error={alertError && !idContact?.id}
                        />
                    )}
                /> <br />
                <TextField margin="normal" name="name" value={infoContact.c_name}
                    onChange={(event) => {
                        setInfoContact({ ...infoContact, c_name: event.target.value })
                    }}
                    type="text" id="name" label="Nombre" variant="outlined" fullWidth error={alertError && !infoContact.c_name} /> <br />
                <TextField margin="normal"
                    name="email"
                    value={infoContact.c_email}
                    type="text" id="description"
                    onChange={(event) => {
                        setInfoContact({ ...infoContact, c_email: event.target.value })
                    }}
                    label="Correo electrónico" variant="outlined" fullWidth error={alertError && !infoContact.c_email} /> <br />
                {alertError && <FormHelperText>Se debe indicar el contacto a actualizar y no se puede dejar ningún campo vacío.</FormHelperText>}<p />
            </Modal>
        </>

    )
}
export default withSnackbar(UpdateContact)