import { createContext, useEffect, useState } from "react"
import { apiurl } from "../api"

const InventorySystemContext = createContext()

export const InventorySystemProvider = ({children}) => {

    const [items, setItems] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch( `${apiurl}/tires`)
                const data = await res.json()
                setItems(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
    console.log(items)

    return (
        <InventorySystemContext.Provider
        value={{
            items,
            setItems
        }}
        >
            {children}
        </InventorySystemContext.Provider>
    )
}

export {InventorySystemContext}