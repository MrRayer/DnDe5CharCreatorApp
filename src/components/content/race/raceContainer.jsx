import { useContext } from "react"
import "./raceContainer.css"
import { StatsContext } from "../../../context/statsContext"
import { GlobalsContext } from "../../../context/globalsContext"

export default function RaceContainer(){
    const { charIdentity } = useContext(StatsContext)
    const { setShaderFlag, setPopupName } = useContext(GlobalsContext)
    return (
        <div className="race-main-container">
            <div className="race-container" onClick={()=>{setPopupName("RaceSelector");setShaderFlag(true);}}>
                <h1 className="race-title">Raza</h1>
                {charIdentity["Race"]}
            </div>
            {charIdentity["Subrace"] !== "none" && (
                <div className="race-container" onClick={()=>{setPopupName("RaceSelector");setShaderFlag(true);}}>
                    <h1 className="race-title">Subraza</h1>
                    {charIdentity["Subrace"]}
                </div>
            )}
            <div className="race-container" onClick={()=>{setPopupName("ClassSelector");setShaderFlag(true);}}>
                <h1 className="race-title">Clase</h1>
                {charIdentity["Class"]}
            </div>
            {charIdentity["Subclass"] !== "none" && (
                <div className="race-container" onClick={()=>{setPopupName("ClassSelector");setShaderFlag(true);}}>
                    <h1 className="race-title">Subclass</h1>
                    {charIdentity["Subclass"]}
                </div>
            )}
        </div>
    )
}