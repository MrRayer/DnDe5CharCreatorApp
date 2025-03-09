import { useContext } from "react"
import "./subraceSelector.css"
import { StatsContext } from "../../../context/statsContext"
import Subraces from "../../../data/subraces";
import { GlobalsContext } from "../../../context/globalsContext";
import GetStatName from "../../../logic/getStatName";

export default function SubraceSelector(){
    const { setRaceSubrace, charIdentity } = useContext(StatsContext);
    const { setShaderFlag } = useContext(GlobalsContext);
    return (
        <div className="subrace-selector-container">
            {Subraces.map(Subrace => (
                Subrace["Parent"] === charIdentity["Race"] && (
                    <div key={Subrace.Subrace} className="subrace-conainer" onClick={()=>{setRaceSubrace("Subrace",Subrace.Subrace,Subrace.extraStats);setShaderFlag(false)}}>
                        <h1 className="subrace-title">{Subrace.Subrace}</h1>
                        {Object.entries(Subrace.extraStats).map(([stat, value]) =>
                            value > 0 ? (<p key={GetStatName(stat)}>{GetStatName(stat)}: +{value}</p>) : null
                        )}
                    </div>
                )
            ))}
        </div>
    )
}