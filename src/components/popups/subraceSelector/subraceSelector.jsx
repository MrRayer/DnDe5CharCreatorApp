import { useContext } from "react"
import "./subraceSelector.css"
import { StatsContext } from "../../../context/statsContext"
import Subraces from "../../../data/subraces";
import { GlobalsContext } from "../../../context/globalsContext";
import GetStatName from "../../../logic/getStatName";

export default function SubraceSelector() {
    const { setRaceSubrace, charIdentity } = useContext(StatsContext);
    const { setShaderFlag } = useContext(GlobalsContext);

    return (
        <div className="subrace-selector-container">
            {Subraces.filter(subrace => subrace.Parent === charIdentity.Race).map(subrace => (
                <div 
                    key={subrace.Subrace} 
                    className="subrace-container" 
                    onClick={() => {
                        setRaceSubrace("Subrace", subrace);
                        setShaderFlag(false);
                    }}
                >
                    <h1 className="subrace-title">{subrace.Subrace}</h1>
                    {subrace.extraStats.map((value, index) =>
                        value > 0 ? <p key={index}>{GetStatName(index)}: +{value}</p> : null
                    )}
                </div>
            ))}
        </div>
    );
}