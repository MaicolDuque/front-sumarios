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
import { deleteContact } from '../../services/contactsService'

const DeleteContact = ({ dataContactList, open, close, enqueueSnackbar, refresh }) => {
    const enqueueSnackbarRef = useRef(enqueueSnackbar);
    const [alertError, setAlertError] = useState(false)
    const [idContact, setIdContact] = useState()

    const closeAll = () => {
        setAlertError(false)
        close()
    }
    const deleteC = () => {
        if (idContact) {
            deleteContact(idContact)
                .then(res => {
                    enqueueSnackbarRef.current(res.data.msg, {
                        variant: "success",
                    });
                    setAlertError(false)
                    refresh()
                })
                .catch((error) => {
                    enqueueSnackbarRef.current(error.data.msg, {
                        variant: "error",
                    });
                })
            close()
        } else {
            setAlertError(true)
        }

    }
    return (
        <>
            <Modal open={open} textOk="Eliminar" close={() => closeAll()} title="Eliminar Contacto" clickOk={deleteC} >
                <DialogContentText>
                    Seleccione el contacto a eliminar, tenga en cuenta que el contacto se eliminará de las listas de distribución en las que se encuentre.
                </DialogContentText>
                <Autocomplete
                    freeSolo
                    id='autoC_Contacts'
                    onChange={(event, newValue) => {
                        setIdContact({ ...idContact, id_lista: ((newValue === null) ? "" : newValue._id) })
                    }}
                    options={dataContactList}
                    getOptionLabel={(result) => result.c_name}
                    renderInput={(params) => (
                        <TextField required margin="normal"
                            {...params}
                            name="contactList"
                            id="cbx_contact"
                            label="Contactos" variant="outlined" fullWidth
                            error={alertError && !idContact?._id}
                        />
                    )}
                />
                {alertError && <FormHelperText>Se debe indicar el contacto a eliminar.</FormHelperText>}<p />
            </Modal>
        </>

    )
}

export default withSnackbar(DeleteContact)