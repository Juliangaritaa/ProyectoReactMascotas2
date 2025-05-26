import React, { useEffect, useState } from 'react';
import type { GridColDef } from '@mui/x-data-grid';
import {
    DataGrid,
    GridToolbar,
    GridToolbarContainer,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
    GridToolbarColumnsButton
} from '@mui/x-data-grid';
import {
    Paper,
    IconButton,
    Typography,
    Box,
    Chip,
    Avatar,
    Tooltip,
    Card,
    CardContent,
    useTheme,
    alpha,
    Fade,
    useMediaQuery
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { esES } from '@mui/x-data-grid/locales';
import TableRowsIcon from '@mui/icons-material/TableRows';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface DinamicTableProps {
    rows: any[];
    columns: GridColDef[];
    onDelete: (id: number) => void;
    title?: string;
}

const CustomToolbar = () => {
    const theme = useTheme();

    return (
        <GridToolbarContainer
            sx={{
                p: 2,
                justifyContent: 'space-between',
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            }}
        >
            <Box display="flex" alignItems="center">
                <TableRowsIcon
                    sx={{
                        mr: 1.5,
                        color: theme.palette.primary.main
                    }}
                />
                <Typography
                    variant="h6"
                    fontWeight="600"
                    sx={{
                        backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '0.5px'
                    }}
                >
                    Listado de Registros
                </Typography>
            </Box>
            <Box display="flex" gap={1}>
                <GridToolbarColumnsButton
                    sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 500,
                    }}
                />
                <GridToolbarFilterButton
                    sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 500,
                    }}
                />
                <GridToolbarDensitySelector
                    sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 500,
                    }}
                />
                <GridToolbarExport
                    sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 500,
                    }}
                />
            </Box>
        </GridToolbarContainer>
    );
};

const DinamicTableMascotas: React.FC<DinamicTableProps> = ({
    rows,
    columns,
    onDelete,
    title = "Listado de Registros"
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [tableRows, setTableRows] = useState<any[]>([]);

    useEffect(() => {
        setTableRows(rows);
    }, [rows]);

    // Generate avatar color based on string
    const getAvatarColor = (text: string) => {
        const colors = [
            theme.palette.primary.main,
            theme.palette.secondary.main,
            theme.palette.error.main,
            theme.palette.warning.main,
            theme.palette.info.main,
            theme.palette.success.main,
        ];

        // Use a simple character sum to select a color
        const charSum = text.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
        return colors[charSum % colors.length];
    };

    const getNameInitials = (name: string) => {
        if (!name) return '?';
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    const columnasBotones: GridColDef[] = [
        ...columns,
        {
            field: "actions",
            headerName: "Acciones",
            width: 120,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            filterable: false,
            renderCell: (params: any) => (
                <Box display="flex" gap={1}>
                    <Tooltip title="Eliminar registro">
                        <IconButton
                            size="small"
                            onClick={() => onDelete(params.row.id)}
                            sx={{
                                color: theme.palette.error.main,
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: `0 3px 10px ${alpha(theme.palette.error.main, 0.3)}`
                                }
                            }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            )
        }
    ];

    return (
        <Box
            display="flex"
            justifyContent="center"
            width="100%"
        >
            <Fade in={true} timeout={500}>
                <Card
                    elevation={4}
                    sx={{
                        borderRadius: 3,
                        overflow: 'hidden',
                        background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.8)}, ${theme.palette.background.paper})`,
                        backdropFilter: 'blur(10px)',
                        boxShadow: `0 10px 40px -10px ${alpha(theme.palette.primary.main, 0.2)}`,
                        position: 'relative',
                        height: '100%',
                        width: '100%',
                        maxWidth: '1200px',
                        display: 'flex',
                        flexDirection: 'column',
                        mx: 'auto', // Add horizontal auto margin
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '8px',
                            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            borderTopLeftRadius: '12px',
                            borderTopRightRadius: '12px',
                        }
                    }}
                >
                    <CardContent sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column', '&:last-child': { pb: 0 } }}>
                        <DataGrid
                            rows={rows}
                            columns={columnasBotones}
                            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 8 },
                                },
                            }}
                            pageSizeOptions={[5, 8, 10, 25, 50, 100]}
                            slots={{
                                toolbar: CustomToolbar,
                            }}
                            checkboxSelection
                            disableRowSelectionOnClick
                            sx={{
                                border: 0,
                                height: '100%',
                                minHeight: 500,
                                '& .MuiDataGrid-cell': {
                                    py: 1.5
                                },
                                '& .MuiDataGrid-columnHeaders': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                                    borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                },
                                '& .MuiDataGrid-row:hover': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                                },
                                '& .MuiDataGrid-footerContainer': {
                                    borderTop: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                                },
                                '& .MuiDataGrid-virtualScroller': {
                                    backgroundColor: alpha(theme.palette.background.paper, 0.5),
                                },
                                '& .MuiCheckbox-root': {
                                    color: alpha(theme.palette.primary.main, 0.6),
                                },
                                '& .MuiDataGrid-toolbarContainer': {
                                    padding: 0,
                                },
                                '& .MuiDataGrid-columnHeaderTitle': {
                                    fontWeight: 600,
                                },
                            }}
                            getRowClassName={(params) =>
                                params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row'
                            }
                        />
                    </CardContent>
                </Card>
            </Fade>
        </Box>
    );
};

export default DinamicTableMascotas;