import { createContext, useEffect, useState } from "react";
import { apiurl } from "../api";

const InventorySystemContext = createContext();

export const InventorySystemProvider = ({ children }) => {
    const [order, setOrder] = useState([]);
    const [searchByTitle, setSearchByTitle] = useState(null);
    const [items, setItems] = useState(null);
    const [products, setProducts] = useState([]); // Add products state
    const [providers, setProviders] = useState(null);
    const [customers, setCustomer] = useState([]);
    const [count, setCount] = useState(0);
    const [cartProducts, setCartProducts] = useState([]);
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
    const [filteredItems, setFilteredItems] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${apiurl}/tires`);
                const data = await res.json();
                setItems(data);
                setProducts(data); // Set products state
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${apiurl}/customers`);
                const data = await res.json();
                setCustomer(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${apiurl}/providers`);
                const data = await res.json();
                setProviders(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

    const filterItemsByTitle = (items, searchByTitle) => {
        return items?.filter(item => item.model.toLowerCase().includes(searchByTitle.toLowerCase()));
    };

    const filterBy = (searchType, items, searchByTitle) => {
        if (searchType === 'BY_TITLE') {
            return filterItemsByTitle(items, searchByTitle);
        }
        if (!searchByTitle) {
            return items;
        }
    };

    useEffect(() => {
        if (searchByTitle) {
            setFilteredItems(filterBy('BY_TITLE', items, searchByTitle));
        } else {
            setFilteredItems(items);
        }
    }, [searchByTitle, items]);

    // Update filteredItems when products change
    useEffect(() => {
        if (searchByTitle) {
            setFilteredItems(filterBy('BY_TITLE', products, searchByTitle));
        } else {
            setFilteredItems(products);
        }
    }, [products, searchByTitle]);

    return (
        <InventorySystemContext.Provider
            value={{
                items,
                setItems,
                products,
                setProducts,
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
                filteredItems,
                providers,
                setProviders,
                customers,
                setCustomer
            }}
        >
            {children}
        </InventorySystemContext.Provider>
    );
};

export { InventorySystemContext };
