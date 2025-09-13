import "./toolsAndLang.css"
import { StatsContext } from "../../../context/statsContext"
import { useState, useContext } from "react"
import { GlobalsContext } from "../../../context/globalsContext"
import AddTaL from "../../popups/addTaL/addTaL"
import RemoveTaL from "../../popups/removeTaL/removeTaL"

export default function ToolsAndLang() {
    const { charIdentity } = useContext(StatsContext)
    const { setPopupName, setShaderFlag, setChoosingType } = useContext(GlobalsContext)
    const [talSelection, setTaLSelection] = useState("lang")
    const selectionInLang = {"tools":"Herramientas","lang":"Lenguajes","armor":"Armaduras","weapons":"Armas"}
    const handleAddTaL = () => {
        setChoosingType(talSelection);
        setPopupName(<AddTaL/>);
        setShaderFlag(true);
    }
    const handleRemoveTaL = () => {
        setChoosingType(talSelection);
        setPopupName(<RemoveTaL/>);
        setShaderFlag(true);
    }
    return (
        <div className="tal-main-container">
            <div className="tal-selection-container">
                <button className="tal-selection-button" onClick={()=>{setTaLSelection("tools")}}>Herramientas</button>
                <button className="tal-selection-button" onClick={()=>{setTaLSelection("lang")}}>Lenguajes</button>
                <button className="tal-selection-button" onClick={()=>{setTaLSelection("armor")}}>Armaduras</button>
                <button className="tal-selection-button" onClick={()=>{setTaLSelection("weapons")}}>Armas</button>
            </div>
            <h1 className="tal-title">
                {selectionInLang[talSelection] || null}
            </h1>
            <div className="tal-buttons-container">
                <button className="tal-button" onClick={handleAddTaL}>Agregar</button>
                <button className="tal-button" onClick={handleRemoveTaL}>Quitar</button>
            </div>
            <div className="tal-container">
                {talSelection === "tools" ? (charIdentity.toolProf.map(tal => <h1 key={tal} className="singleTaL">{tal}</h1>)) : null}
                {talSelection === "lang" ? (charIdentity.languages.map(tal => <h1 key={tal} className="singleTaL">{tal}</h1>)) : null}
                {talSelection === "armor" ? (charIdentity.armorProf.map(tal => <h1 key={tal} className="singleTaL">{tal}</h1>)) : null}
                {talSelection === "weapons" ? (charIdentity.weaponProf.map(tal => <h1 key={tal} className="singleTaL">{tal}</h1>)) : null}
            </div>
        </div>
    )
}