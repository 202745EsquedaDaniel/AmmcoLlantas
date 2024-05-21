import { useState, useContext } from "react";
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
    if (isNaN(customerID) || customerID <= 0) {
      alert("Please select a valid customer.");
      return;
    }

    const orderTotal = context.order[index].products.reduce((sum, product) => {
      const productQuantity = quantities[product.id] || 0;
      return sum + productQuantity * product.price;
    }, 0) + alineacion + balanceo;

    // Crear la Order
    const newOrder = {
      customer_ID: customerID,
      date: new Date().toISOString(),
      alineacion,
      balanceo,
      pivotes: 1,
      total: orderTotal,
    };

    // POST Order y obtener el ID de la nueva Order
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

    // Crear OrderDetails
    const orderDetails = context.order[index].products.map((product) => ({
      order_ID: orderID,
      tire_ID: product.id,
      quantity: quantities[product.id] || 0,
      unitPrice: product.price,
    }));

    // POST OrderDetails
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
    }
  };

  return (
    <Layout>
      <div className="w-full flex bg-grayInput">
        <div className="flex items-center justify-center w-80 relative mb-2">
          <h1>My order</h1>
        </div>

        <div className="flex flex-col w-80">
          {context.order?.[index]?.products.map((product) => (
            <div key={product.id}>
              <CartCard
                id={product.id}
                name={product.name}
                imageUrl={product.images}
                price={product.price}
              />
              <input
                type="number"
                placeholder="Cantidad"
                value={quantities[product.id] || ''}
                onChange={(e) => handleQuantityChange(product.id, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="ml-2">
          <div>
            <label htmlFor="customer">Select Customer: </label>
            <select id="customer" value={customerID} onChange={handleCustomerChange}>
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

          <div>
            <label htmlFor="alineacion">Costo de Alineación: </label>
            <input
              type="number"
              id="alineacion"
              value={alineacion}
              onChange={handleAlineacionChange}
            />
          </div>

          <div>
            <label htmlFor="balanceo">Costo de Balanceo: </label>
            <input
              type="number"
              id="balanceo"
              value={balanceo}
              onChange={handleBalanceoChange}
            />
          </div>

          <div>
            <button onClick={handleSubmit}>Submit Order</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export { MyOrder };