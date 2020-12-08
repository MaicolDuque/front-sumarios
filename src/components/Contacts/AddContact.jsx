import React, { useContext, useState, useRef } from 'react'
import axios from "axios";
import {
    DialogContentText,
    TextField,
    FormHelperText
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { withSnackbar } from "notistack";

//Context
import { ContextCreate } from "../../Auth/Context";
import Modal from '../../components/Modal';
import { addContact } from '../../services/contactsService'


const AddContact = ({ dataContactList, open, close, enqueueSnackbar, refresh }) => {
    const enqueueSnackbarRef = useRef(enqueueSnackbar);
    const [alertError, setAlertError] = useState(false)
    const { infoUser } = useContext(ContextCreate);
    const [infoContact, setInfoContact] = useState({
        c_name: "",
        c_email: "",
        id_lista: "",
        id_lista_default: infoUser.mg_contact_lists
    })

    const clear = () =>{
        setInfoContact({...infoContact, c_name:"", c_email:"", id_lista:""})
    }

    const closeAll = () =>{
        setAlertError(false)
        clear()
        close()
    }

    const saveContact = () => {
        if (infoContact.c_name && infoContact.c_email && infoContact.id_lista) {
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
                        refresh()
                        setAlertError(false)
                    }
                })
                .catch((error) => {
                    if (!axios.isCancel(error)) {
                        console.error(error);
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
            <Modal open={open} textOk="Guardar" title="Agregar Contacto" clickOk={saveContact} close={() => {closeAll()}}>
                <DialogContentText>
                    Ingrese el nombre completo, correo electrónico y lista de distribución para agregar el contacto.
            </DialogContentText>
                <TextField required margin="normal" name="name" value={infoContact.c_name} onChange={(event) => { setInfoContact({ ...infoContact, c_name: event.target.value }) }}
                    autoFocus type="text" id="name" label="Nombre" variant="outlined" fullWidth error={alertError && !infoContact.c_name} /> <br />
                <TextField required margin="normal" name="email" value={infoContact.c_email} type="text" id="description" error={alertError && !infoContact.c_email}
                    onChange={(event) => { setInfoContact({ ...infoContact, c_email: event.target.value }) }}
                    label="Correo electrónico" variant="outlined" fullWidth /> <br />
                <Autocomplete freeSolo id='autoC_ContactsList' onChange={(event, newValue) => { setInfoContact({ ...infoContact, id_lista: ((newValue === null) ? "" : newValue._id) }) }}
                    options={dataContactList} getOptionLabel={(result) => result.name}
                    renderInput={(params) => (
                        <TextField required margin="normal"
                            {...params}
                            name="contactList"
                            value={infoContact.id_lista}
                            type="text" id="contactList"
                            label="Lista de distribución" variant="outlined" fullWidth
                            error={alertError && !infoContact.id_lista}
                        />
                    )}
                />
                {alertError && <FormHelperText>Todos los campos son requeridos.</FormHelperText>}<p />
            </Modal>
        </>

    )
}
export default withSnackbar(AddContact)