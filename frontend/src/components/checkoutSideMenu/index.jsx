import { useContext } from "react";
import { InventorySystemContext } from "../../context";
import { CartCard } from "../cartCard";
import { XIcon } from "../icons";
import { totalprice } from "../../utils/totalPrice";
import "./styles.css";
import { Link } from "react-router-dom";

const CheckoutSideMenu = () => {
    const context = useContext(InventorySystemContext)

    const handleDelete = (id) => {
        const filteredProducts = context.cartProducts.filter(product => product.id !== id)
        context.setCartProducts(filteredProducts)
        context.setCount(context.count - 1)
    }

    return(
        <aside className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} scrollable-cards w-[360px] h-[calc(100vh-60px)] top-20 flex-col fixed right-0 border border-black rounded-lg bg-white `}>
            <div className="flex justify-between items-center p-6">
                <h2 className=" font-medium">Nueva Orden</h2>
                <div className=" cursor-pointer"
                onClick={context.closeCheckoutSideMenu}
                >
                    <XIcon />
                </div>
            </div>

            <div className=" px-6 flex-1">
                {
                    context.cartProducts.map(product => (
                        <CartCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        handleDelete={handleDelete}
                        />
                    ))
                }
            </div>
            <div className=" px-6 mb-6">
                <p className=" flex justify-between items-center mb-2">
                    <span className=" font-light">Total:</span>
                    <span className=" font-medium text-2xl">${totalprice(context.cartProducts)}</span>
                </p>
                <Link to="/my-orders/last">
                    <button className=" w-full bg-black text-white py-3 rounded-lg"
                    >Checkout</button>
                </Link>
            </div>
        </aside>
    )
}

export {CheckoutSideMenu}