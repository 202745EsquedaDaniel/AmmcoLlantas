import { useState, useContext, useEffect } from "react";
import { InventorySystemContext } from "../../context";
import { Layout } from "../../components/layout";
import { CartCard } from "../../components/cartCard";
import { apiurl } from "../../api";

function MyOrder() {
  const context = useContext(InventorySystemContext);
  const currentPath = window.location.pathname;
  let index = currentPath.substring(currentPath.lastIndexOf("/") + 1);
  if (index === "last") {
    index = context.order.length - 1;
  }

  const [customerID, setCustomerID] = useState("");
  const [alineacion, setAlineacion] = useState(0);
  const [balanceo, setBalanceo] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [pivotes, setPivotes] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [applyIva, setApplyIva] = useState(true);
  const pivoteCost = 30;
  const ivaRate = 0.06;

  useEffect(() => {
    const productSubtotal = context.order[index].products.reduce((sum, product) => {
      const productQuantity = quantities[product.id] || 0;
      return sum + productQuantity * product.price;
    }, 0);
    const pivotesTotal = pivotes * pivoteCost;
    const tempSubtotal = productSubtotal + alineacion + balanceo + pivotesTotal;
    const ivaAmount = applyIva ? tempSubtotal * ivaRate : 0;
    setSubtotal(tempSubtotal);
    setIva(ivaAmount);
    setTotal(tempSubtotal + ivaAmount);
  }, [quantities, alineacion, balanceo, pivotes, applyIva, context.order, index]);

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
    if (isNaN(customerID) || customerID <= 0) {
      alert("Please select a valid customer.");
      return;
    }

    const newOrder = {
      customer_ID: customerID,
      date: new Date().toISOString(),
      alineacion,
      balanceo,
      pivotes,
      total,
    };

    const response = await fetch(`${apiurl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error creating order:", errorData);
      alert("Error creating order. Please try again.");
      return;
    }

    const createdOrder = await response.json();
    const orderID = createdOrder.id;

    const orderDetails = context.order[index].products.map((product) => ({
      order_ID: orderID,
      tire_ID: product.id,
      quantity: quantities[product.id] || 0,
      unitPrice: product.price,
    }));

    const orderDetailsResponse = await Promise.all(
      orderDetails.map((detail) =>
        fetch(`${apiurl}/orderDetails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(detail),
        })
      )
    );

    const hasError = orderDetailsResponse.some(response => !response.ok);

    if (hasError) {
      console.error("Error creating order details:", orderDetailsResponse);
      alert("Error creating order details. Please try again.");
    } else {
      window.location.href = `https://ammcollantas-production.up.railway.app/orders/${orderID}`;
    }
  };

  return (
    <Layout>
      <div className="w-full p-4 bg-gray-100">
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-bold">Cotizar</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            {context.order?.[index]?.products.map((product) => {
              const productQuantity = quantities[product.id] || 0;
              const productTotal = productQuantity * product.price;
              return (
                <div key={product.id} className="mb-4 flex items-center">
                  <CartCard
                    id={product.id}
                    name={product.name}
                    model={product.model}
                    imageUrl={product.images}
                    price={product.price}
                  />
                  <div className="flex-1 ml-4">
                    <input
                      type="number"
                      placeholder="Cantidad"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={quantities[product.id] || ''}
                      onChange={(e) => handleQuantityChange(product.id, e.target.value)}
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

            <div>
              <button
                onClick={handleSubmit}
                className="w-full p-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
              >
                Submit Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export { MyOrder };
