import React, { useEffect, useState, useRef } from 'react'
import { withSnackbar } from "notistack";
import {
    Grid,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    Button,
    TableRow,
    Link,
    Paper
} from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';


import { getUserPending, updateStatus } from '../../../services/usersService'



const PublisherPending = ({ enqueueSnackbar }) => {
    const enqueueSnackbarRef = useRef(enqueueSnackbar);
    const [dataPublisher, setDataPublisher] = useState([])
    const [resfresh, setRefresh] = useState(false)

    const activePublisher = (idPublisher) => {
        updateStatus(idPublisher._id)
            .then(res => {
                if (!res.data.caution) {
                    enqueueSnackbarRef.current(res.data.msg, {
                        variant: "success",
                    });
                    setRefresh(!resfresh)
                }
            })
            .catch(res => {
                if (res.data.error) {
                    enqueueSnackbarRef.current(res.data.msg, {
                        variant: "error",
                    });
                }
            })
    }

    useEffect(() => {
        getUserPending()
            .then(res => {
                console.log(res)
                if (!res.data.caution) {
                    setDataPublisher(res.data.result)
                }
            })
            .catch(res => {

            })
    }, [resfresh])
    return (
        <>
            <Grid>
                <Typography variant="h3" component="h2" gutterBottom align="center" style={{ color: "#196844" }}>Solicitudes</Typography>
            </Grid>
            <Grid>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre de la revista</TableCell>
                                <TableCell>Correo electrónico de la revista</TableCell>
                                <TableCell>URL de la revista</TableCell>
                                <TableCell>Activación</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataPublisher.length === 0 ? null : (
                                dataPublisher.map((item) => (
                                    <TableRow key={item._id} style={{ cursor: 'pointer' }}>
                                        <TableCell>{item.mg_name}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>
                                            <Link target="_blank" href={item.mg_urlMagazine}>{item.mg_urlMagazine}</Link>
                                        </TableCell>
                                        <TableCell>
                                            <Button startIcon={<ThumbUpAltIcon />} onClick={() =>activePublisher(item)}>

                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </>

    )

}

export default withSnackbar(PublisherPending)