import * as React from "react";
import { Grid, Box } from "@mui/material";
import AgregarClienteForm from "../components/AgregarClienteForm";
import DinamicTable from "../components/DinamicTableCliente";
import type { GridColDef } from '@mui/x-data-grid';

interface Users {
    id: number;
    idCliente: number;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    password: string;
}

const ModuloClientes = () => {
    const [dataUsers, setDataUsers] = React.useState<Users[]>([]);
    const [userToEdit, setUserToEdit] = React.useState<Users | null>(null);

    const fetchUsers = () => {
        fetch("http://localhost:8000/clientes")
            .then((res) => res.json())
            .then((res) =>
                setDataUsers(res.data.map((u: any) => ({ ...u, id: u.idCliente })))
            )
            .catch((err) => console.error("Error al obtener clientes", err));
    };

    const columns: GridColDef[] = [
        { field: "nombre", headerName: "Nombre", width: 150 },
        { field: "apellido", headerName: "Apellido", width: 150 },
        { field: "telefono", headerName: "Teléfono", width: 130 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "password", headerName: "Contraseña", width: 160 }
    ];


    const handleDelete = (id: number) => {
        console.log(id)
    }

    React.useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <Grid container justifyContent="center" marginTop={5}>
                <Grid item xs={12} md={6}>
                    <Box px={2}>
                        <AgregarClienteForm
                            userToEdit={userToEdit}
                            onSuccess={() => {
                                fetchUsers();
                                setUserToEdit(null);
                            }}
                            usersList={dataUsers}
                            setUserToEdit={setUserToEdit}
                        />
                    </Box>
                </Grid>
            </Grid>

            <Grid container justifyContent={"center"} marginTop={5}>
                <Grid item xs={12} md="8">
                    <Box>
                        <DinamicTable
                            rows={dataUsers}
                            columns={columns}
                            onDelete={handleDelete}
                        />
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default ModuloClientes;
