import React, { createContext, useState } from "react";

export const GlobalsContext = createContext();
export function GlobalsProvider({ children }) {
    const [shaderFlag, setShaderFlag] = useState(false);
    const [popupName, setPopupName] = useState("none");
    return (
            <GlobalsContext.Provider value={{ shaderFlag,setShaderFlag,popupName,setPopupName }}>
                {children}
            </GlobalsContext.Provider>
        );
    }