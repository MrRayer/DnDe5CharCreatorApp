import React, { createContext, useState } from "react";

export const InventoryContext = createContext();
export function InventoryProvider({ children }) {
    const [ inventory, setInventory ] = useState([])
    return (
        <InventoryContext.Provider value={{
                    inventory,setInventory,
                }}>
            {children}
        </InventoryContext.Provider>
    );
}