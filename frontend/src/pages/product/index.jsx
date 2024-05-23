import React, { useContext, useState, useEffect } from 'react';
import { Layout } from '../../components/layout';
import { InventorySystemContext } from '../../context';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Pagination, Menu, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { AddIcon, CheckIcon } from '../../components/icons';
import { apiurl } from '../../api';
import { EditProduct } from '../../components/editProduct';

function Products() {
    const context = useContext(InventorySystemContext);
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const [formData, setFormData] = useState({
        name: '',
        model: '',
        price: '',
        stock: '',
        provider_ID: ''
    });

    const [suppliers, setSuppliers] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await fetch(`${apiurl}/providers`);
                const data = await response.json();
                setSuppliers(data);
            } catch (error) {
                console.error('Error fetching suppliers:', error);
            }
        };

        fetchSuppliers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.model || !formData.price || !formData.stock || !formData.provider_ID) {
            alert('Todos los campos son obligatorios');
            return;
        }

        try {
            const response = await fetch(`${apiurl}/tires`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Error al guardar el Producto');
            }
            const newProduct = await response.json();
            context.setProducts([...context.products, newProduct]);
            alert('Producto guardado con éxito');
        } catch (error) {
            alert(`Error al guardar el Producto ${error.message}`);
        }
    };

    const handleMenuClick = (event, product) => {
        setAnchorEl(event.currentTarget);
        setSelectedProduct(product);
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
            const response = await fetch(`${apiurl}/tires/${selectedProduct.id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el Producto');
            }
            context.setProducts(context.products.filter(product => product.id !== selectedProduct.id));
            alert('Producto eliminado con éxito');
            handleMenuClose();
        } catch (error) {
            alert(`Error al eliminar el Producto ${error.message}`);
        }
    };

    const handleUpdate = (updatedProduct) => {
        context.setProducts(context.products.map(product =>
            product.id === updatedProduct.id ? updatedProduct : product
        ));
    };

    const renderIcon = (id, data) => {
        const isInCart = context.cartProducts.filter(product => product.id === id).length > 0;

        if (isInCart) {
            return (
                <div className='flex justify-center items-center text-red-500 w-6 h-6 rounded-full m-2 p-1'
                    onClick={(e) => {
                        e.stopPropagation();
                    }}>
                    <CheckIcon />
                </div>
            );
        } else {
            return (
                <div className='flex justify-center items-center bg-black text-white w-6 h-6 m-2 p-1'
                    onClick={(e) => {
                        e.stopPropagation();
                        addProductsToCart(data);
                        console.log(data);
                    }}>
                    <AddIcon />
                </div>
            );
        }
    };

    const addProductsToCart = (productData) => {
        context.setCartProducts([...context.cartProducts, productData]);
        context.setCount(context.count + 1);
        context.openCheckoutSideMenu();
        console.log(context.cartProducts);
    };

    const renderView = () => {
        if (context.filteredItems?.length > 0) {
            const startIndex = (page - 1) * itemsPerPage;
            const paginatedItems = context.filteredItems.slice(startIndex, startIndex + itemsPerPage);

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
                                <TableCell>Marca</TableCell>
                                <TableCell>Modelo</TableCell>
                                <TableCell>Cantidad</TableCell>
                                <TableCell>Precio ($)</TableCell>
                                <TableCell>Proveedor</TableCell>
                                <TableCell>Acción</TableCell>
                                <TableCell>Agregar al Carrito</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell><img src="https://e7.pngegg.com/pngimages/525/536/png-clipart-tires-tires.png" alt={item.category} width="50" /></TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.model}</TableCell>
                                    <TableCell>{item.stock}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell>{item.supplierName}</TableCell>
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
                                    <TableCell>
                                        {renderIcon(item.id, item)}
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
                    <h2 className="text-lg">Agregar Nuevo Producto</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="border-y-2 pb-2">
                            <p>PRODUCT INFO</p>
                            <p className="font-semibold">Marca</p>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Michelin"
                                className="bg-grayInput rounded-xl p-2"
                            />
                            <p className="font-semibold mt-3">Modelo de llanta</p>
                            <input
                                type="text"
                                name="model"
                                value={formData.model}
                                onChange={handleInputChange}
                                placeholder="195/65/r16"
                                className="bg-grayInput rounded-xl p-2"
                            />
                            <p className="font-semibold mt-3">Precio ($)</p>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                placeholder="1200"
                                className="bg-grayInput rounded-xl p-2"
                            />
                            <p className="font-semibold mt-3">Stock</p>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleInputChange}
                                placeholder="4"
                                className="bg-grayInput rounded-xl p-2"
                            />
                            <p className="font-semibold mt-3">Proveedor</p>
                            <FormControl fullWidth>
                                <InputLabel id="supplier-label">Proveedor</InputLabel>
                                <Select
                                    labelId="supplier-label"
                                    name="provider_ID"
                                    value={formData.provider_ID}
                                    onChange={handleInputChange}
                                    className="bg-grayInput rounded-xl p-2"
                                >
                                    {suppliers.map((supplier) => (
                                        <MenuItem key={supplier.id} value={supplier.id}>
                                            {supplier.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <button type="submit" className="bg-blue-500 text-white rounded-xl p-2 mt-4">
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
                <div className='w-full flex flex-col items-center justify-center bg-grayInput'>
                    <input
                        type='text'
                        placeholder='Buscar Producto'
                        className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
                        onChange={(e) => {
                            context.setSearchByTitle(e.target.value);
                        }}
                    />
                    {renderView()}
                </div>
                {isEditModalOpen && (
                    <EditProduct
                        product={selectedProduct}
                        onClose={() => setIsEditModalOpen(false)}
                        onUpdate={handleUpdate}
                    />
                )}
            </div>
        </Layout>
    );
}

export { Products };
