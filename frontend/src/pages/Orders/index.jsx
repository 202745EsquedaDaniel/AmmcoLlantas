import { useContext } from "react"
import { Layout } from "../../components/layout"
import { InventorySystemContext } from "../../context"
import { Link } from "react-router-dom"
import { OrdersCard } from "../../components/ordersCard"

function Orders(){
    const context = useContext(InventorySystemContext)
    return(
        <Layout>
            <div className=" flex items-center justify-center w-80 relative">
                <h1>Ordenes</h1>
            </div>
            { context.order.map((order, index)=> (
                <Link key={index} to={`/orders/${index}`}>
                    <OrdersCard
                    totalPrice={order.totalprice}
                    totalProducts={order.totalProducts}
                    >

                    </OrdersCard>
                </Link>
            ))

            }
        </Layout>
    )
}

export {Orders}