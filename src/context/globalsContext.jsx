import React, { createContext, useState } from "react";
import MainStats from "../components/content/SPECIAL/mainStats";
import CalculatedStats from "../components/content/calculatedStats/calculatedStats";
import Resources from "../components/content/resources/resources";
import RaceContainer from "../components/content/race/raceContainer";

export const GlobalsContext = createContext();
export function GlobalsProvider({ children }) {
    const [shaderFlag, setShaderFlag] = useState(false);
    const [contentFlag, setContentFlag] = useState(
        <>
          <RaceContainer/>
          <MainStats/>
          <CalculatedStats/>
          <Resources/>
        </>
    )
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