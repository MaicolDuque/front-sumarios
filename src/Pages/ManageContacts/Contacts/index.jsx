import React from 'react'
import {
    Grid,
    Paper,
    Tooltip,
    Typography,
} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from '@material-ui/data-grid';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import DeleteIcon from '@material-ui/icons/Delete';

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
const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function Contacts() {
    const classes = infoStyles();
    return (
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
                        <AddCircleIcon style={{ color: "#196844" }} fontSize="large"/>
                    </Tooltip>
                    <Tooltip title="Importar contactos" arrow>
                        <ImportExportIcon fontSize="large"/>
                    </Tooltip>
                    <Tooltip title="Eliminar" arrow>
                        <DeleteIcon style={{ color: "#A93226" }} fontSize="large"/>
                    </Tooltip>
                </Grid>

                <Grid item style={{ height: 400, width: '100%' }} className={classes.table}>
                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                </Grid>
            </Grid>

        </Paper>
    )
}