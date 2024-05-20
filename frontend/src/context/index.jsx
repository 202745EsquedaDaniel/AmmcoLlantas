import { createContext, useEffect, useState } from "react"
import { apiurl } from "../api"

const InventorySystemContext = createContext()

export const InventorySystemProvider = ({children}) => {
    const [order, setOrder] = useState([])

    const [searchByTitle, setSearchByTitle] = useState(null)

    //cart
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
    

    const [count, setCount] = useState(0)
    const [cartProducts, setCartProducts] = useState([])

    //cart aside checkout
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

    const [filteredItems, setFilteredItems] = useState(null)

    const filterItemsByTitle = (items, searchByTitle) => {
        return items?.filter(item => item.model.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    const filterBy = (searchType, items, searchByTitle) => {
        if (searchType === 'BY_TITLE') {
            return filterItemsByTitle(items, searchByTitle)
          }
        if (!searchByTitle) {
            return items
        }
    }

    useEffect(() => {
        if (searchByTitle) {
            setFilteredItems(filterBy('BY_TITLE', items, searchByTitle))
        } else {
            setFilteredItems(items)
        }
    }, [searchByTitle, items])




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
            closeCheckoutSideMenu,
            order,
            setOrder,
            setSearchByTitle,
            searchByTitle,
            filteredItems
        }}
        >
            {children}
        </InventorySystemContext.Provider>
    )
}

export {InventorySystemContext}