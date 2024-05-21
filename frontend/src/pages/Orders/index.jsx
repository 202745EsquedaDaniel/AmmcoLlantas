import { useState, useEffect, useContext } from "react";
import { Layout } from "../../components/layout";
import { InventorySystemContext } from "../../context";
import { Link } from "react-router-dom";
import { OrdersCard } from "../../components/ordersCard";
import { apiurl } from "../../api";

function Orders() {
    const context = useContext(InventorySystemContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch(`${apiurl}/orders`);
            const data = await response.json();
            setOrders(data);
        };
        fetchOrders();
    }, []);

    return (
        <Layout>
            <div className="flex items-center justify-center w-80 relative">
                <h1>Ordenes</h1>
            </div>
            {orders.map((order) => (
                <Link key={order.id} to={`/orders/${order.id}`}>
                    <OrdersCard
                        totalPrice={order.total}
   
                    />
                </Link>
            ))}
        </Layout>
    );
}

export { Orders };
