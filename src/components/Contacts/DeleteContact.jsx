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
import {  deleteContact } from '../../services/contactsService'

const DeleteContact = ({dataContactList, open, close, enqueueSnackbar}) =>{
    const enqueueSnackbarRef = useRef(enqueueSnackbar);

    const [idContact, setIdContact] = useState()
    const deleteC = () => {
        deleteContact(idContact)
            .then(res => {
                enqueueSnackbarRef.current(res.data.msg, {
                    variant: "success",
                });
            })
            .catch((error) => {
                enqueueSnackbarRef.current(error.data.msg, {
                    variant: "error",
                });
            })
        close()
    }
    return (
        <>
            <Modal open={open} textOk="Eliminar" close={()=>close()} title="Eliminar Contacto" clickOk={deleteC} >
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
                        <TextField margin="normal"
                            {...params}
                            name="contactList"
                            id="cbx_contact"
                            label="Contactos" variant="outlined" fullWidth
                        />
                    )}
                />
            </Modal>
        </>

    )
}

export default withSnackbar(DeleteContact)