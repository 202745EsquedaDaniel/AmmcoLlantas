import React, { useState, useEffect } from 'react';
import { apiurl } from '../../api';

function EditProvider({ provider, onClose, onUpdate }) {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        contactPhone: '',
        email: ''
    });

    useEffect(() => {
        if (provider) {
            const { name, address, contactPhone, email } = provider;
            setFormData({ name, address, contactPhone, email });
        }
    }, [provider]);

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
            const response = await fetch(`${apiurl}/providers/${provider.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Error al actualizar el Proveedor');
            }
            const updatedProvider = await response.json();
            onUpdate(updatedProvider);
            onClose();
            alert('Proveedor actualizado con éxito');
        } catch (error) {
            alert(`Error al actualizar el Proveedor ${error.message}`);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg">
            <h2 className="text-lg">Editar Proveedor</h2>
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
                    <button type="button" onClick={onClose} className="bg-gray-500 text-white rounded-xl p-2 mt-4 ml-2">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export {EditProvider}
