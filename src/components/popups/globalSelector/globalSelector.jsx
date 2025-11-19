import { useContext } from "react"
import "./GlobalSelector.css"
import { GlobalsContext } from "../../../context/globalsContext"
import Inventory from "../../content/inventory/inventory"
import Equipment from "../../content/equipment/equipment"
import AbilitiesAndSpells from "../../content/abilitiesAndSpells/abilitiesAndSpells"
import Skills from "../../content/skills/skills"
import ToolsAndLang from "../../content/toolsAndLang/toolsAndLang"
import Choices from "../../content/choices/choices"
import SaveLoad from "../../content/saveLoad/saveLoad"
import RaceContainer from "../../content/race/raceContainer"
import MainStats from "../../content/SPECIAL/mainStats"
import CalculatedStats from "../../content/calculatedStats/calculatedStats"
import Resources from "../../content/resources/resources"
import Notes from "../../content/notes/notes"

export default function GlobalSelector(){
    const { setContentFlag, setShaderFlag } = useContext(GlobalsContext)
    const handleClick = (selection) => {
        setContentFlag(selection);
        setShaderFlag(false)
    }
    return(
        <div className="global-selector-container">
            <div className="global-item-container" onClick={()=>handleClick(
                <>
                  <RaceContainer/>
                  <MainStats/>
                  <CalculatedStats/>
                  <Resources/>
                </>
            )}>
                Menu principal
            </div>
            <div className="global-item-container" onClick={()=>handleClick(<Inventory/>)}>
                Inventario
            </div>
            <div className="global-item-container" onClick={()=>handleClick(<Equipment/>)}>
                Equipamiento
            </div>
            <div className="global-item-container" onClick={()=>handleClick(<AbilitiesAndSpells/>)}>
                Hechizos
            </div>
            <div className="global-item-container" onClick={()=>handleClick(<Skills/>)}>
                Habilidades
            </div>
            <div className="global-item-container" onClick={()=>handleClick(<ToolsAndLang/>)}>
                Proficiencias
            </div>
            <div className="global-item-container" onClick={()=>handleClick(<Choices/>)}>
                Elecciones
            </div>
            <div className="global-item-container" onClick={()=>handleClick(<Notes/>)}>
                Notas
            </div>
            <div className="global-item-container" onClick={()=>handleClick(<SaveLoad/>)}>
                Save/Load
            </div>
        </div>
    )
}