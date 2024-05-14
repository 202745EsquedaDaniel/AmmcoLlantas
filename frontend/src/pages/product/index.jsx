import { useContext } from "react"
import { Layout } from "../../components/layout"
import { InventorySystemContext } from "../../context"
import { Card } from "../../components/card"

function Products(){
    const context = useContext(InventorySystemContext)
    const renderView = () => {
        if(context.items?.length > 0) {
            return (
                context.items?.map(item=> (
                <Card key={item.id} data={item}></Card>
            )
        )
    )}
         else {
            return <p>No hay productos</p>
        }
    }
    return(
        

        <Layout>
            <div className=" flex items-center justify-center w-80 relative">
                <h1>Llantas</h1>
                {
                    renderView()
                }
            </div>
            
        </Layout>
                

    )
}

export {Products}