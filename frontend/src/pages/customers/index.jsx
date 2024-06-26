import React, { useContext, useState } from 'react';
import { Layout } from '../../components/layout';
import { InventorySystemContext } from '../../context';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Pagination, Menu, MenuItem } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { AddIcon, CheckIcon, CustomersIcon } from '../../components/icons';
import { apiurl } from '../../api';
import { EditCustomer } from '../../components/editCustomer'; // Import the EditCustomer component

function Customers() {
    const context = useContext(InventorySystemContext);
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const [formData, setFormData] = useState({
        name: '',
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
        if (!formData.name || !formData.contactPhone || !formData.email) {
            alert('Todos los campos son obligatorios');
            return;
        }

        try {
            const response = await fetch(`${apiurl}/customers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Error al guardar el Cliente');
            }
            const newCustomer = await response.json();
            context.setCustomer([...context.customers, newCustomer]);
            alert('Cliente guardado con éxito');
        } catch (error) {
            alert(`Error al guardar el Cliente ${error.message}`);
        }
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleMenuClick = (event, customer) => {
        setAnchorEl(event.currentTarget);
        setSelectedCustomer(customer);
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
            const response = await fetch(`${apiurl}/customers/${selectedCustomer.id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el Cliente');
            }
            context.setCustomer(context.customers.filter(customer => customer.id !== selectedCustomer.id));
            alert('Cliente eliminado con éxito');
            handleMenuClose();
        } catch (error) {
            alert(`Error al eliminar el Cliente ${error.message}`);
        }
    };

    const handleUpdate = (updatedCustomer) => {
        context.setCustomer(context.customers.map(customer =>
            customer.id === updatedCustomer.id ? updatedCustomer : customer
        ));
    };

    const renderView = () => {
        if (context.filteredItems?.length > 0) {
            const startIndex = (page - 1) * itemsPerPage;
            const paginatedItems = context.customers.slice(startIndex, startIndex + itemsPerPage);

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
                                <TableCell>Telefono</TableCell>
                                <TableCell>email</TableCell>
                                <TableCell>Acción</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell><CustomersIcon /></TableCell>
                                    <TableCell>{item.name}</TableCell>
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
                    <h2 className="text-lg">Agregar Nuevo Cliente</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="border-y-2 pb-2">
                            <p>Proveedor INFO</p>
                            <p className="font-semibold">Nombre</p>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Antonio"
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
                    <EditCustomer
                        customer={selectedCustomer}
                        onClose={() => setIsEditModalOpen(false)}
                        onUpdate={handleUpdate}
                    />
                )}
            </div>
        </Layout>
    );
}

export { Customers };
