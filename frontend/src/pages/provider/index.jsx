import React, { useContext, useState } from 'react';
import { Layout } from '../../components/layout';
import { InventorySystemContext } from '../../context';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Pagination, Menu, MenuItem } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { apiurl } from '../../api';
import { EditProvider } from '../../components/editProvider';
import { ProvidersIcon } from '../../components/icons';

function Providers() {
    const context = useContext(InventorySystemContext);
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        contactPhone: '',
        email: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.address || !formData.contactPhone || !formData.email) {
            alert('Todos los campos son obligatorios');
            return;
        }

        try {
            const response = await fetch(`${apiurl}/providers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Error al guardar el Proveedor');
            }
            const newProvider = await response.json();
            context.setProviders([...context.providers, newProvider]);
            alert('Proveedor guardado con éxito');
        } catch (error) {
            alert(`Error al guardar el Proveedor ${error.message}`);
        }
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleMenuClick = (event, provider) => {
        setAnchorEl(event.currentTarget);
        setSelectedProvider(provider);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        setIsEditModalOpen(true);
        handleMenuClose();
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`${apiurl}/providers/${selectedProvider.id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el Proveedor');
            }
            context.setProviders(context.providers.filter(provider => provider.id !== selectedProvider.id));
            alert('Proveedor eliminado con éxito');
            handleMenuClose();
        } catch (error) {
            alert(`Error al eliminar el Proveedor ${error.message}`);
        }
    };

    const handleUpdate = (updatedProvider) => {
        context.setProviders(context.providers.map(provider =>
            provider.id === updatedProvider.id ? updatedProvider : provider
        ));
    };

    const renderView = () => {
        if (context.filteredItems?.length > 0) {
            const startIndex = (page - 1) * itemsPerPage;
            const paginatedItems = context.providers.slice(startIndex, startIndex + itemsPerPage);

            return (
                <TableContainer component={Paper} className=""
                    sx={{
                        width: '90%',
                        borderRadius: '16px',
                        boxShadow: 'none',
                        overflow: 'hidden'
                    }}
                >
                    <Table className='rounded-2xl'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Imagen</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Direccion</TableCell>
                                <TableCell>Telefono</TableCell>
                                <TableCell>email</TableCell>
                                <TableCell>Acción</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell><ProvidersIcon></ProvidersIcon></TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.address}</TableCell>
                                    <TableCell>{item.contactPhone}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={(event) => handleMenuClick(event, item)}>
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleMenuClose}
                                        >
                                            <MenuItem onClick={handleEdit}>Editar</MenuItem>
                                            <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Pagination
                        count={Math.ceil(context.filteredItems.length / itemsPerPage)}
                        page={page}
                        onChange={handlePageChange}
                        sx={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}
                    />
                </TableContainer>
            );
        } else {
            return <p>No hay productos</p>;
        }
    };

    return (
        <Layout>
            <div className="w-full flex relative">
                <div className="bg-white h-screen p-4">
                    <h2 className="text-lg">Agregar Nuevo Proveedor</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="border-y-2 pb-2">
                            <p>Proveedor INFO</p>
                            <p className="font-semibold">Nombre</p>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Llantera del 7"
                                className="bg-grayInput rounded-xl p-2"
                            />
                            <p className="font-semibold mt-3">Direccion</p>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Valentin Fuentes"
                                className="bg-grayInput rounded-xl p-2"
                            />
                            <p className="font-semibold mt-3">Telefono</p>
                            <input
                                type="number"
                                name="contactPhone"
                                value={formData.contactPhone}
                                onChange={handleInputChange}
                                placeholder="656"
                                className="bg-grayInput rounded-xl p-2"
                            />
                            <p className="font-semibold mt-3">email</p>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="dani@mail.com"
                                className="bg-grayInput rounded-xl p-2"
                            />
                        </div>
                        <div>
                            <button type="submit" className="bg-blue-500 text-white rounded-xl p-2 mt-4">
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
                <div className='w-full flex flex-col items-center justify-center bg-grayInput'>
                    {renderView()}
                </div>
                {isEditModalOpen && (
                    <EditProvider
                        provider={selectedProvider}
                        onClose={() => setIsEditModalOpen(false)}
                        onUpdate={handleUpdate}
                    />
                )}
            </div>
        </Layout>
    );
}

export { Providers };
