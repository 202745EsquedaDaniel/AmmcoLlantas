import React, { useState, useEffect } from 'react';
import { apiurl } from '../../api';

function EditCustomer({ customer, onClose, onUpdate }) {
    const [formData, setFormData] = useState({
        name: '',
        contactPhone: '',
        email: ''
    });

    useEffect(() => {
        if (customer) {
            const { name, contactPhone, email } = customer;
            setFormData({ name, contactPhone, email });
        }
    }, [customer]);

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
            const response = await fetch(`${apiurl}/customers/${customer.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Error al actualizar el Cliente');
            }
            const updatedCustomer = await response.json();
            onUpdate(updatedCustomer);
            onClose();
            alert('Cliente actualizado con éxito');
        } catch (error) {
            alert(`Error al actualizar el Cliente ${error.message}`);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg">
            <h2 className="text-lg">Editar Cliente</h2>
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
                    <button type="button" onClick={onClose} className="bg-gray-500 text-white rounded-xl p-2 mt-4 ml-2">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export {EditCustomer}