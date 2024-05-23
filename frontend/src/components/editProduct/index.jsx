import React, { useState, useEffect } from 'react';
import { apiurl } from '../../api';

function EditProduct({ product, onClose, onUpdate }) {
    const [formData, setFormData] = useState({
        name: '',
        model: '',
        price: '',
        stock: ''
    });

    useEffect(() => {
        if (product) {
            const { name, model, price, stock } = product;
            setFormData({ name, model, price, stock });
        }
    }, [product]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.model || !formData.price || !formData.stock) {
            alert('Todos los campos son obligatorios');
            return;
        }

        try {
            const response = await fetch(`${apiurl}/tires/${product.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Error al actualizar el Producto');
            }
            const updatedProduct = await response.json();
            onUpdate(updatedProduct);
            onClose();
            alert('Producto actualizado con éxito');
        } catch (error) {
            alert(`Error al actualizar el Producto ${error.message}`);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg">
            <h2 className="text-lg">Editar Producto</h2>
            <form onSubmit={handleSubmit}>
                <div className="border-y-2 pb-2">
                    <p>Producto INFO</p>
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
                        placeholder="265/65/R16"
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
                </div>
                <div>
                    <button type="submit" className="bg-blue-500 text-white rounded-xl p-2 mt-4">
                        Guardar
                    </button>
                    <button type="button" onClick={onClose} className="bg-gray-500 text-white rounded-xl p-2 mt-4 ml-2">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export {EditProduct}