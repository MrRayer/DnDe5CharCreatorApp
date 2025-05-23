import React, { createContext, useState } from "react";

export const GlobalsContext = createContext();
export function GlobalsProvider({ children }) {
    const [shaderFlag, setShaderFlag] = useState(false);
    const [contentFlag, setContentFlag] = useState("mainMenu")
    const [popupName, setPopupName] = useState("none");
    const [abilityToShow, setAbilityToShow] = useState("none");
    const [choosingType, setChoosingType] = useState("none");
    return (
            <GlobalsContext.Provider value={{
                    shaderFlag, setShaderFlag,
                    popupName, setPopupName,
                    contentFlag, setContentFlag,
                    abilityToShow, setAbilityToShow,
                    choosingType, setChoosingType
                    }}>
                {children}
            </GlobalsContext.Provider>
        );
    }