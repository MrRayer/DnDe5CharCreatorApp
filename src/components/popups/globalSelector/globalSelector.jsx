import { useContext } from "react"
import "./GlobalSelector.css"
import { GlobalsContext } from "../../../context/globalsContext"

export default function GlobalSelector(){
    const { setContentFlag, setShaderFlag } = useContext(GlobalsContext)
    const handleClick = (selection) => {
        setContentFlag(selection);
        setShaderFlag(false)
    }
    return(
        <div className="global-selector-container">
            <div className="global-item-container" onClick={()=>handleClick("mainMenu")}>
                Menu principal
            </div>
            <div className="global-item-container" onClick={()=>handleClick("inventory")}>
                Inventario
            </div>
            <div className="global-item-container" onClick={()=>handleClick("equipment")}>
                Equipamiento
            </div>
            <div className="global-item-container" onClick={()=>handleClick("abilitiesAndSpells")}>
                Habilidades
            </div>
            <div className="global-item-container" onClick={()=>handleClick("choices")}>
                Elecciones
            </div>
            <div className="global-item-container" onClick={()=>handleClick("TaL")}>
                Proficiencias
            </div>
            <div className="global-item-container" onClick={()=>handleClick("skills")}>
                Abilidades
            </div>
        </div>
    )
}