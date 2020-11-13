import React, { useContext, useEffect, useState } from 'react'
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
    Checkbox,
    TableRow,
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

//Context
import { ContextCreate } from "../../../Auth/Context";

import { getContactsList } from '../../../services/contactsService'

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


export default function ContactList() {
    const classes = infoStyles();
    const { infoUser } = useContext(ContextCreate);
    const [data, setData] = useState([])
    const dataContacts = [];
    let getContactsListInfo = () => {
        getContactsList(infoUser.mg_contact_lists)
            .then((res) => {
                // const arra = res.data
                // arra.forEach(dataContactList => {
                //     let integrant = []
                //     dataContactList.mg_contacts.forEach((element) => {
                //         integrant.push({
                //             email: element.c_email
                //         })
                //     })
                //     dataContacts.push({
                //         id: dataContactList._id,
                //         nameList: dataContactList.name,
                //         description: dataContactList.description,
                //         integrants: integrant
                //     })
                // })
                console.log(res.data)
                setData(res.data)

            })
            .catch((error) => {
                if (!axios.isCancel(error)) {
                    console.log("ererererer")
                    console.error(error);
                }
            })

    }
    useEffect(() => {
        getContactsListInfo()
    }, [])
    return (
        <Paper elevation={3} className={classes.paper}>
            <Grid
                item
                direction="column"
                container>
                <Grid>
                    <Typography variant="h3" component="h2" gutterBottom align="center" style={{ color: "#196844" }}>Lista de Contactos</Typography>
                </Grid>
                <Grid
                    container
                    direction="colum"
                    justify="flex-end">
                    <Tooltip title="Crear lista" arrow>
                        <CreateIcon style={{ color: "#196844" }} fontSize="large" />
                    </Tooltip>
                    <Tooltip title="Eliminar" arrow>
                        <DeleteIcon style={{ color: "#A93226" }} fontSize="large" />
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
                                                <Typography>Nombre de la lista</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>Descripción</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>Integrantes</Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.map((item) => (
                                            <TableRow key={item.id} >
                                                <TableCell>
                                                    <Checkbox color="primary" value={item.id} name="listArticles"></Checkbox>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography >{item.name}</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography style={{ color: "#196844" }}>{item.description}</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography style={{ color: "#196844" }}>{}</Typography>
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
    )
}