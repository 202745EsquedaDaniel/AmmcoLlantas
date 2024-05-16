import React, { useContext } from 'react';
import { Layout } from '../../components/layout';
import { InventorySystemContext } from '../../context';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch, IconButton } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

function Products() {
    const context = useContext(InventorySystemContext);

    const renderView = () => {
        if (context.items?.length > 0) {
            return (
                <TableContainer component={Paper} className=" "                   
               sx={{
                    width: '90%',
                    borderRadius: '16px', 
                    boxShadow: 'none', 
                    overflow: 'hidden' 
                }}
            >
                    <Table className=' rounded-2xl '>
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Brand Name</TableCell>
                                <TableCell>Model Name</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Price ($)</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {context.items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell><img src="https://e7.pngegg.com/pngimages/525/536/png-clipart-tires-tires.png" alt={item.category} width="50" /></TableCell>
        
                                    <TableCell>{item.brand}</TableCell>
                                    <TableCell>{item.model}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell>
                                        <IconButton>
                                            <MoreVertIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        } else {
            return <p>No hay productos</p>;
        }
    };

    return(
        

        <Layout>
            <div className=" flex relative">
                <div className=" bg-white h-screen p-4">
                    <h2 className=" text-lg">Agregar Nuevo Producto</h2>
                    <div className=" border-y-2 pb-2">
                        <p>PRODUCT INFO</p>
                        <p className=" font-semibold">Marca</p>
                        <input type="text" placeholder="Michelin"  className=" bg-grayInput rounded-xl p-2"/>
                        <p className=" font-semibold mt-3">Modelo de llanta</p>
                        <input type="text" placeholder="265/65/R16"  className=" bg-grayInput rounded-xl p-2"/>
                        <p className=" font-semibold mt-3">Precio ($)</p>
                        <input type="number" placeholder="1200"  className=" bg-grayInput rounded-xl p-2"/>
                        <p className=" font-semibold mt-3">Stock</p>
                        <input type="number" placeholder="4"  className=" bg-grayInput rounded-xl p-2"/>
                    </div>
                    <div>
                        <button className=" bg-blue-500 text-white rounded-xl p-2 mt-4">Guardar</button>
                    </div>
                </div>
                <div className=' w-full flex items-center justify-center bg-grayInput '>
                    
                    {
                    renderView()
                    }
        
                </div>

            </div>
            
        </Layout>
                

    )
}

export {Products}