import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../components/layout";
import { apiurl } from "../../api";
import { CartCard } from "../../components/cartCard";
import { InventorySystemContext } from "../../context";
import { downloadPdf } from "../../utils/ticket"; // Importar la función de descarga del PDF

const fetchTires = async () => {
  const response = await fetch(`${apiurl}/tires`);
  const data = await response.json();
  return data;
};

function EditOrder() {
  const { id } = useParams();
  const context = useContext(InventorySystemContext);
  const [order, setOrder] = useState(null);
  const [customerID, setCustomerID] = useState("");
  const [alineacion, setAlineacion] = useState(0);
  const [balanceo, setBalanceo] = useState(0);
  const [pivotes, setPivotes] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [applyIva, setApplyIva] = useState(true);
  const [tires, setTires] = useState([]);
  const pivoteCost = 30;
  const ivaRate = 0.06;

  useEffect(() => {
    const fetchOrderAndTires = async () => {
      const [orderResponse, tiresData] = await Promise.all([
        fetch(`${apiurl}/orders/${id}`),
        fetchTires()
      ]);

      const orderData = await orderResponse.json();
      setOrder(orderData);
      setCustomerID(orderData.customer_ID);
      setAlineacion(orderData.alineacion);
      setBalanceo(orderData.balanceo);
      setPivotes(orderData.pivotes);
      setTires(tiresData);

      const initialQuantities = {};
      orderData.orderDetails.forEach(detail => {
        initialQuantities[detail.tire_ID] = detail.quantity;
      });
      setQuantities(initialQuantities);
    };
    fetchOrderAndTires();
  }, [id]);

  useEffect(() => {
    if (order) {
      const productSubtotal = order.orderDetails.reduce((sum, detail) => {
        const productQuantity = quantities[detail.tire_ID] || 0;
        return sum + productQuantity * detail.unitPrice;
      }, 0);
      const pivotesTotal = pivotes * pivoteCost;
      const tempSubtotal = productSubtotal + alineacion + balanceo + pivotesTotal;
      const ivaAmount = applyIva ? tempSubtotal * ivaRate : 0;
      setSubtotal(tempSubtotal);
      setIva(ivaAmount);
      setTotal(tempSubtotal + ivaAmount);
    }
  }, [quantities, alineacion, balanceo, pivotes, applyIva, order]);

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

  const handlePivotesChange = (event) => {
    setPivotes(parseInt(event.target.value, 10));
  };

  const handleIvaChange = () => {
    setApplyIva((prev) => !prev);
  };

  const handleSubmit = async () => {
    const updatedOrder = {
      ...order,
      customer_ID: customerID,
      alineacion,
      balanceo,
      pivotes,
      orderDetails: order.orderDetails.map(detail => ({
        ...detail,
        quantity: quantities[detail.tire_ID] || 0,
      })),
      total,
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

  const getTireDetails = (tire_ID) => {
    const tire = tires.find(t => t.id === tire_ID);
    return tire ? { name: tire.name, model: tire.model } : { name: '', model: '' };
  };

  return (
    <Layout>
      <div className="w-full p-4 bg-gray-100">
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-bold">Folio: {order.id}</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            {order.orderDetails.map((detail) => {
              const productQuantity = quantities[detail.tire_ID] || 0;
              const productTotal = productQuantity * detail.unitPrice;
              const { name, model } = getTireDetails(detail.tire_ID);
              return (
                <div key={detail.tire_ID} className="mb-4 flex items-center">
                  <CartCard
                    id={detail.tire_ID}
                    name={`${name} ${model}`}
                    price={detail.unitPrice}
                  />
                  <div className="flex-1 ml-4">
                    <input
                      type="number"
                      placeholder="Cantidad"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={quantities[detail.tire_ID] || ''}
                      onChange={(e) => handleQuantityChange(detail.tire_ID, e.target.value)}
                    />
                    <div className="mt-2 text-right text-sm text-gray-700">
                      Total: ${productTotal.toFixed(2)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex-1 p-4 bg-white shadow rounded">
            <div className="mb-4">
              <label htmlFor="customer" className="block text-sm font-medium text-gray-700">
                Select Customer:
              </label>
              <select
                id="customer"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                value={customerID}
                onChange={handleCustomerChange}
              >
                <option value="" disabled>
                  Select a customer
                </option>
                {context.customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
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

            <div className="mb-4">
              <label htmlFor="pivotes" className="block text-sm font-medium text-gray-700">
                Número de Pivotes:
              </label>
              <input
                type="number"
                id="pivotes"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                value={pivotes}
                onChange={handlePivotesChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="applyIva" className="flex items-center">
                <input
                  type="checkbox"
                  id="applyIva"
                  checked={applyIva}
                  onChange={handleIvaChange}
                  className="mr-2"
                />
                Aplicar 6% de IVA
              </label>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-bold">Subtotal de llantas: ${subtotal.toFixed(2)}</h2>
              <h2 className="text-lg font-bold">IVA (6%): ${iva.toFixed(2)}</h2>
              <h2 className="text-lg font-bold">Total: ${total.toFixed(2)}</h2>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                className="w-full p-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
              >
                Update Order
              </button>
              <button
                onClick={() => downloadPdf(order, subtotal, iva, total)}
                className="w-full p-2 bg-green-600 text-white font-bold rounded hover:bg-green-700"
              >
                Imprimir
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export { EditOrder };
