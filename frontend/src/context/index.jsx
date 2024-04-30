import { createContext } from "react"

const InventorySystemContext = createContext()

export const InventorySystemProvider = ({children}) => {
    return (
        <InventorySystemContext.Provider>
            {children}
        </InventorySystemContext.Provider>
    )
}

export {InventorySystemContext}