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
            <div className=" flex relative">
                <div className=" bg-white h-screen p-4">
                    <h2 className=" text-lg">Agregar Nuevo Producto</h2>
                    <div className=" border-y-2 pb-2">
                        <p>PRODUCT INFO</p>
                        <p className=" font-semibold">Marca</p>
                        <input type="text" placeholder="Michelin"  className=" bg-grayInput rounded-xl p-2"/>
                        <p className=" font-semibold mt-3">Modelo de llanta</p>
                        <input type="text" placeholder="265/65/R16"  className=" bg-grayInput rounded-xl p-2"/>
                        <p className=" font-semibold mt-3">Precio ($)</p>
                        <input type="number" placeholder="1200"  className=" bg-grayInput rounded-xl p-2"/>
                        <p className=" font-semibold mt-3">Stock</p>
                        <input type="number" placeholder="4"  className=" bg-grayInput rounded-xl p-2"/>
                    </div>
                    <div>
                        <button className=" bg-blue-500 text-white rounded-xl p-2 mt-4">Guardar</button>
                    </div>
                </div>
                <div>
                {
                    renderView()
                }
                </div>

            </div>
            
        </Layout>
                

    )
}

export {Products}