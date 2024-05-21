import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../components/layout";
import { apiurl } from "../../api";
import { CartCard } from "../../components/cartCard";

function EditOrder() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [customerID, setCustomerID] = useState("");
    const [alineacion, setAlineacion] = useState(0);
    const [balanceo, setBalanceo] = useState(0);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const fetchOrder = async () => {
            const response = await fetch(`${apiurl}/orders/${id}`);
            const data = await response.json();
            setOrder(data);
            setCustomerID(data.customer_ID);
            setAlineacion(data.alineacion);
            setBalanceo(data.balanceo);
            const initialQuantities = {};
            data.orderDetails.forEach(detail => {
                initialQuantities[detail.tire_ID] = detail.quantity;
            });
            setQuantities(initialQuantities);
        };
        fetchOrder();
    }, [id]);

    const handleCustomerChange = (event) => {
        setCustomerID(Number(event.target.value));
    };

    const handleAlineacionChange = (event) => {
        setAlineacion(parseFloat(event.target.value));
    };

    const handleBalanceoChange = (event) => {
        setBalanceo(parseFloat(event.target.value));
    };

    const handleQuantityChange = (id, quantity) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: parseInt(quantity, 10),
        }));
    };

    const handleSubmit = async () => {
        const updatedOrder = {
            ...order,
            customer_ID: customerID,
            alineacion,
            balanceo,
            orderDetails: order.orderDetails.map(detail => ({
                ...detail,
                quantity: quantities[detail.tire_ID] || 0,
            })),
        };

        const response = await fetch(`${apiurl}/orders/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedOrder),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error updating order:", errorData);
            alert("Error updating order. Please try again.");
        } else {
            alert("Order updated successfully!");
        }
    };

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <div className="w-full p-4 bg-gray-100">
                <div className="mb-4 text-center">
                    <h1 className="text-2xl font-bold">Edit Order</h1>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        {order.orderDetails.map((detail) => (
                            <div key={detail.tire_ID} className="mb-4">
                                <CartCard
                                    id={detail.tire_ID}
                                    name={`Tire ${detail.tire_ID}`}
                                    price={detail.unitPrice}
                                />
                                <input
                                    type="number"
                                    placeholder="Cantidad"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={quantities[detail.tire_ID] || ''}
                                    onChange={(e) => handleQuantityChange(detail.tire_ID, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex-1 p-4 bg-white shadow rounded">
                        <div className="mb-4">
                            <label htmlFor="customer" className="block text-sm font-medium text-gray-700">
                                Select Customer:
                            </label>
                            <input
                                type="number"
                                id="customer"
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                value={customerID}
                                onChange={handleCustomerChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="alineacion" className="block text-sm font-medium text-gray-700">
                                Costo de Alineación:
                            </label>
                            <input
                                type="number"
                                id="alineacion"
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                value={alineacion}
                                onChange={handleAlineacionChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="balanceo" className="block text-sm font-medium text-gray-700">
                                Costo de Balanceo:
                            </label>
                            <input
                                type="number"
                                id="balanceo"
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                value={balanceo}
                                onChange={handleBalanceoChange}
                            />
                        </div>

                        <div>
                            <button
                                onClick={handleSubmit}
                                className="w-full p-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
                            >
                                Update Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export { EditOrder };
