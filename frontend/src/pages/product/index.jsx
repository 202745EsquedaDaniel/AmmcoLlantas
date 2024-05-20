import React, { useContext, useState } from 'react';
import { Layout } from '../../components/layout';
import { InventorySystemContext } from '../../context';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Pagination } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { AddIcon, CheckIcon } from '../../components/icons';

function Products() {
    const context = useContext(InventorySystemContext);
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;

    const handlePageChange = (event, value) => {
        setPage(value);
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
                                    <TableCell>
                                        <IconButton>
                                            <MoreVertIcon />
                                        </IconButton>
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
                    <div className="border-y-2 pb-2">
                        <p>PRODUCT INFO</p>
                        <p className="font-semibold">Marca</p>
                        <input type="text" placeholder="Michelin" className="bg-grayInput rounded-xl p-2" />
                        <p className="font-semibold mt-3">Modelo de llanta</p>
                        <input type="text" placeholder="265/65/R16" className="bg-grayInput rounded-xl p-2" />
                        <p className="font-semibold mt-3">Precio ($)</p>
                        <input type="number" placeholder="1200" className="bg-grayInput rounded-xl p-2" />
                        <p className="font-semibold mt-3">Stock</p>
                        <input type="number" placeholder="4" className="bg-grayInput rounded-xl p-2" />
                    </div>
                    <div>
                        <button className="bg-blue-500 text-white rounded-xl p-2 mt-4">Guardar</button>
                    </div>
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
            </div>
        </Layout>
    );
}

export { Products };
