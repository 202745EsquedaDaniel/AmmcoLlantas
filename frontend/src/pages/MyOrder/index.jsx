import { useContext } from "react"
import { InventorySystemContext } from "../../context"
import { Layout } from "../../components/layout"
import { OrdersCard } from "../../components/ordersCard"
import { CartCard } from "../../components/cartCard"

function MyOrder () {
    const context = useContext(InventorySystemContext)
    const currenthPath = window.location.pathname
    let index = currenthPath.substring(currenthPath.lastIndexOf('/') + 1)
    if (index === 'last') {
        index = context.order.length - 1
    }
    return (
        <Layout>
            <div className=" flex items-center justify-center w-80 relative mb-2">
                <h1>My order</h1>
            </div>

            <div className='flex flex-col w-80'>
        {
          context.order?.[index]?.products.map(product => (
            <CartCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.images}
              price={product.price}
            />
          ))
        }
        </div>
      </Layout>
    )
}

export { MyOrder }