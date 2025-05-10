import { useContext } from "react"
import "./classSelector.css"
import { StatsContext } from "../../../context/statsContext"
import Classes from "../../../data/classes";
import { GlobalsContext } from "../../../context/globalsContext";

export default function ClassSelector(){
    const { setClass } = useContext(StatsContext);
    const { setShaderFlag } = useContext(GlobalsContext);
    return (
        <div className="race-selector-container">
            {Classes.map(Class => (
                <div key={Class.name} className="class-container" onClick={()=>{setClass(Class);setShaderFlag(false);}}>
                    <h1 className="class-title">{Class.name}</h1>
                </div>
            ))}
        </div>
    )
}