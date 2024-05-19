import { createContext, useEffect, useState } from "react"
import { apiurl } from "../api"

const InventorySystemContext = createContext()

export const InventorySystemProvider = ({children}) => {

    //cart
    const [items, setItems] = useState(null)
    const [count, setCount] = useState(0)
    const [cartProducts, setCartProducts] = useState([])

    //cart aside checkout
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

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
            setItems,
            count,
            setCount,
            cartProducts,
            setCartProducts,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu
        }}
        >
            {children}
        </InventorySystemContext.Provider>
    )
}

export {InventorySystemContext}