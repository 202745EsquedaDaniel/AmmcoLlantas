import { useContext } from "react"
import { Layout } from "../../components/layout"
import { InventorySystemContext } from "../../context"

function Products(){
    const context = useContext(InventorySystemContext)
    return(
        <Layout>
            <div className=" flex items-center justify-center w-80 relative">
                <h1>Llantas</h1>
            </div>
            
        </Layout>
                

    )
}

export {Products}